import List "mo:base/List";
import Bool "mo:base/Bool";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Types "./types";

shared actor class Orders() {
  stable var orders = List.nil<Types.Order>();

  public query func total(): async Nat {
    return List.size(orders);
  };

  public query func getAllOrders() : async ([Types.Order]) {
    return List.toArray(orders);
  };

  public func create(order: Types.Order): async Types.OrderCreated {

    orders := List.push(order, orders);

    return #ok({
      id = order.orderId;
    });
  };

  public query func getById(orderId: Types.OrderId): async ?Types.Order {
    let order = List.find(orders, func(order: Types.Order): Bool {
      order.orderId == orderId
    });

    return order;
  };

  public func delete(orderId: Types.OrderId): async ?Types.Order {
    let orderToDelete = List.find(orders, func(order: Types.Order): Bool {
      order.orderId == orderId
    });
    
    if(orderToDelete != null) {
      orders := List.filter(orders, func(order: Types.Order): Bool {
        Text.notEqual(order.orderId, orderId)
      });
    };
    
    return orderToDelete;
  };

  public func update(orderId: Types.OrderId, orderUpdated: Types.Order): async ?Types.Order {
    let orderToUpdate = List.find(orders, func(order: Types.Order): Bool {
      order.orderId == orderId
    });

    var orderUpdatedFinded: ?Types.Order = null; 


    if(orderToUpdate != null) {
      orders := List.map(orders, func(order: Types.Order): Types.Order {
        if(order.orderId == orderId) {
          orderUpdatedFinded := ?orderUpdated;

          return orderUpdated;
        };
        return order;
      });
    };

    return orderUpdatedFinded;
  }
}