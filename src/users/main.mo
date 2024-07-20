import List "mo:base/List";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Types "./types";

shared actor class Users() {
  stable var users = List.nil<Types.User>();

  public query func total(): async Nat {
    return List.size(users);
  };

  public query func getAllUsers(): async ([Types.User]) {
    return List.toArray(users);
  };

  public func create(userBody: Types.UserCreatedParams): async Types.UserCreated {
    let newId: Types.UserId = Text.fromNat(List.size(users) + 1);

    let user: Types.User = {
      id = newId;
      email = userBody.email;
      phone = userBody.phone;
      role = userBody.role;
      created_at = ?Time.now();
      updated_at = null;
    };

    users := List.push(user, users);

    return #ok({
      id = newId;
    });
  };

  public query func getById(user_id: Types.UserId): async ?Types.User {
    let user = List.find(users, func(user: Types.User): Bool {
      user.id == user_id
    });

    return user;
  };

  public func delete(user_id: Types.UserId): async ?Types.User {
    let userToDelete = List.find(users, func(user: Types.User): Bool {
      user.id == user_id
    });
    
    if(userToDelete != null) {
      users := List.filter(users, func(user: Types.User): Bool {
        Text.notEqual(user.id, user_id)
      });
    };
    
    return userToDelete;
  };

  public func update(user_id: Types.UserId, userBody: Types.UserCreatedParams): async ?Types.User {
    let userToUpdate = List.find(users, func(user: Types.User): Bool {
      user.id == user_id
    });

    var userUpdatedFinded: ?Types.User = null;

    if(userToUpdate != null) {
      users := List.map(users, func(user: Types.User): Types.User {
        if(user.id == user_id) {

          let userUpdated: Types.User = {
            id = user.id;
            email = userBody.email;
            phone = userBody.phone;
            role = userBody.role;
            created_at = user.created_at;
            updated_at = ?Time.now();
          };
          
          userUpdatedFinded := ?userUpdated;

          return userUpdated;
        };
        return user;
      });
    };

    return userUpdatedFinded;
  }
};
