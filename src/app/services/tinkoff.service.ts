import { Injectable } from '@angular/core';
import { CandleResolution, CandlesResponse, MarketService } from '../tinkoff-api';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Data } from '@angular/router';
import { Candle } from '../tinkoff-api/model/candle';


export interface AtrInformation {
  atr: number;
  start: Candle;
  current: Candle;

  startAverage: number
  currentAverage: number

  dif: number
  atrPotential: number
  atrPotentialPercentage: number
}

@Injectable({
  providedIn: 'root'
})
export class TinkoffService {

  constructor(
    private marketService: MarketService,
  ) { }

  private calculateAtr(candlesResponse: CandlesResponse): number {
    return candlesResponse.payload.candles
      .map(d => d.h - d.l)
      .reduce((previouseValue, currentValue, currentIndex, array) => {
        return previouseValue + currentValue;
      }) / candlesResponse.payload.candles.length;
  }

  private getAverage(candl: Candle): number {
    return (candl.o + candl.c) / 2;
  }

  public getAtrPotentialInfo(ticker: string, days: number = 5): Observable<AtrInformation> {

    let sessionStartHouer = 10;
    let figi = null;

    let data: AtrInformation = {
      atr: null,
      start: null,
      current: null,

      startAverage: 0,
      currentAverage: 0,

      dif: 0,
      atrPotential: 0,
      atrPotentialPercentage: 0,
    }

    return this.marketService.marketSearchByTickerGet(ticker)
      .pipe(
        switchMap(data => {
          let instrument = data.payload.instruments[0];
          figi = instrument.figi;

          let now = new Date();
          let from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (days + 1));
          let to = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
          return this.marketService.marketCandlesGet(figi, from, to, CandleResolution.Day);
        }),
        tap(x => {
          data.atr = this.calculateAtr(x);
        }),
        switchMap(data => {
          let now = new Date();
          let hour = sessionStartHouer;

          if (now.getHours() < sessionStartHouer) {
            hour = 0;
          }
          let from = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour);
          let to = new Date(now);
          return this.marketService.marketCandlesGet(figi, from, to, CandleResolution._1min);
        }),
        tap(x => {
          data.start = x.payload.candles[0];
          data.current = x.payload.candles[x.payload.candles.length - 1];
        }),
        tap(x => {
          data.startAverage = this.getAverage(data.start);
          data.currentAverage = this.getAverage(data.current);

          data.dif = Math.abs(data.startAverage - data.currentAverage);
          data.atrPotential = data.atr - data.dif;

          data.atrPotentialPercentage = data.atrPotential / data.atr;
        }),
        map(x => {
          console.log(data);
          return data;
        })
      )
  }

}
