import List "mo:base/List";
import Bool "mo:base/Bool";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Types "./types";

shared actor class Backstages() {
  stable var backstages = List.nil<Types.Backstage>();

  public query func total(): async Nat {
    return List.size(backstages);
  };

  public query func getAllBackstages(): async ([Types.Backstage]) {
    return List.toArray(backstages);
  };

  public func create(backstageBody: Types.BackstageCreatedParams): async Types.BackstageCreated {
    let newId: Types.BackstageId = Nat.toText(List.size(backstages));

    let backstage: Types.Backstage = {
      id = newId;
      event_id = backstageBody.event_id;
      user_id = backstageBody.user_id;
      details = backstageBody.details;
      created_at = ?Time.now();
      updated_at = null;
    };

    backstages := List.push(backstage, backstages);

    return #ok({
      id = newId;
    });
  };

  public query func getById(backstage_id: Types.BackstageId): async ?Types.Backstage {
    let backstage = List.find(backstages, func(backstage: Types.Backstage): Bool {
      backstage.id == backstage_id
    });

    return backstage;
  };

  public func delete(backstage_id: Types.BackstageId): async ?Types.Backstage {
    let backstageToDelete = List.find(backstages, func(backstage: Types.Backstage): Bool {
      backstage.id == backstage_id
    });
    
    if(backstageToDelete != null) {
      backstages := List.filter(backstages, func(backstage: Types.Backstage): Bool {
        Text.notEqual(backstage.id, backstage_id)
      });
    };
    
    return backstageToDelete;
  };

  public func update(backstage_id: Types.BackstageId, backstageBody: Types.BackstageCreatedParams): async ?Types.Backstage {
    let backstageToUpdate = List.find(backstages, func(backstage: Types.Backstage): Bool {
      backstage.id == backstage_id
    });

    var backstageUpdatedFinded: ?Types.Backstage = null;

    if(backstageToUpdate != null) {
      backstages := List.map(backstages, func(backstage: Types.Backstage): Types.Backstage {
        if(backstage.id == backstage_id) {

          let backstageUpdated: Types.Backstage = {
            id = backstage.id;
            event_id = backstageBody.event_id;
            user_id = backstageBody.user_id;
            details = backstageBody.details;
            created_at = backstage.created_at;
            updated_at = ?Time.now();
          };
          
          backstageUpdatedFinded := ?backstageUpdated;

          return backstageUpdated;
        };
        return backstage;
      });
    };

    return backstageUpdatedFinded;
  }
};
