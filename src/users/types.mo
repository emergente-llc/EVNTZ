import Time "mo:base/Time";
import Result "mo:base/Result"; 

module {
  public type ApiError = {
    #Unauthorized;
    #Other;
  };

 public type UserId = Text;

  public type User = {
    id: UserId;
    email: Text;
    phone: Text;
    role: Text;
    created_at: ?Time.Time;
    updated_at: ?Time.Time;
  };

  public type UserCreatedParams = {
    email: Text;
    phone: Text;
    role: Text;
  };

  public type UserCreatedPart = {
    id: UserId;
  };

  public type UserCreated = Result.Result<UserCreatedPart, ApiError>;
}