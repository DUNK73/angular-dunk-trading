
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
