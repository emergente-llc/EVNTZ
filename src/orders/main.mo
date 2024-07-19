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

shared actor class Orders() {
  stable var orders = List.nil<Types.OrderSquema>();

  public query func total(): async Nat {
    return List.size(orders);
  };

  public query func getAllOrders() : async ([Types.OrderSquema]) {
    return List.toArray(orders);
  };

  public func create(orderBody: Types.OrderCreatedParams): async Types.OrderCreated {

    let newId: Types.OrderId = Nat.toText(List.size(orders));

    let order: Types.OrderSquema = {
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

    orders := List.push(order, orders);

    return #ok({
      id = newId;
    });
  };

  public query func getById(orderId: Types.OrderId): async ?Types.OrderSquema {
    let order = List.find(orders, func(order: Types.OrderSquema): Bool {
      order.orderId == orderId
    });

    return order;
  };

  public func delete(orderId: Types.OrderId): async ?Types.OrderSquema {
    let orderToDelete = List.find(orders, func(order: Types.OrderSquema): Bool {
      order.orderId == orderId
    });
    
    if(orderToDelete != null) {
      orders := List.filter(orders, func(order: Types.OrderSquema): Bool {
        Text.notEqual(order.orderId, orderId)
      });
    };
    
    return orderToDelete;
  };

  public func update(orderId: Types.OrderId, orderBody: Types.OrderCreatedParams): async ?Types.OrderSquema {
    let orderToUpdate = List.find(orders, func(order: Types.OrderSquema): Bool {
      order.orderId == orderId
    });

    var orderUpdatedFinded: ?Types.OrderSquema = null; 


    if(orderToUpdate != null) {
      orders := List.map(orders, func(order: Types.OrderSquema): Types.OrderSquema {
        if(order.orderId == orderId) {

          let orderUpdated: Types.OrderSquema = {
            orderId = order.orderId;
            status = orderBody.status;
            operation = orderBody.operation;
            companyName = orderBody.companyName;
            userEmail = orderBody.userEmail;
            eventId = orderBody.eventId;
            createdAt = order.createdAt;
            receivedAt = null;
            updatedAt = ?Time.now();
          };
          
          orderUpdatedFinded := ?orderUpdated;

          return orderUpdated;
        };
        return order;
      });
    };

    return orderUpdatedFinded;
  }
}