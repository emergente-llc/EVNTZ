import Time "mo:base/Time";
import Result "mo:base/Result"; 

module {

  public type OrderId = Text;

  public type Order = {
    order_id: OrderId;
    status: Text;
    operation: Text;
    company_name: Text;
    user_email: Text;
    event_id: Text;
    received_at: ?Time.Time;
    created_at: ?Time.Time;
    updated_at: ?Time.Time;
  };

  public type OrderCreatedParams = {
    status: Text;
    operation: Text;
    company_name: Text;
    user_email: Text;
    event_id: Text;
  };

  public type OrderCreatedPart = {
    id: OrderId;
  };


  public type ApiError = {
    #Unauthorized;
    #Other;
  };

  public type OrderCreated = Result.Result<OrderCreatedPart, ApiError>
} 