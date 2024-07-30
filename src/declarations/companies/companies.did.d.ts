import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type ApiError = { 'Unauthorized' : null } |
  { 'Other' : null };
export interface Companies {
  'create' : ActorMethod<[CompanyCreatedParams], CompanyCreated>,
  'delete' : ActorMethod<[CompanyId], [] | [Company]>,
  'getAllCompanies' : ActorMethod<[], Array<Company>>,
  'getById' : ActorMethod<[CompanyId], [] | [Company]>,
  'getByOrder' : ActorMethod<[string], Array<Company>>,
  'total' : ActorMethod<[], bigint>,
  'update' : ActorMethod<[CompanyId, CompanyCreatedParams], [] | [Company]>,
}
export interface Company {
  'updated_at' : Time,
  'company_state' : string,
  'company_city' : string,
  'company_name' : string,
  'created_at' : Time,
  'company_address' : string,
  'company_documents' : string,
  'company_description' : string,
  'company_gps' : string,
  'company_zip' : string,
  'company_id' : CompanyId,
  'company_country' : string,
}
export type CompanyCreated = { 'ok' : CompanyCreatedPart } |
  { 'err' : ApiError };
export interface CompanyCreatedParams {
  'company_state' : string,
  'company_city' : string,
  'company_name' : string,
  'company_address' : string,
  'company_documents' : string,
  'company_description' : string,
  'company_gps' : string,
  'company_zip' : string,
  'company_country' : string,
}
export interface CompanyCreatedPart { 'id' : CompanyId }
export type CompanyId = string;
export type Time = bigint;
export interface _SERVICE extends Companies {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
