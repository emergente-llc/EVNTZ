import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type ApiError = { 'Unauthorized' : null } |
  { 'Other' : null };
export type Time = bigint;
export interface User {
  'id' : UserId,
  'updated_at' : [] | [Time],
  'role' : string,
  'created_at' : [] | [Time],
  'email' : string,
  'phone' : string,
}
export type UserCreated = { 'ok' : UserCreatedPart } |
  { 'err' : ApiError };
export interface UserCreatedParams {
  'role' : string,
  'email' : string,
  'phone' : string,
}
export interface UserCreatedPart { 'id' : UserId }
export type UserId = string;
export interface Users {
  'create' : ActorMethod<[UserCreatedParams], UserCreated>,
  'delete' : ActorMethod<[UserId], [] | [User]>,
  'getAllUsers' : ActorMethod<[], Array<User>>,
  'getById' : ActorMethod<[UserId], [] | [User]>,
  'getByOrder' : ActorMethod<[string], Array<User>>,
  'total' : ActorMethod<[], bigint>,
  'update' : ActorMethod<[UserId, UserCreatedParams], [] | [User]>,
}
export interface _SERVICE extends Users {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
