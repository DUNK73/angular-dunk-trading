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
import { MoneyAmount } from './moneyAmount';
import { OperationType } from './operationType';
import { OrderStatus } from './orderStatus';

export interface PlacedMarketOrder { 
    orderId: string;
    operation: OperationType;
    status: OrderStatus;
    rejectReason?: string;
    /**
     * Сообщение об ошибке
     */
    message?: string;
    requestedLots: number;
    executedLots: number;
    commission?: MoneyAmount;
}