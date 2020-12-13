import { ConstData } from './ConstData';
import { ToolOption } from './ToolOption';
import { OperationResult } from "./OperationResult";


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
    rate: number = 1
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
    let profitPoints = ((this.riskOnOperation * this.constData.riskTake) /
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
    while (true) {
      let entryResult = new OperationResult(
        this.calculateOperationAmount(this.lots, this.startPrice),
        this.constData.commission
      );

      let lossResult = new OperationResult(
        this.calculateOperationAmount(this.lots, this.lossPrice),
        this.constData.commission
      );

      this.entryResult = entryResult;
      this.lossResult = lossResult;

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

      let takeResult = new OperationResult(
        this.calculateOperationAmount(this.lots, this.getProfitPrice()),
        this.constData.commission
      );
      this.takeResult = takeResult;

      // console.group("CALCULATION", this.lots);
      // console.log("entry", this.entryResult);
      // console.log("loss", this.lossResult);
      // console.log("result", this.riskOnOperation);
      // console.groupEnd();
      let profit = this.takeResult.operationAmount -
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
        break;
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
