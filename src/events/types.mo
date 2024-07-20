import Time "mo:base/Time";
import Result "mo:base/Result"; 

module {
  public type EventId = Text;

  public type Event = {
    event_id: EventId;
    event_name: Text;
    event_artist: Text;
    event_venue: Text;
    event_country: Text;
    event_venue_gps: Text;
    event_date: Time.Time;
    event_time: Text;
    event_promoter_company: Text;
    event_information: Text;
    created_at: ?Time.Time;
    updated_at: ?Time.Time;
  };

  public type EventCreatedParams = {
    event_name: Text;
    event_artist: Text;
    event_venue: Text;
    event_country: Text;
    event_venue_gps: Text;
    event_date: Time.Time;
    event_time: Text;
    event_promoter_company: Text;
    event_information: Text;
  };

  public type EventCreatedPart = {
    id: EventId;
  };

  public type ApiError = {
    #Unauthorized;
    #Other;
  };


  public type EventCreated = Result.Result<EventCreatedPart, ApiError>;
}