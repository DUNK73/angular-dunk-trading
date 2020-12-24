/**
 * OpenAPI
 * tinkoff.ru/invest OpenAPI.
 *
 * OpenAPI spec version: 1.0.0
 * Contact: n.v.melnikov@tinkoff.ru
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Empty } from '../model/empty';
import { LimitOrderRequest } from '../model/limitOrderRequest';
import { LimitOrderResponse } from '../model/limitOrderResponse';
import { MarketOrderRequest } from '../model/marketOrderRequest';
import { MarketOrderResponse } from '../model/marketOrderResponse';
import { OrdersResponse } from '../model/ordersResponse';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class OrdersService {

    protected basePath = 'https://api-invest.tinkoff.ru/openapi/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Отмена заявки
     * 
     * @param orderId ID заявки
     * @param brokerAccountId Номер счета (по умолчанию - Тинькофф)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public ordersCancelPost(orderId: string, brokerAccountId?: string, observe?: 'body', reportProgress?: boolean): Observable<Empty>;
    public ordersCancelPost(orderId: string, brokerAccountId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Empty>>;
    public ordersCancelPost(orderId: string, brokerAccountId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Empty>>;
    public ordersCancelPost(orderId: string, brokerAccountId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling ordersCancelPost.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (orderId !== undefined && orderId !== null) {
            queryParameters = queryParameters.set('orderId', <any>orderId);
        }
        if (brokerAccountId !== undefined && brokerAccountId !== null) {
            queryParameters = queryParameters.set('brokerAccountId', <any>brokerAccountId);
        }

        let headers = this.defaultHeaders;

        // authentication (sso_auth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Empty>('post',`${this.basePath}/orders/cancel`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Получение списка активных заявок
     * 
     * @param brokerAccountId Номер счета (по умолчанию - Тинькофф)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public ordersGet(brokerAccountId?: string, observe?: 'body', reportProgress?: boolean): Observable<OrdersResponse>;
    public ordersGet(brokerAccountId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrdersResponse>>;
    public ordersGet(brokerAccountId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrdersResponse>>;
    public ordersGet(brokerAccountId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (brokerAccountId !== undefined && brokerAccountId !== null) {
            queryParameters = queryParameters.set('brokerAccountId', <any>brokerAccountId);
        }

        let headers = this.defaultHeaders;

        // authentication (sso_auth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<OrdersResponse>('get',`${this.basePath}/orders`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Создание лимитной заявки
     * 
     * @param body 
     * @param figi FIGI инструмента
     * @param brokerAccountId Номер счета (по умолчанию - Тинькофф)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public ordersLimitOrderPost(body: LimitOrderRequest, figi: string, brokerAccountId?: string, observe?: 'body', reportProgress?: boolean): Observable<LimitOrderResponse>;
    public ordersLimitOrderPost(body: LimitOrderRequest, figi: string, brokerAccountId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<LimitOrderResponse>>;
    public ordersLimitOrderPost(body: LimitOrderRequest, figi: string, brokerAccountId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<LimitOrderResponse>>;
    public ordersLimitOrderPost(body: LimitOrderRequest, figi: string, brokerAccountId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling ordersLimitOrderPost.');
        }

        if (figi === null || figi === undefined) {
            throw new Error('Required parameter figi was null or undefined when calling ordersLimitOrderPost.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (figi !== undefined && figi !== null) {
            queryParameters = queryParameters.set('figi', <any>figi);
        }
        if (brokerAccountId !== undefined && brokerAccountId !== null) {
            queryParameters = queryParameters.set('brokerAccountId', <any>brokerAccountId);
        }

        let headers = this.defaultHeaders;

        // authentication (sso_auth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<LimitOrderResponse>('post',`${this.basePath}/orders/limit-order`,
            {
                body: body,
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Создание рыночной заявки
     * 
     * @param body 
     * @param figi FIGI инструмента
     * @param brokerAccountId Уникальный идентификатор счета (по умолчанию - Тинькофф)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public ordersMarketOrderPost(body: MarketOrderRequest, figi: string, brokerAccountId?: string, observe?: 'body', reportProgress?: boolean): Observable<MarketOrderResponse>;
    public ordersMarketOrderPost(body: MarketOrderRequest, figi: string, brokerAccountId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MarketOrderResponse>>;
    public ordersMarketOrderPost(body: MarketOrderRequest, figi: string, brokerAccountId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MarketOrderResponse>>;
    public ordersMarketOrderPost(body: MarketOrderRequest, figi: string, brokerAccountId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling ordersMarketOrderPost.');
        }

        if (figi === null || figi === undefined) {
            throw new Error('Required parameter figi was null or undefined when calling ordersMarketOrderPost.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (figi !== undefined && figi !== null) {
            queryParameters = queryParameters.set('figi', <any>figi);
        }
        if (brokerAccountId !== undefined && brokerAccountId !== null) {
            queryParameters = queryParameters.set('brokerAccountId', <any>brokerAccountId);
        }

        let headers = this.defaultHeaders;

        // authentication (sso_auth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<MarketOrderResponse>('post',`${this.basePath}/orders/market-order`,
            {
                body: body,
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
