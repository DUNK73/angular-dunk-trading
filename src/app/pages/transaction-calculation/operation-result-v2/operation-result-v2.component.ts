import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { OperationResult } from '../../../types/OperationResult';


@Component({
  selector: "app-operation-result-v2",
  templateUrl: "./operation-result-v2.component.html",
  styleUrls: ["./operation-result-v2.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationResultV2Component implements OnInit {

  @Input()
  public currencyCode = "RUB";

  @Input()
  public enter: OperationResult;
  @Input()
  public loss: OperationResult;
  @Input()
  public take: OperationResult;

  constructor() {}

  ngOnInit() {}
}
