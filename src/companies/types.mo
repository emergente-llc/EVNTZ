import Time "mo:base/Time";
import Result "mo:base/Result"; 

module {
  public type ApiError = {
    #Unauthorized;
    #Other;
  };
  public type CompanyId = Text;

  public type Company = {
    company_id: CompanyId;
    company_name: Text;
    company_description: Text;
    company_address: Text;
    company_country: Text;
    company_city: Text;
    company_state: Text;
    company_zip: Text;
    company_gps: Text;
    company_documents: Text;
    created_at: Time.Time;
    updated_at: Time.Time;
  };

  public type CompanyCreatedParams = {
    company_name: Text;
    company_description: Text;
    company_address: Text;
    company_country: Text;
    company_city: Text;
    company_state: Text;
    company_zip: Text;
    company_gps: Text;
    company_documents: Text;
  };

  public type CompanyCreatedPart = {
    id: CompanyId;
  };

  public type CompanyCreated = Result.Result<CompanyCreatedPart, ApiError>;
} 