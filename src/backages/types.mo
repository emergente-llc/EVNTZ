import Time "mo:base/Time";
import Result "mo:base/Result";

module {
  public type ApiError = {
    #Unauthorized;
    #Other;
  };

  public type BackstageId = Text;

  public type Backstage = {
    id: BackstageId;
    event_id: Text;
    user_id: Text;
    details: [Text]; // Cambiado a una lista de texto para simplificar, ajustar según sea necesario
    created_at: ?Time.Time;
    updated_at: ?Time.Time;
  };

  public type BackstageCreatedParams = {
    event_id: Text;
    user_id: Text;
    details: [Text]; // Cambiado a una lista de texto para simplificar, ajustar según sea necesario
  };

  public type BackstageCreatedPart = {
    id: BackstageId;
  };

  public type BackstageCreated = Result.Result<BackstageCreatedPart, ApiError>;
}
