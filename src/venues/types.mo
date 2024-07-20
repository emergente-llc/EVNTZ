import Time "mo:base/Time";
import Result "mo:base/Result"; 

module {
  public type ApiError = {
    #Unauthorized;
    #Other;
  };

  public type VenueId = Text;

  public type Venue = {
    venue_id: VenueId;
    venue_name: Text;
    venue_description: Text;
    venue_address: Text;
    venue_country: Text;
    venue_city: Text;
    venue_state: Text;
    venue_zip: Text;
    venue_gps: Text;
    created_at: ?Time.Time;
    updated_at: ?Time.Time;
  };

  public type VenueCreatedParams = {
    venue_name: Text;
    venue_description: Text;
    venue_address: Text;
    venue_country: Text;
    venue_city: Text;
    venue_state: Text;
    venue_zip: Text;
    venue_gps: Text;
  };

  public type VenueCreatedPart = {
    id: VenueId;
  };

  public type VenueCreated = Result.Result<VenueCreatedPart, ApiError>;

}