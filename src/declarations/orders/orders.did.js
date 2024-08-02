export const idlFactory = ({ IDL }) => {
  const User = IDL.Record({
    'name' : IDL.Text,
    'email' : IDL.Text,
    'phone' : IDL.Text,
  });
  const OrderId = IDL.Text;
  const Event = IDL.Record({
    'eventPromoterCompany' : IDL.Text,
    'eventArtist' : IDL.Text,
    'eventDateTime' : IDL.Text,
    'eventCountry' : IDL.Text,
    'eventVenue' : IDL.Text,
    'eventName' : IDL.Text,
  });
  const Ticket = IDL.Record({
    'ticketSection' : IDL.Text,
    'ticketFacilityFee' : IDL.Text,
    'ticketPromoterFeeIVU' : IDL.Text,
    'ticketTotal' : IDL.Text,
    'ticketPriceIVU' : IDL.Text,
    'ticketQty' : IDL.Text,
    'ticketRow' : IDL.Text,
    'ticketId' : IDL.Text,
    'ticketSeat' : IDL.Text,
    'ticketOrderFeeWebIVU' : IDL.Text,
    'ticketServiceFee' : IDL.Text,
    'ticketDescription' : IDL.Text,
    'ticketOrderFeeWeb' : IDL.Text,
    'ticketServiceFeeIVU' : IDL.Text,
    'ticketClubSeatsFee' : IDL.Text,
    'ticketClubSeatsFeeIVU' : IDL.Text,
    'ticketStatus' : IDL.Text,
    'ticketPrice' : IDL.Text,
    'ticketPromoterFee' : IDL.Text,
    'ticketFacilityFeeIVU' : IDL.Text,
  });
  const Seat = IDL.Record({ 'ticket' : Ticket });
  const Order = IDL.Record({
    'status' : IDL.Text,
    'user' : User,
    'orderId' : OrderId,
    'event' : Event,
    'seats' : IDL.Vec(Seat),
    'operation' : IDL.Text,
    'companyId' : IDL.Text,
  });
  const OrderCreatedPart = IDL.Record({ 'id' : OrderId });
  const ApiError = IDL.Variant({
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Null,
  });
  const OrderCreated = IDL.Variant({
    'ok' : OrderCreatedPart,
    'err' : ApiError,
  });
  const Orders = IDL.Service({
    'create' : IDL.Func([Order], [OrderCreated], []),
    'delete' : IDL.Func([OrderId], [IDL.Opt(Order)], []),
    'getAllOrders' : IDL.Func([], [IDL.Vec(Order)], ['query']),
    'getById' : IDL.Func([OrderId], [IDL.Opt(Order)], ['query']),
    'total' : IDL.Func([], [IDL.Nat], ['query']),
    'update' : IDL.Func([OrderId, Order], [IDL.Opt(Order)], []),
  });
  return Orders;
};
export const init = ({ IDL }) => { return []; };
