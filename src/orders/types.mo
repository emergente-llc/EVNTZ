import Time "mo:base/Time";
import Result "mo:base/Result"; 

module {

  public type OrderId = Text;

  public type OrderSquema = {
    orderId: OrderId;
    status: Text;
    operation: Text;
    companyName: Text;
    userEmail: Text;
    eventId: Text;
    createdAt: ?Time.Time;
    receivedAt: ?Time.Time;
    updatedAt: ?Time.Time;
  };

  public type OrderCreatedParams = {
    companyName: Text;
    userEmail: Text;
    eventId: Text;
    status: Text;
    operation: Text;
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