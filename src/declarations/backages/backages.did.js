export const idlFactory = ({ IDL }) => {
  const BackstageCreatedParams = IDL.Record({
    'user_id' : IDL.Text,
    'details' : IDL.Vec(IDL.Text),
    'event_id' : IDL.Text,
  });
  const BackstageId = IDL.Text;
  const BackstageCreatedPart = IDL.Record({ 'id' : BackstageId });
  const ApiError = IDL.Variant({
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Null,
  });
  const BackstageCreated = IDL.Variant({
    'ok' : BackstageCreatedPart,
    'err' : ApiError,
  });
  const Time = IDL.Int;
  const Backstage = IDL.Record({
    'id' : BackstageId,
    'updated_at' : IDL.Opt(Time),
    'created_at' : IDL.Opt(Time),
    'user_id' : IDL.Text,
    'details' : IDL.Vec(IDL.Text),
    'event_id' : IDL.Text,
  });
  const Backstages = IDL.Service({
    'create' : IDL.Func([BackstageCreatedParams], [BackstageCreated], []),
    'delete' : IDL.Func([BackstageId], [IDL.Opt(Backstage)], []),
    'getAllBackstages' : IDL.Func([], [IDL.Vec(Backstage)], ['query']),
    'getById' : IDL.Func([BackstageId], [IDL.Opt(Backstage)], ['query']),
    'total' : IDL.Func([], [IDL.Nat], ['query']),
    'update' : IDL.Func(
        [BackstageId, BackstageCreatedParams],
        [IDL.Opt(Backstage)],
        [],
      ),
  });
  return Backstages;
};
export const init = ({ IDL }) => { return []; };
