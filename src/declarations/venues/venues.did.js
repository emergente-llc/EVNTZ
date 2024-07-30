export const idlFactory = ({ IDL }) => {
  const VenueCreatedParams = IDL.Record({
    'venue_description' : IDL.Text,
    'venue_address' : IDL.Text,
    'venue_city' : IDL.Text,
    'venue_name' : IDL.Text,
    'venue_gps' : IDL.Text,
    'venue_zip' : IDL.Text,
    'venue_country' : IDL.Text,
    'venue_state' : IDL.Text,
  });
  const VenueId = IDL.Text;
  const VenueCreatedPart = IDL.Record({ 'id' : VenueId });
  const ApiError = IDL.Variant({
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Null,
  });
  const VenueCreated = IDL.Variant({
    'ok' : VenueCreatedPart,
    'err' : ApiError,
  });
  const Time = IDL.Int;
  const Venue = IDL.Record({
    'updated_at' : IDL.Opt(Time),
    'venue_description' : IDL.Text,
    'venue_id' : VenueId,
    'venue_address' : IDL.Text,
    'created_at' : IDL.Opt(Time),
    'venue_city' : IDL.Text,
    'venue_name' : IDL.Text,
    'venue_gps' : IDL.Text,
    'venue_zip' : IDL.Text,
    'venue_country' : IDL.Text,
    'venue_state' : IDL.Text,
  });
  const Venues = IDL.Service({
    'create' : IDL.Func([VenueCreatedParams], [VenueCreated], []),
    'delete' : IDL.Func([VenueId], [IDL.Opt(Venue)], []),
    'getAllVenues' : IDL.Func([], [IDL.Vec(Venue)], ['query']),
    'getByEvent' : IDL.Func([IDL.Text], [IDL.Vec(Venue)], ['query']),
    'getById' : IDL.Func([VenueId], [IDL.Opt(Venue)], ['query']),
    'total' : IDL.Func([], [IDL.Nat], ['query']),
    'update' : IDL.Func([VenueId, VenueCreatedParams], [IDL.Opt(Venue)], []),
  });
  return Venues;
};
export const init = ({ IDL }) => { return []; };
