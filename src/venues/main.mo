import Nat16 "mo:base/Nat16";
import Nat64 "mo:base/Nat64";
import List "mo:base/List";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Types "./types";

shared actor class Venues() {
  stable var venues = List.nil<Types.Venue>();

  public query func total(): async Nat {
    return List.size(venues);
  };

  public query func getAllVenues(): async ([Types.Venue]) {
    return List.toArray(venues);
  };

  public func create(venueBody: Types.VenueCreatedParams): async Types.VenueCreated {
    let newId: Types.VenueId = Nat.toText(List.size(venues));

    let venue: Types.Venue = {
      venue_id = newId;
      venue_name = venueBody.venue_name;
      venue_description = venueBody.venue_description;
      venue_address = venueBody.venue_address;
      venue_country = venueBody.venue_country;
      venue_city = venueBody.venue_city;
      venue_state = venueBody.venue_state;
      venue_zip = venueBody.venue_zip;
      venue_gps = venueBody.venue_gps;
      created_at = ?Time.now();
      updated_at = null;
    };

    venues := List.push(venue, venues);

    return #ok({
      id = newId;
    });
  };

  public query func getById(venue_id: Types.VenueId): async ?Types.Venue {
    let venue = List.find(venues, func(venue: Types.Venue): Bool {
      venue.venue_id == venue_id
    });

    return venue;
  };

  public func delete(venue_id: Types.VenueId): async ?Types.Venue {
    let venueToDelete = List.find(venues, func(venue: Types.Venue): Bool {
      venue.venue_id == venue_id
    });
    
    if(venueToDelete != null) {
      venues := List.filter(venues, func(venue: Types.Venue): Bool {
        Text.notEqual(venue.venue_id, venue_id)
      });
    };
    
    return venueToDelete;
  };

  public func update(venue_id: Types.VenueId, venueBody: Types.VenueCreatedParams): async ?Types.Venue {
    let venueToUpdate = List.find(venues, func(venue: Types.Venue): Bool {
      venue.venue_id == venue_id
    });

    var venueUpdatedFinded: ?Types.Venue = null;

    if(venueToUpdate != null) {
      venues := List.map(venues, func(venue: Types.Venue): Types.Venue {
        if(venue.venue_id == venue_id) {

          let venueUpdated: Types.Venue = {
            venue_id = venue.venue_id;
            venue_name = venueBody.venue_name;
            venue_description = venueBody.venue_description;
            venue_address = venueBody.venue_address;
            venue_country = venueBody.venue_country;
            venue_city = venueBody.venue_city;
            venue_state = venueBody.venue_state;
            venue_zip = venueBody.venue_zip;
            venue_gps = venueBody.venue_gps;
            created_at = venue.created_at;
            updated_at = ?Time.now();
          };
          
          venueUpdatedFinded := ?venueUpdated;

          return venueUpdated;
        };
        return venue;
      });
    };

    return venueUpdatedFinded;
  }
};
