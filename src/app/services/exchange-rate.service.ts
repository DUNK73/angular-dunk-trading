import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ExchangeRateService {
  constructor(public http: HttpClient) {}

  public getRates(): Observable<any> {
    return this.http.get("https://www.cbr-xml-daily.ru/daily_json.js");
  }
}
