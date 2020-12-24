// Generated by https://quicktype.io

export interface EODDataResponce {
  pagination: Pagination;
  data: Datum[];
}

export interface Datum {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adj_high: number;
  adj_low: number;
  adj_close: number;
  adj_open: number;
  adj_volume: number;
  symbol: Symbol;
  exchange: Exchange;
  date: string;
}

export enum Exchange {
  Xnas = "XNAS",
}

export type Symbol = string;

export interface Pagination {
  limit: number;
  offset: number;
  count: number;
  total: number;
}
