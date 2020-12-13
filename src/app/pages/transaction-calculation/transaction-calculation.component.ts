import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Rates } from 'src/app/model/rates';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';
import { ConstData } from 'src/app/types/ConstData';
import { Operation } from 'src/app/types/Operation';
import { ToolOption } from 'src/app/types/ToolOption';

declare let firebase: any;
let database = firebase.database();


@Component({
  selector: 'app-transaction-calculation',
  templateUrl: './transaction-calculation.component.html',
  styleUrls: ['./transaction-calculation.component.less']
})
export class TransactionCalculationComponent implements OnInit {


  private rates: Rates;

  public currencyCode = "RUB";

  public depositOptions: ConstData;
  // = new ConstData(
  //   1000000,
  //   0.3 / 100,
  //   0.2 / 100,
  //   1,
  //   3
  // );

  public operation: Operation;
  // = new Operation(
  //   this.depositOptions,
  //   new ToolOption(0.1, 0.1),
  //   205.86,
  //   204.34
  // );

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

    database
      .ref("depositOptions")
      .once("value")
      .then((snapshot) => {

        let data = snapshot.val() as ConstData;
        this.depositOptions = new ConstData(data.deposit, data.commission, data.risk, data.riskLoss, data.riskTake);
        this.depositOptionsForm.patchValue(this.depositOptions, { emitEvent: false });

        this.operation = new Operation(
          this.depositOptions,
          new ToolOption(0.1, 0.1),
          205.86,
          204.34,
          1
        )
      });

    database
      .ref("operation")
      .once("value")
      .then((snapshot) => {

        let data = snapshot.val() as Operation;

        this.operation = new Operation(
          this.depositOptions,
          new ToolOption(0.1, 0.1),
          data.startPrice,
          data.lossPrice
        )

        this.operationForm.patchValue(this.operation, { emitEvent: false });
      });

    // this.depositOptionsForm.patchValue(this.depositOptions);
    // this.operationForm.patchValue(this.operation);

    console.log("this.operation", this.operation);
    console.log("this.operationForm.value", this.operationForm.value);

    this.depositOptionsForm.valueChanges
      .pipe(
        tap(x => {

          database
            .ref("depositOptions")
            .set(x);

          Object.assign(this.depositOptions, x);
        })
      )
      .subscribe();

    this.operationForm.valueChanges
      .pipe(
        tap(x => {

          database
            .ref("operation")
            .set(x);

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
