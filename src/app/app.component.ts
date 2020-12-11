import { Component, VERSION } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Rates } from './model/rates';
import { ExchangeRateService } from "./services/exchange-rate.service";

export class OperationResult {
  public operationAmount: number;
  public commission: number;

  public get commissionAmount(): number {
    return this.operationAmount * this.commission;
  }
  public get fullAmount(): number {
    return this.operationAmount + this.commissionAmount;
  }

  constructor(operationAmount: number, commission: number) {
    this.operationAmount = operationAmount;
    this.commission = commission;
  }
}

export class ConstData {
  public deposit: number;
  public risk: number;
  public commission: number;

  public riskLoss: number;
  public riskTake: number;

  public get riskAmount(): number {
    return this.deposit * this.risk;
  }

  constructor(
    deposit: number,
    commission: number,
    risk: number,
    riskLoss: number,
    riskTake: number
  ) {
    this.deposit = deposit;
    this.commission = commission;
    this.risk = risk;
    this.riskLoss = riskLoss;
    this.riskTake = riskTake;
  }
}

export class ToolOption {
  constructor(public priceStep: number, public priceStepCost: number) { }
}

export class Operation {

  public setRate(rate: number) {
    this.rate = rate;
  }

  public rate: number = 1;

  public constData: ConstData;
  public toolOptions: ToolOption;

  public startPrice: number;
  public lossPrice: number;

  public get lossPoints(): number {
    return this.startPrice - this.lossPrice;
  }
  public get isLong(): boolean {
    return this.lossPoints > 0;
  }

  public lots: number;
  public riskOnOperation: number;

  public takePrice: number;
  public takePoints: number;

  public lossResult: OperationResult;
  public entryResult: OperationResult;
  public takeResult: OperationResult;

  public loss: number;
  public profit: number;

  constructor(
    constData: ConstData,
    toolOptions: ToolOption,
    startPrice: number,
    lossPrice: number,
    rate: number = 1,
  ) {
    this.constData = constData;
    this.toolOptions = toolOptions;

    this.startPrice = startPrice;
    this.lossPrice = lossPrice;
  }

  private getLots(): number {
    return Math.trunc(
      this.constData.riskAmount * this.rate /
      ((this.lossPoints / this.toolOptions.priceStep) *
        this.toolOptions.priceStepCost)
    );
  }

  private calculateOperationAmount(lots: number, price: number): number {
    return Math.abs(lots * price);
  }

  private getProfitPoints(): number {
    let profitPoints =
      ((this.riskOnOperation * this.constData.riskTake) /
        this.lots /
        this.toolOptions.priceStep) *
      this.toolOptions.priceStepCost;

    return profitPoints;
  }
  private getProfitPrice(): number {
    let profitPrice = +this.startPrice + this.getProfitPoints();
    return profitPrice;
  }

  public calculate(): void {
    let startLots = this.getLots();

    let results: Array<{
      lots: number;
      profit: number;
      entryResult: OperationResult;
      lossResult: OperationResult;
      takeResult: OperationResult;
    }> = [];

    this.lots = startLots;
    let whileStop = true;
    while (whileStop) {
      let entryResult = new OperationResult(
        this.calculateOperationAmount(this.lots, this.startPrice),
        this.constData.commission * this.rate
      );

      let lossResult = new OperationResult(
        this.calculateOperationAmount(this.lots, this.lossPrice),
        this.constData.commission * this.rate
      );

      let takeResult = new OperationResult(
        this.calculateOperationAmount(this.lots, this.getProfitPrice()),
        this.constData.commission * this.rate
      );

      this.entryResult = entryResult;
      this.lossResult = lossResult;
      this.takeResult = takeResult;

      if (this.isLong) {
        this.riskOnOperation =
          this.entryResult.operationAmount -
          this.lossResult.operationAmount +
          this.entryResult.commissionAmount +
          this.lossResult.commissionAmount;
      } else {
        this.riskOnOperation =
          Math.abs(this.lossResult.operationAmount) -
          Math.abs(this.entryResult.operationAmount) +
          Math.abs(this.entryResult.commissionAmount) +
          Math.abs(this.lossResult.commissionAmount);
      }

      // console.group("CALCULATION", this.lots);
      // console.log("entry", this.entryResult);
      // console.log("loss", this.lossResult);
      // console.log("result", this.riskOnOperation);
      // console.groupEnd();

      let profit =
        this.takeResult.operationAmount -
        this.entryResult.operationAmount -
        this.takeResult.commissionAmount;

      results.push({
        lots: this.lots,
        profit: profit,
        entryResult: entryResult,
        lossResult: lossResult,
        takeResult: takeResult
      });

      if (this.riskOnOperation < this.constData.riskAmount * this.rate) {
        whileStop = false;
      }

      this.lots = this.lots - (this.isLong ? 1 : -1);
    }

    console.log(results);

    this.takePoints = this.getProfitPoints();
    this.takePrice = this.getProfitPrice();

    if (this.isLong) {
      this.profit =
        this.takeResult.operationAmount -
        this.entryResult.operationAmount -
        this.takeResult.commissionAmount -
        this.entryResult.commissionAmount;
      this.loss =
        this.entryResult.operationAmount -
        this.lossResult.operationAmount +
        this.entryResult.commissionAmount +
        this.lossResult.commissionAmount;
    } else {
      this.profit =
        this.entryResult.operationAmount -
        this.takeResult.operationAmount -
        this.takeResult.commissionAmount -
        this.entryResult.commissionAmount;
      2;
      this.loss =
        this.lossResult.operationAmount -
        this.entryResult.operationAmount +
        this.entryResult.commissionAmount +
        this.lossResult.commissionAmount;
    }

    // this.calculateProfit();
  }
}

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;

  private rates: Rates;

  public currencyCode = "RUB";

  public depositOptions: ConstData = new ConstData(
    1000000,
    0.3 / 100,
    0.2 / 100,
    1,
    3
  );
  public operation: Operation = new Operation(
    this.depositOptions,
    new ToolOption(0.1, 0.1),
    205.86,
    204.34,
    1 / 73
  );

  public getRate(code: string): number {
    let valute = this.rates.Valute[code];
    if (!valute) return 1;
    return 1 / valute.Value;
  }

  public rateControl = new FormControl('RUB');

  public depositOptionsForm = new FormGroup({
    deposit: new FormControl(),
    risk: new FormControl(),
    commission: new FormControl(),

    riskLoss: new FormControl(),
    riskTake: new FormControl()

    // riskAmount: new FormControl()
  });

  public operationForm = new FormGroup({
    startPrice: new FormControl(),
    lossPrice: new FormControl(),

    toolOptions: new FormGroup({
      priceStep: new FormControl(),
      priceStepCost: new FormControl()
    })
  });

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit() {
    this.exchangeRateService.getRates()
      .pipe(
        tap(x => {
          this.rates = x;
        })
      )
      .subscribe();

    this.depositOptionsForm.patchValue(this.depositOptions);
    this.operationForm.patchValue(this.operation);

    console.log("this.operation", this.operation);
    console.log("this.operationForm.value", this.operationForm.value);

    this.depositOptionsForm.valueChanges
      .pipe(
        tap(x => {
          Object.assign(this.depositOptions, x);
        })
      )
      .subscribe();

    this.operationForm.valueChanges
      .pipe(
        tap(x => {
          Object.assign(this.operation, x);
        })
      )
      .subscribe();

    this.rateControl
      .valueChanges
      .pipe(
        tap(code => {
          this.currencyCode = code;
          this.operation.setRate(this.getRate(code));
        })
      )
      .subscribe();

    // this.operation.calculate();
  }

  public calculate() {
    this.operation.calculate();
  }
}
