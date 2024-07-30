export const idlFactory = ({ IDL }) => {
  const EventId = IDL.Text;
  const Time = IDL.Int;
  const EventCreatedParams = IDL.Record({
    'event_country' : IDL.Text,
    'event_venue' : IDL.Text,
    'event_promoter_company' : IDL.Text,
    'event_information' : IDL.Text,
    'event_id' : EventId,
    'event_date' : Time,
    'event_venue_gps' : IDL.Text,
    'event_name' : IDL.Text,
    'event_time' : IDL.Text,
    'event_artist' : IDL.Text,
  });
  const EventCreatedPart = IDL.Record({ 'id' : EventId });
  const ApiError = IDL.Variant({
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Null,
  });
  const EventCreated = IDL.Variant({
    'ok' : EventCreatedPart,
    'err' : ApiError,
  });
  const Event = IDL.Record({
    'updated_at' : IDL.Opt(Time),
    'event_country' : IDL.Text,
    'event_venue' : IDL.Text,
    'event_promoter_company' : IDL.Text,
    'created_at' : IDL.Opt(Time),
    'event_information' : IDL.Text,
    'event_id' : EventId,
    'event_date' : Time,
    'event_venue_gps' : IDL.Text,
    'event_name' : IDL.Text,
    'event_time' : IDL.Text,
    'event_artist' : IDL.Text,
  });
  const Events = IDL.Service({
    'create' : IDL.Func([EventCreatedParams], [EventCreated], []),
    'delete' : IDL.Func([EventId], [IDL.Opt(Event)], []),
    'getAllEvents' : IDL.Func([], [IDL.Vec(Event)], ['query']),
    'getById' : IDL.Func([EventId], [IDL.Opt(Event)], ['query']),
    'total' : IDL.Func([], [IDL.Nat], ['query']),
    'update' : IDL.Func([EventId, EventCreatedParams], [IDL.Opt(Event)], []),
  });
  return Events;
};
export const init = ({ IDL }) => { return []; };
