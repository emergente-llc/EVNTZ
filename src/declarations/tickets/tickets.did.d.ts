import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type ApiError = { 'Unauthorized' : null } |
  { 'Other' : null };
export interface Ticket {
  'updated_at' : [] | [Time],
  'ticket_section' : string,
  'ticket_service_fee' : bigint,
  'ticket_price_ivu' : bigint,
  'ticket_order_fee_web_ivu' : bigint,
  'ticket_price' : bigint,
  'ticket_id' : TicketId,
  'ticket_status' : string,
  'created_at' : [] | [Time],
  'ticket_description' : string,
  'ticket_seat' : string,
  'ticket_qty' : bigint,
  'ticket_row' : string,
  'ticket_total' : bigint,
  'ticket_service_fee_ivu' : bigint,
  'ticket_club_seats_fee' : bigint,
  'ticket_facility_fee_ivu' : bigint,
  'order_id' : string,
  'event_id' : string,
  'asset_id' : string,
  'ticket_promoter_fee' : bigint,
  'ticket_order_fee_web' : bigint,
  'ticket_promoter_fee_ivu' : bigint,
  'ticket_club_seats_fee_ivu' : bigint,
  'ticket_facility_fee' : bigint,
}
export type TicketCreated = { 'ok' : TicketCreatedPart } |
  { 'err' : ApiError };
export interface TicketCreatedParams {
  'ticket_section' : string,
  'ticket_service_fee' : bigint,
  'ticket_price_ivu' : bigint,
  'ticket_order_fee_web_ivu' : bigint,
  'ticket_price' : bigint,
  'ticket_status' : string,
  'ticket_description' : string,
  'ticket_seat' : string,
  'ticket_qty' : bigint,
  'ticket_row' : string,
  'ticket_service_fee_ivu' : bigint,
  'ticket_club_seats_fee' : bigint,
  'ticket_facility_fee_ivu' : bigint,
  'order_id' : string,
  'event_id' : string,
  'asset_id' : string,
  'ticket_promoter_fee' : bigint,
  'ticket_order_fee_web' : bigint,
  'ticket_promoter_fee_ivu' : bigint,
  'ticket_club_seats_fee_ivu' : bigint,
  'ticket_facility_fee' : bigint,
}
export interface TicketCreatedPart { 'id' : TicketId }
export type TicketId = string;
export interface Tickets {
  'create' : ActorMethod<[TicketCreatedParams], TicketCreated>,
  'delete' : ActorMethod<[TicketId], [] | [Ticket]>,
  'getAllTickets' : ActorMethod<[], Array<Ticket>>,
  'getByEvent' : ActorMethod<[string], Array<Ticket>>,
  'getById' : ActorMethod<[TicketId], [] | [Ticket]>,
  'getByOrder' : ActorMethod<[string], Array<Ticket>>,
  'total' : ActorMethod<[], bigint>,
  'update' : ActorMethod<[TicketId, TicketCreatedParams], [] | [Ticket]>,
}
export type Time = bigint;
export interface _SERVICE extends Tickets {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
