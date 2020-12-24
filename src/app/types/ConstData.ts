
export class ConstData {
  public deposit: number;

  public riskInPercent: number;
  public commissionInPercent: number;

  public risk: number;
  public commission: number;

  public riskLoss: number;
  public riskTake: number;

  public get riskAmount(): number {
    return this.deposit * this.risk;
  }

  constructor(
    deposit: number,
    commissionInPercent: number,
    riskInPercent: number,
    riskLoss: number,
    riskTake: number
  ) {
    this.deposit = deposit;
    this.commissionInPercent = commissionInPercent;
    this.commission = commissionInPercent / 100;
    this.riskInPercent = riskInPercent;
    this.risk = riskInPercent / 100;
    this.riskLoss = riskLoss;
    this.riskTake = riskTake;
  }
}
