import Time "mo:base/Time";
import Result "mo:base/Result"; 

module {

public type Ticket = {
    ticketId: Text;
    ticketStatus: Text;
    ticketSection: Text;
    ticketRow: Text;
    ticketSeat: Text;
    ticketDescription: Text;
    ticketQty: Text;
    ticketPrice: Text;
    ticketPriceIVU: Text;
    ticketServiceFee: Text;
    ticketServiceFeeIVU: Text;
    ticketPromoterFee: Text;
    ticketPromoterFeeIVU: Text;
    ticketClubSeatsFee: Text;
    ticketClubSeatsFeeIVU: Text;
    ticketFacilityFee: Text;
    ticketFacilityFeeIVU: Text;
    ticketOrderFeeWeb: Text;
    ticketOrderFeeWebIVU: Text;
    ticketTotal: Text;
};

public type Seat = {
    ticket: Ticket;
};

public type Event = {
    eventName: Text;
    eventArtist: Text;
    eventVenue: Text;
    eventCountry: Text;
    eventDateTime: Text;
    eventPromoterCompany: Text;
};

public type User = {
    name: Text;
    email: Text;
    phone: Text;
};

 public type OrderId = Text;


public type Order = {
    orderId: OrderId;
    status: Text;
    operation: Text;
    companyId: Text;
    event: Event;
    user: User;
    seats: [Seat];
};

  public type OrderCreatedParams = {
    status: ?Text;
    operation: ?Text;
    companyId: ?Text;
    event: ?Event;
    user: ?User;
    seats: ?[Seat];
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