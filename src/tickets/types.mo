import Time "mo:base/Time";
import Result "mo:base/Result"; 

module {
  public type ApiError = {
    #Unauthorized;
    #Other;
  };
  public type TicketId = Text;

  public type Ticket = {
    order_id: Text;
    event_id: Text;
    ticket_id: TicketId;
    asset_id: Text;
    ticket_status: Text;
    ticket_section: Text;
    ticket_row: Text;
    ticket_seat: Text;
    ticket_description: Text;
    ticket_qty: Int;
    ticket_price: Int;
    ticket_price_ivu: Int;
    ticket_service_fee: Int;
    ticket_service_fee_ivu: Int;
    ticket_promoter_fee: Int;
    ticket_promoter_fee_ivu: Int;
    ticket_club_seats_fee: Int;
    ticket_club_seats_fee_ivu: Int;
    ticket_facility_fee: Int;
    ticket_facility_fee_ivu: Int;
    ticket_order_fee_web: Int;
    ticket_order_fee_web_ivu: Int;
    ticket_total: Int;
    created_at: ?Time.Time;
    updated_at: ?Time.Time;
  };

  public type TicketCreatedParams = {
    order_id: Text;
    event_id: Text;
    asset_id: Text;
    ticket_status: Text;
    ticket_section: Text;
    ticket_row: Text;
    ticket_seat: Text;
    ticket_description: Text;
    ticket_qty: Int;
    ticket_price: Int;
    ticket_price_ivu: Int;
    ticket_service_fee: Int;
    ticket_service_fee_ivu: Int;
    ticket_promoter_fee: Int;
    ticket_promoter_fee_ivu: Int;
    ticket_club_seats_fee: Int;
    ticket_club_seats_fee_ivu: Int;
    ticket_facility_fee: Int;
    ticket_facility_fee_ivu: Int;
    ticket_order_fee_web: Int;
    ticket_order_fee_web_ivu: Int;
  };

  public type TicketCreatedPart = {
    id: TicketId;
  };

  public type TicketCreated = Result.Result<TicketCreatedPart, ApiError>;

}