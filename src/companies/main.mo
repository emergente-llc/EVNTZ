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
  stable var companies = List.nil<Types.Company>();

  public query func total(): async Nat {
    return List.size(companies);
  };

  public query func getAllCompanies(): async ([Types.Company]) {
    return List.toArray(companies);
  };

  public func create(companyBody: Types.CompanyCreatedParams): async Types.CompanyCreated {
    let newId: Types.CompanyId = Nat.toText(List.size(companies));

    let company: Types.Company = {
      company_id = newId;
      company_name = companyBody.company_name;
      company_description = companyBody.company_description;
      company_address = companyBody.company_address;
      company_country = companyBody.company_country;
      company_city = companyBody.company_city;
      company_state = companyBody.company_state;
      company_zip = companyBody.company_zip;
      company_gps = companyBody.company_gps;
      company_documents = companyBody.company_documents;
      created_at = Time.now();
      updated_at = Time.now();
    };

    companies := List.push(company, companies);

    return #ok({
      id = newId;
    });
  };

  public query func getById(company_id: Types.CompanyId): async ?Types.Company {
    let company = List.find(companies, func(company: Types.Company): Bool {
      company.company_id == company_id
    });

    return company;
  };

  public func delete(company_id: Types.CompanyId): async ?Types.Company {
    let companyToDelete = List.find(companies, func(company: Types.Company): Bool {
      company.company_id == company_id
    });
    
    if(companyToDelete != null) {
      companies := List.filter(companies, func(company: Types.Company): Bool {
        Text.notEqual(company.company_id, company_id)
      });
    };
    
    return companyToDelete;
  };

  public func update(company_id: Types.CompanyId, companyBody: Types.CompanyCreatedParams): async ?Types.Company {
    let companyToUpdate = List.find(companies, func(company: Types.Company): Bool {
      company.company_id == company_id
    });

    var companyUpdatedFinded: ?Types.Company = null;

    if(companyToUpdate != null) {
      companies := List.map(companies, func(company: Types.Company): Types.Company {
        if(company.company_id == company_id) {

          let companyUpdated: Types.Company = {
            company_id = company.company_id;
            company_name = companyBody.company_name;
            company_description = companyBody.company_description;
            company_address = companyBody.company_address;
            company_country = companyBody.company_country;
            company_city = companyBody.company_city;
            company_state = companyBody.company_state;
            company_zip = companyBody.company_zip;
            company_gps = companyBody.company_gps;
            company_documents = companyBody.company_documents;
            created_at = company.created_at;  // Se mantiene la fecha de creación original
            updated_at = Time.now();
          };
          
          companyUpdatedFinded := ?companyUpdated;

          return companyUpdated;
        };
        return company;
      });
    };

    return companyUpdatedFinded;
  }
};
