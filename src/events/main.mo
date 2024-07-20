import Nat16 "mo:base/Nat16";
import Nat64 "mo:base/Nat64";
import Bool "mo:base/Bool";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Types "./types";

// Actor para gestionar los eventos
shared actor class Events() {
  stable var events = List.nil<Types.Event>();

  public query func total(): async Nat {
    return List.size(events);
  };

  public query func getAllEvents(): async ([Types.Event]) {
    return List.toArray(events);
  };

  public func create(eventBody: Types.EventCreatedParams): async Types.EventCreated {

    let newId: Types.EventId = Nat.toText(List.size(events));

    let event: Types.Event = {
      event_id = newId;
      event_name = eventBody.event_name;
      event_artist = eventBody.event_artist;
      event_venue = eventBody.event_venue;
      event_country = eventBody.event_country;
      event_venue_gps = eventBody.event_venue_gps;
      event_date = eventBody.event_date;
      event_time = eventBody.event_time;
      event_promoter_company = eventBody.event_promoter_company;
      event_information = eventBody.event_information;
      created_at = ?Time.now();
      updated_at = null;
    };

    events := List.push(event, events);

    return #ok({
      id = newId;
    });
  };

  public query func getById(event_id: Types.EventId): async ?Types.Event {
    let event = List.find(events, func(event: Types.Event): Bool {
      event.event_id == event_id
    });

    return event;
  };

  public func delete(event_id: Types.EventId): async ?Types.Event {
    let eventToDelete = List.find(events, func(event: Types.Event): Bool {
      event.event_id == event_id
    });

    if(eventToDelete != null) {
      events := List.filter(events, func(event: Types.Event): Bool {
        Text.notEqual(event.event_id, event_id)
      });
    };

    return eventToDelete;
  };

  public func update(event_id: Types.EventId, eventBody: Types.EventCreatedParams): async ?Types.Event {
    let eventToUpdate = List.find(events, func(event: Types.Event): Bool {
      event.event_id == event_id
    });

    var eventUpdatedFinded: ?Types.Event = null; 

    if(eventToUpdate != null) {
      events := List.map(events, func(event: Types.Event): Types.Event {
        if(event.event_id == event_id) {

          let eventUpdated: Types.Event = {
            event_id = event.event_id;
            event_name = eventBody.event_name;
            event_artist = eventBody.event_artist;
            event_venue = eventBody.event_venue;
            event_country = eventBody.event_country;
            event_venue_gps = eventBody.event_venue_gps;
            event_date = eventBody.event_date;
            event_time = eventBody.event_time;
            event_promoter_company = eventBody.event_promoter_company;
            event_information = eventBody.event_information;
            created_at = event.created_at;
            updated_at = ?Time.now();
          };
          
          eventUpdatedFinded := ?eventUpdated;

          return eventUpdated;
        };
        return event;
      });
    };

    return eventUpdatedFinded;
  }
}