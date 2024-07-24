import List "mo:base/List";
import Bool "mo:base/Bool";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Types "./types";

shared actor class Tickets() {
  stable var tickets = List.nil<Types.Ticket>();

  public query func getByOrder(orderId: Text) : async ([Types.Ticket]) {
    let ticketsByOrderId = List.filter(tickets, func (ticket: Types.Ticket): Bool {
      return ticket.order_id == orderId;
    });

    return List.toArray(ticketsByOrderId);
  };

  public query func getByEvent(eventId: Text) : async ([Types.Ticket]) {
    let ticketsByEventId = List.filter(tickets, func (ticket: Types.Ticket): Bool {
      return ticket.event_id == eventId;
    });

    return List.toArray(ticketsByEventId);
  };

  public query func total(): async Nat {
    return List.size(tickets);
  };

  public query func getAllTickets(): async ([Types.Ticket]) {
    return List.toArray(tickets);
  };

  public func create(ticketBody: Types.TicketCreatedParams): async Types.TicketCreated {
    let newId: Types.TicketId = Nat.toText(List.size(tickets));

    let ticket: Types.Ticket = {
      order_id = ticketBody.order_id;
      event_id = ticketBody.event_id;
      ticket_id = newId;
      asset_id = ticketBody.asset_id;
      ticket_status = ticketBody.ticket_status;
      ticket_section = ticketBody.ticket_section;
      ticket_row = ticketBody.ticket_row;
      ticket_seat = ticketBody.ticket_seat;
      ticket_description = ticketBody.ticket_description;
      ticket_qty = ticketBody.ticket_qty;
      ticket_price = ticketBody.ticket_price;
      ticket_price_ivu = ticketBody.ticket_price_ivu;
      ticket_service_fee = ticketBody.ticket_service_fee;
      ticket_service_fee_ivu = ticketBody.ticket_service_fee_ivu;
      ticket_promoter_fee = ticketBody.ticket_promoter_fee;
      ticket_promoter_fee_ivu = ticketBody.ticket_promoter_fee_ivu;
      ticket_club_seats_fee = ticketBody.ticket_club_seats_fee;
      ticket_club_seats_fee_ivu = ticketBody.ticket_club_seats_fee_ivu;
      ticket_facility_fee = ticketBody.ticket_facility_fee;
      ticket_facility_fee_ivu = ticketBody.ticket_facility_fee_ivu;
      ticket_order_fee_web = ticketBody.ticket_order_fee_web;
      ticket_order_fee_web_ivu = ticketBody.ticket_order_fee_web_ivu;
      ticket_total = ticketBody.ticket_price + ticketBody.ticket_service_fee + ticketBody.ticket_promoter_fee + ticketBody.ticket_club_seats_fee + ticketBody.ticket_facility_fee + ticketBody.ticket_order_fee_web;
      created_at = ?Time.now();
      updated_at = null;
    };

    tickets := List.push(ticket, tickets);

    return #ok({
      id = newId;
    });
  };

  public query func getById(ticket_id: Types.TicketId): async ?Types.Ticket {
    let ticket = List.find(tickets, func(ticket: Types.Ticket): Bool {
      ticket.ticket_id == ticket_id
    });

    return ticket;
  };

  public func delete(ticket_id: Types.TicketId): async ?Types.Ticket {
    let ticketToDelete = List.find(tickets, func(ticket: Types.Ticket): Bool {
      ticket.ticket_id == ticket_id
    });
    
    if(ticketToDelete != null) {
      tickets := List.filter(tickets, func(ticket: Types.Ticket): Bool {
        Text.notEqual(ticket.ticket_id, ticket_id)
      });
    };
    
    return ticketToDelete;
  };

  public func update(ticket_id: Types.TicketId, ticketBody: Types.TicketCreatedParams): async ?Types.Ticket {
    let ticketToUpdate = List.find(tickets, func(ticket: Types.Ticket): Bool {
      ticket.ticket_id == ticket_id
    });

    var ticketUpdatedFinded: ?Types.Ticket = null;

    if(ticketToUpdate != null) {
      tickets := List.map(tickets, func(ticket: Types.Ticket): Types.Ticket {
        if(ticket.ticket_id == ticket_id) {

          let ticketUpdated: Types.Ticket = {
            order_id = ticketBody.order_id;
            event_id = ticketBody.event_id;
            ticket_id = ticket.ticket_id;
            asset_id = ticketBody.asset_id;
            ticket_status = ticketBody.ticket_status;
            ticket_section = ticketBody.ticket_section;
            ticket_row = ticketBody.ticket_row;
            ticket_seat = ticketBody.ticket_seat;
            ticket_description = ticketBody.ticket_description;
            ticket_qty = ticketBody.ticket_qty;
            ticket_price = ticketBody.ticket_price;
            ticket_price_ivu = ticketBody.ticket_price_ivu;
            ticket_service_fee = ticketBody.ticket_service_fee;
            ticket_service_fee_ivu = ticketBody.ticket_service_fee_ivu;
            ticket_promoter_fee = ticketBody.ticket_promoter_fee;
            ticket_promoter_fee_ivu = ticketBody.ticket_promoter_fee_ivu;
            ticket_club_seats_fee = ticketBody.ticket_club_seats_fee;
            ticket_club_seats_fee_ivu = ticketBody.ticket_club_seats_fee_ivu;
            ticket_facility_fee = ticketBody.ticket_facility_fee;
            ticket_facility_fee_ivu = ticketBody.ticket_facility_fee_ivu;
            ticket_order_fee_web = ticketBody.ticket_order_fee_web;
            ticket_order_fee_web_ivu = ticketBody.ticket_order_fee_web_ivu;
            ticket_total = ticketBody.ticket_price + ticketBody.ticket_service_fee + ticketBody.ticket_promoter_fee + ticketBody.ticket_club_seats_fee + ticketBody.ticket_facility_fee + ticketBody.ticket_order_fee_web;
            created_at = ticket.created_at;
            updated_at = ?Time.now();
          };
          
          ticketUpdatedFinded := ?ticketUpdated;

          return ticketUpdated;
        };
        return ticket;
      });
    };

    return ticketUpdatedFinded;
  }
};
