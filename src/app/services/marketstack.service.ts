import { IntradayData } from './../model/marketstack/intraday-data.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketstackService {

  private readonly accessKey: string = '6f6bae8eef03ddbe5abcaf0a66f23a20';

  constructor(
    private http: HttpClient,
  ) { }

  private url(endpoint: string): string {
    return `http://api.marketstack.com/v1/${endpoint}`;
  }

  public getAtr(tiker: string): Observable<IntradayData> {
   return this.http.get<IntradayData>(this.url('eod'), {
      params: {
        'access_key': this.accessKey,
        'symbols': tiker,
        'limit': '5',
      }
    })
  }
}

// Ваш токен для OpenAPI тинькоф
// t.xh4xGo0dclMyWF8nj4EcvdlYwnrdr6ldL7Kz9v-9kERg5rdPzkPQWfdM1aIVXVOSyuUyBmcQzd0Pxq5y-3GXxQ

// Ваш токен для песочницы OpenAPI
// t.vStohhm7GnDWcdEqQWjtaemU2daublhpOVx0qUYMl0YKWXKnWTzYOdcdGEAhBSED03cdisfISMga0bYAF_dVEw
