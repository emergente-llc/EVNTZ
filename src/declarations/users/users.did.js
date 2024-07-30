export const idlFactory = ({ IDL }) => {
  const UserCreatedParams = IDL.Record({
    'role' : IDL.Text,
    'email' : IDL.Text,
    'phone' : IDL.Text,
  });
  const UserId = IDL.Text;
  const UserCreatedPart = IDL.Record({ 'id' : UserId });
  const ApiError = IDL.Variant({
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Null,
  });
  const UserCreated = IDL.Variant({ 'ok' : UserCreatedPart, 'err' : ApiError });
  const Time = IDL.Int;
  const User = IDL.Record({
    'id' : UserId,
    'updated_at' : IDL.Opt(Time),
    'role' : IDL.Text,
    'created_at' : IDL.Opt(Time),
    'email' : IDL.Text,
    'phone' : IDL.Text,
  });
  const Users = IDL.Service({
    'create' : IDL.Func([UserCreatedParams], [UserCreated], []),
    'delete' : IDL.Func([UserId], [IDL.Opt(User)], []),
    'getAllUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getById' : IDL.Func([UserId], [IDL.Opt(User)], ['query']),
    'getByOrder' : IDL.Func([IDL.Text], [IDL.Vec(User)], ['query']),
    'total' : IDL.Func([], [IDL.Nat], ['query']),
    'update' : IDL.Func([UserId, UserCreatedParams], [IDL.Opt(User)], []),
  });
  return Users;
};
export const init = ({ IDL }) => { return []; };
