import { Component, Input, OnInit } from "@angular/core";
import { OperationResult } from '../../types/OperationResult';


@Component({
  selector: "app-operation-result",
  templateUrl: "./operation-result.component.html",
  styleUrls: ["./operation-result.component.css"]
})
export class OperationResultComponent implements OnInit {
  @Input()
  public title: string;

  @Input()
  public operationResult: OperationResult;

  @Input()
  public currencyCode = "RUB";

  constructor() {}

  ngOnInit() {}
}
