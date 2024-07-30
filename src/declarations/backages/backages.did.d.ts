import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type ApiError = { 'Unauthorized' : null } |
  { 'Other' : null };
export interface Backstage {
  'id' : BackstageId,
  'updated_at' : [] | [Time],
  'created_at' : [] | [Time],
  'user_id' : string,
  'details' : Array<string>,
  'event_id' : string,
}
export type BackstageCreated = { 'ok' : BackstageCreatedPart } |
  { 'err' : ApiError };
export interface BackstageCreatedParams {
  'user_id' : string,
  'details' : Array<string>,
  'event_id' : string,
}
export interface BackstageCreatedPart { 'id' : BackstageId }
export type BackstageId = string;
export interface Backstages {
  'create' : ActorMethod<[BackstageCreatedParams], BackstageCreated>,
  'delete' : ActorMethod<[BackstageId], [] | [Backstage]>,
  'getAllBackstages' : ActorMethod<[], Array<Backstage>>,
  'getById' : ActorMethod<[BackstageId], [] | [Backstage]>,
  'total' : ActorMethod<[], bigint>,
  'update' : ActorMethod<
    [BackstageId, BackstageCreatedParams],
    [] | [Backstage]
  >,
}
export type Time = bigint;
export interface _SERVICE extends Backstages {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
