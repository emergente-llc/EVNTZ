import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type ApiError = { 'Unauthorized' : null } |
  { 'Other' : null };
export type Time = bigint;
export interface Venue {
  'updated_at' : [] | [Time],
  'venue_description' : string,
  'venue_id' : VenueId,
  'venue_address' : string,
  'created_at' : [] | [Time],
  'venue_city' : string,
  'venue_name' : string,
  'venue_gps' : string,
  'venue_zip' : string,
  'venue_country' : string,
  'venue_state' : string,
}
export type VenueCreated = { 'ok' : VenueCreatedPart } |
  { 'err' : ApiError };
export interface VenueCreatedParams {
  'venue_description' : string,
  'venue_address' : string,
  'venue_city' : string,
  'venue_name' : string,
  'venue_gps' : string,
  'venue_zip' : string,
  'venue_country' : string,
  'venue_state' : string,
}
export interface VenueCreatedPart { 'id' : VenueId }
export type VenueId = string;
export interface Venues {
  'create' : ActorMethod<[VenueCreatedParams], VenueCreated>,
  'delete' : ActorMethod<[VenueId], [] | [Venue]>,
  'getAllVenues' : ActorMethod<[], Array<Venue>>,
  'getByEvent' : ActorMethod<[string], Array<Venue>>,
  'getById' : ActorMethod<[VenueId], [] | [Venue]>,
  'total' : ActorMethod<[], bigint>,
  'update' : ActorMethod<[VenueId, VenueCreatedParams], [] | [Venue]>,
}
export interface _SERVICE extends Venues {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
