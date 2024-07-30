export const idlFactory = ({ IDL }) => {
  const TicketCreatedParams = IDL.Record({
    'ticket_section' : IDL.Text,
    'ticket_service_fee' : IDL.Int,
    'ticket_price_ivu' : IDL.Int,
    'ticket_order_fee_web_ivu' : IDL.Int,
    'ticket_price' : IDL.Int,
    'ticket_status' : IDL.Text,
    'ticket_description' : IDL.Text,
    'ticket_seat' : IDL.Text,
    'ticket_qty' : IDL.Int,
    'ticket_row' : IDL.Text,
    'ticket_service_fee_ivu' : IDL.Int,
    'ticket_club_seats_fee' : IDL.Int,
    'ticket_facility_fee_ivu' : IDL.Int,
    'order_id' : IDL.Text,
    'event_id' : IDL.Text,
    'asset_id' : IDL.Text,
    'ticket_promoter_fee' : IDL.Int,
    'ticket_order_fee_web' : IDL.Int,
    'ticket_promoter_fee_ivu' : IDL.Int,
    'ticket_club_seats_fee_ivu' : IDL.Int,
    'ticket_facility_fee' : IDL.Int,
  });
  const TicketId = IDL.Text;
  const TicketCreatedPart = IDL.Record({ 'id' : TicketId });
  const ApiError = IDL.Variant({
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Null,
  });
  const TicketCreated = IDL.Variant({
    'ok' : TicketCreatedPart,
    'err' : ApiError,
  });
  const Time = IDL.Int;
  const Ticket = IDL.Record({
    'updated_at' : IDL.Opt(Time),
    'ticket_section' : IDL.Text,
    'ticket_service_fee' : IDL.Int,
    'ticket_price_ivu' : IDL.Int,
    'ticket_order_fee_web_ivu' : IDL.Int,
    'ticket_price' : IDL.Int,
    'ticket_id' : TicketId,
    'ticket_status' : IDL.Text,
    'created_at' : IDL.Opt(Time),
    'ticket_description' : IDL.Text,
    'ticket_seat' : IDL.Text,
    'ticket_qty' : IDL.Int,
    'ticket_row' : IDL.Text,
    'ticket_total' : IDL.Int,
    'ticket_service_fee_ivu' : IDL.Int,
    'ticket_club_seats_fee' : IDL.Int,
    'ticket_facility_fee_ivu' : IDL.Int,
    'order_id' : IDL.Text,
    'event_id' : IDL.Text,
    'asset_id' : IDL.Text,
    'ticket_promoter_fee' : IDL.Int,
    'ticket_order_fee_web' : IDL.Int,
    'ticket_promoter_fee_ivu' : IDL.Int,
    'ticket_club_seats_fee_ivu' : IDL.Int,
    'ticket_facility_fee' : IDL.Int,
  });
  const Tickets = IDL.Service({
    'create' : IDL.Func([TicketCreatedParams], [TicketCreated], []),
    'delete' : IDL.Func([TicketId], [IDL.Opt(Ticket)], []),
    'getAllTickets' : IDL.Func([], [IDL.Vec(Ticket)], ['query']),
    'getByEvent' : IDL.Func([IDL.Text], [IDL.Vec(Ticket)], ['query']),
    'getById' : IDL.Func([TicketId], [IDL.Opt(Ticket)], ['query']),
    'getByOrder' : IDL.Func([IDL.Text], [IDL.Vec(Ticket)], ['query']),
    'total' : IDL.Func([], [IDL.Nat], ['query']),
    'update' : IDL.Func([TicketId, TicketCreatedParams], [IDL.Opt(Ticket)], []),
  });
  return Tickets;
};
export const init = ({ IDL }) => { return []; };
