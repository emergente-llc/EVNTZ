import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type ApiError = { 'Unauthorized' : null } |
  { 'Other' : null };
export interface Event {
  'eventPromoterCompany' : string,
  'eventArtist' : string,
  'eventDateTime' : string,
  'eventCountry' : string,
  'eventVenue' : string,
  'eventName' : string,
}
export interface Order {
  'status' : string,
  'user' : User,
  'orderId' : OrderId,
  'event' : Event,
  'seats' : Array<Seat>,
  'operation' : string,
  'companyId' : string,
}
export type OrderCreated = { 'ok' : OrderCreatedPart } |
  { 'err' : ApiError };
export interface OrderCreatedPart { 'id' : OrderId }
export type OrderId = string;
export interface Orders {
  'create' : ActorMethod<[Order], OrderCreated>,
  'delete' : ActorMethod<[OrderId], [] | [Order]>,
  'getAllOrders' : ActorMethod<[], Array<Order>>,
  'getById' : ActorMethod<[OrderId], [] | [Order]>,
  'total' : ActorMethod<[], bigint>,
  'update' : ActorMethod<[OrderId, Order], [] | [Order]>,
}
export interface Seat { 'ticket' : Ticket }
export interface Ticket {
  'ticketSection' : string,
  'ticketFacilityFee' : string,
  'ticketPromoterFeeIVU' : string,
  'ticketTotal' : string,
  'ticketPriceIVU' : string,
  'ticketQty' : string,
  'ticketRow' : string,
  'ticketId' : string,
  'ticketSeat' : string,
  'ticketOrderFeeWebIVU' : string,
  'ticketServiceFee' : string,
  'ticketDescription' : string,
  'ticketOrderFeeWeb' : string,
  'ticketServiceFeeIVU' : string,
  'ticketClubSeatsFee' : string,
  'ticketClubSeatsFeeIVU' : string,
  'ticketStatus' : string,
  'ticketPrice' : string,
  'ticketPromoterFee' : string,
  'ticketFacilityFeeIVU' : string,
}
export interface User { 'name' : string, 'email' : string, 'phone' : string }
export interface _SERVICE extends Orders {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
