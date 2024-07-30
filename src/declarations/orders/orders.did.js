export const idlFactory = ({ IDL }) => {
  const OrderCreatedParams = IDL.Record({
    'status' : IDL.Text,
    'user_email' : IDL.Text,
    'company_name' : IDL.Text,
    'operation' : IDL.Text,
    'event_id' : IDL.Text,
  });
  const OrderId = IDL.Text;
  const OrderCreatedPart = IDL.Record({ 'id' : OrderId });
  const ApiError = IDL.Variant({
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Null,
  });
  const OrderCreated = IDL.Variant({
    'ok' : OrderCreatedPart,
    'err' : ApiError,
  });
  const Time = IDL.Int;
  const Order = IDL.Record({
    'status' : IDL.Text,
    'received_at' : IDL.Opt(Time),
    'updated_at' : IDL.Opt(Time),
    'user_email' : IDL.Text,
    'company_name' : IDL.Text,
    'created_at' : IDL.Opt(Time),
    'operation' : IDL.Text,
    'order_id' : OrderId,
    'event_id' : IDL.Text,
  });
  const Orders = IDL.Service({
    'create' : IDL.Func([OrderCreatedParams], [OrderCreated], []),
    'delete' : IDL.Func([OrderId], [IDL.Opt(Order)], []),
    'getAllOrders' : IDL.Func([], [IDL.Vec(Order)], ['query']),
    'getById' : IDL.Func([OrderId], [IDL.Opt(Order)], ['query']),
    'total' : IDL.Func([], [IDL.Nat], ['query']),
    'update' : IDL.Func([OrderId, OrderCreatedParams], [IDL.Opt(Order)], []),
  });
  return Orders;
};
export const init = ({ IDL }) => { return []; };
