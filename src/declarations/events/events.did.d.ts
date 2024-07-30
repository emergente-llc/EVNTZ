import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type ApiError = { 'Unauthorized' : null } |
  { 'Other' : null };
export interface Event {
  'updated_at' : [] | [Time],
  'event_country' : string,
  'event_venue' : string,
  'event_promoter_company' : string,
  'created_at' : [] | [Time],
  'event_information' : string,
  'event_id' : EventId,
  'event_date' : Time,
  'event_venue_gps' : string,
  'event_name' : string,
  'event_time' : string,
  'event_artist' : string,
}
export type EventCreated = { 'ok' : EventCreatedPart } |
  { 'err' : ApiError };
export interface EventCreatedParams {
  'event_country' : string,
  'event_venue' : string,
  'event_promoter_company' : string,
  'event_information' : string,
  'event_id' : EventId,
  'event_date' : Time,
  'event_venue_gps' : string,
  'event_name' : string,
  'event_time' : string,
  'event_artist' : string,
}
export interface EventCreatedPart { 'id' : EventId }
export type EventId = string;
export interface Events {
  'create' : ActorMethod<[EventCreatedParams], EventCreated>,
  'delete' : ActorMethod<[EventId], [] | [Event]>,
  'getAllEvents' : ActorMethod<[], Array<Event>>,
  'getById' : ActorMethod<[EventId], [] | [Event]>,
  'total' : ActorMethod<[], bigint>,
  'update' : ActorMethod<[EventId, EventCreatedParams], [] | [Event]>,
}
export type Time = bigint;
export interface _SERVICE extends Events {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
