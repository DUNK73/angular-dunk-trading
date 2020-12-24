import { Component, VERSION } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { tap } from "rxjs/operators";
import { ConstData } from './types/ConstData';
import { Rates } from './model/rates';
import { Operation } from './types/Operation';
import { ExchangeRateService } from "./services/exchange-rate.service";
import { ToolOption } from './types/ToolOption';

declare let firebase: any;
let database = firebase.database();

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {

  public switchTheme(event: InputEvent) {

    let checked = (event.target as HTMLInputElement).checked;
    let body = document.querySelector('body');

    if (checked) {
      body.classList.add('light');
      body.classList.remove('black');
    } else {
      body.classList.add('black');
      body.classList.remove('light');
    }
  }
}
