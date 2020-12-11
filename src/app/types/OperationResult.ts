
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
    this.operationAmount = +operationAmount;
    this.commission = +commission;
  }
}
