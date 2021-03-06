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
 */
import { OperationType } from './operationType';
import { OrderStatus } from './orderStatus';
import { OrderType } from './orderType';

export interface Order { 
    orderId: string;
    figi: string;
    operation: OperationType;
    status: OrderStatus;
    requestedLots: number;
    executedLots: number;
    type: OrderType;
    price: number;
}