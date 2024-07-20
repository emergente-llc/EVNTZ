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

shared actor class Companies() {
  stable var companies = List.nil<Types.OrderSquema>();

  public query func total(): async Nat {
    return List.size(companies);
  };

  public query func getAllOrders() : async ([Types.OrderSquema]) {
    return List.toArray(companies);
  };

  public func create(orderBody: Types.OrderCreatedParams): async Types.OrderCreated {

    let newId: Types.OrderId = Nat.toText(List.size(companies));

    let company: Types.OrderSquema = {
      orderId = newId;
      status = orderBody.status;
      operation = orderBody.operation;
      companyName = orderBody.companyName;
      userEmail = orderBody.userEmail;
      eventId = orderBody.eventId;
      createdAt = ?Time.now();
      receivedAt = null;
      updatedAt = null;
    };

    companies := List.push(company, companies);

    return #ok({
      id = newId;
    });
  };

  public query func getById(orderId: Types.OrderId): async ?Types.OrderSquema {
    let company = List.find(companies, func(company: Types.OrderSquema): Bool {
      company.orderId == orderId
    });

    return company;
  };

  public func delete(orderId: Types.OrderId): async ?Types.OrderSquema {
    let orderToDelete = List.find(companies, func(company: Types.OrderSquema): Bool {
      company.orderId == orderId
    });
    
    if(orderToDelete != null) {
      companies := List.filter(companies, func(company: Types.OrderSquema): Bool {
        Text.notEqual(company.orderId, orderId)
      });
    };
    
    return orderToDelete;
  };

  public func update(orderId: Types.OrderId, orderBody: Types.OrderCreatedParams): async ?Types.OrderSquema {
    let orderToUpdate = List.find(companies, func(company: Types.OrderSquema): Bool {
      company.orderId == orderId
    });

    var orderUpdatedFinded: ?Types.OrderSquema = null; 


    if(orderToUpdate != null) {
      companies := List.map(companies, func(company: Types.OrderSquema): Types.OrderSquema {
        if(company.orderId == orderId) {

          let orderUpdated: Types.OrderSquema = {
            orderId = company.orderId;
            status = orderBody.status;
            operation = orderBody.operation;
            companyName = orderBody.companyName;
            userEmail = orderBody.userEmail;
            eventId = orderBody.eventId;
            createdAt = company.createdAt;
            receivedAt = null;
            updatedAt = ?Time.now();
          };
          
          orderUpdatedFinded := ?orderUpdated;

          return orderUpdated;
        };
        return company;
      });
    };

    return orderUpdatedFinded;
  }
}