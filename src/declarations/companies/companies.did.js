export const idlFactory = ({ IDL }) => {
  const CompanyCreatedParams = IDL.Record({
    'company_state' : IDL.Text,
    'company_city' : IDL.Text,
    'company_name' : IDL.Text,
    'company_address' : IDL.Text,
    'company_documents' : IDL.Text,
    'company_description' : IDL.Text,
    'company_gps' : IDL.Text,
    'company_zip' : IDL.Text,
    'company_country' : IDL.Text,
  });
  const CompanyId = IDL.Text;
  const CompanyCreatedPart = IDL.Record({ 'id' : CompanyId });
  const ApiError = IDL.Variant({
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Null,
  });
  const CompanyCreated = IDL.Variant({
    'ok' : CompanyCreatedPart,
    'err' : ApiError,
  });
  const Time = IDL.Int;
  const Company = IDL.Record({
    'updated_at' : Time,
    'company_state' : IDL.Text,
    'company_city' : IDL.Text,
    'company_name' : IDL.Text,
    'created_at' : Time,
    'company_address' : IDL.Text,
    'company_documents' : IDL.Text,
    'company_description' : IDL.Text,
    'company_gps' : IDL.Text,
    'company_zip' : IDL.Text,
    'company_id' : CompanyId,
    'company_country' : IDL.Text,
  });
  const Companies = IDL.Service({
    'create' : IDL.Func([CompanyCreatedParams], [CompanyCreated], []),
    'delete' : IDL.Func([CompanyId], [IDL.Opt(Company)], []),
    'getAllCompanies' : IDL.Func([], [IDL.Vec(Company)], ['query']),
    'getById' : IDL.Func([CompanyId], [IDL.Opt(Company)], ['query']),
    'getByOrder' : IDL.Func([IDL.Text], [IDL.Vec(Company)], ['query']),
    'total' : IDL.Func([], [IDL.Nat], ['query']),
    'update' : IDL.Func(
        [CompanyId, CompanyCreatedParams],
        [IDL.Opt(Company)],
        [],
      ),
  });
  return Companies;
};
export const init = ({ IDL }) => { return []; };
