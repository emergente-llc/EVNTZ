import List "mo:base/List";
import Bool "mo:base/Bool";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
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

  public func create(orderBody: Types.OrderCreatedParams): async Types.OrderCreated {

    let newId: Types.OrderId = Nat.toText(List.size(orders));

    let order: Types.Order = {
      order_id = newId;
      status = orderBody.status;
      operation = orderBody.operation;
      company_name = orderBody.company_name;
      user_email = orderBody.user_email;
      event_id = orderBody.event_id;
      created_at = ?Time.now();
      received_at = null;
      updated_at = null;
    };

    orders := List.push(order, orders);

    return #ok({
      id = newId;
    });
  };

  public query func getById(order_id: Types.OrderId): async ?Types.Order {
    let order = List.find(orders, func(order: Types.Order): Bool {
      order.order_id == order_id
    });

    return order;
  };

  public func delete(order_id: Types.OrderId): async ?Types.Order {
    let orderToDelete = List.find(orders, func(order: Types.Order): Bool {
      order.order_id == order_id
    });
    
    if(orderToDelete != null) {
      orders := List.filter(orders, func(order: Types.Order): Bool {
        Text.notEqual(order.order_id, order_id)
      });
    };
    
    return orderToDelete;
  };

  public func update(order_id: Types.OrderId, orderBody: Types.OrderCreatedParams): async ?Types.Order {
    let orderToUpdate = List.find(orders, func(order: Types.Order): Bool {
      order.order_id == order_id
    });

    var orderUpdatedFinded: ?Types.Order = null; 


    if(orderToUpdate != null) {
      orders := List.map(orders, func(order: Types.Order): Types.Order {
        if(order.order_id == order_id) {

          let orderUpdated: Types.Order = {
            order_id = order.order_id;
            status = orderBody.status;
            operation = orderBody.operation;
            company_name = orderBody.company_name;
            user_email = orderBody.user_email;
            event_id = orderBody.event_id;
            created_at = order.created_at;
            received_at = null;
            updated_at = ?Time.now();
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