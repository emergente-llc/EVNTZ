import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type ApiError = { 'Unauthorized' : null } |
  { 'Other' : null };
export interface Order {
  'status' : string,
  'received_at' : [] | [Time],
  'updated_at' : [] | [Time],
  'user_email' : string,
  'company_name' : string,
  'created_at' : [] | [Time],
  'operation' : string,
  'order_id' : OrderId,
  'event_id' : string,
}
export type OrderCreated = { 'ok' : OrderCreatedPart } |
  { 'err' : ApiError };
export interface OrderCreatedParams {
  'status' : string,
  'user_email' : string,
  'company_name' : string,
  'operation' : string,
  'event_id' : string,
}
export interface OrderCreatedPart { 'id' : OrderId }
export type OrderId = string;
export interface Orders {
  'create' : ActorMethod<[OrderCreatedParams], OrderCreated>,
  'delete' : ActorMethod<[OrderId], [] | [Order]>,
  'getAllOrders' : ActorMethod<[], Array<Order>>,
  'getById' : ActorMethod<[OrderId], [] | [Order]>,
  'total' : ActorMethod<[], bigint>,
  'update' : ActorMethod<[OrderId, OrderCreatedParams], [] | [Order]>,
}
export type Time = bigint;
export interface _SERVICE extends Orders {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
