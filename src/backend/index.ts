import {
  Record,
  Server,
  StableBTreeMap,
  text,
  nat64,
  Principal,
  Vec,
  nat8,
} from "azle";
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

// Data structures =============================>
type Transaction = {
  orderId: string;
  status: string;
  operation: string;
  companyId: string;
  event: {
    eventId: string;
    eventName: string;
    eventArtist: string;
    eventVenue: string;
    eventCountry: string;
    eventVenueGPS: string;
    eventDateTime: string;
    eventPromoterCompany: string;
    eventInformation: string;
  };
  user: {
    name: string;
    email: string;
    phone: string;
  };
  seats: [
    {
      ticket: {
        ticketId: string;
        ticketStatus: string;
        ticketSection: string;
        ticketRow: string;
        ticketSeat: string;
        ticketDescription: string;
        ticketQty: string;
        ticketPrice: string;
        ticketPriceIVU: string;
        ticketServiceFee: string;
        ticketServiceFeeIVU: string;
        ticketPromoterFee: string;
        ticketPromoterFeeIVU: string;
        ticketClubSeatsFee: string;
        ticketClubSeatsFeeIVU: string;
        ticketFacilityFee: string;
        ticketFacilityFeeIVU: string;
        ticketOrderFeeWeb: string;
        ticketOrderFeeWebIVU: string;
        ticketTotal: string;
      };
    }
  ];
};

let transaction: Transaction[] = [
  {
    orderId: "JAQ4L56",
    status: "new",
    operation: "sale",
    companyId: "1642e7f0-979d-4d57-aaa0-c73ed96622ae",
    event: {
      eventId: "d472d65e-b4cb-47ef-837d-544e4f26974c",
      eventName: "Journey - Freedom Tour 2022",
      eventArtist: "Journey",
      eventVenue: "Coliseo de Puerto Rico",
      eventCountry: "San Juan Puerto Rico",
      eventVenueGPS: "18.4277361,-66.0639617",
      eventDateTime: "09/23/2022 08:00PM",
      eventPromoterCompany:
        "Sireno Mesa, R&M Entertainment y Caribbean Concerts",
      eventInformation:
        "Por política del Coliseo y por su seguridad, se requiere que todo menor de 16 años esté acompañado por un adulto en todo momento durante los eventos. Esta regla aplica para todos los eventos que se llevan a cabo en el Coliseo de Puerto Rico.",
    },
    user: {
      name: "Juan del Pueblo",
      email: "juan.delpueblo@gmail.com",
      phone: "7873452022",
    },
    seats: [
      {
        ticket: {
          ticketId: "1256",
          ticketStatus: "active",
          ticketSection: "110",
          ticketRow: "A",
          ticketSeat: "15",
          ticketDescription: "",
          ticketQty: "1",
          ticketPrice: "155.00",
          ticketPriceIVU: "13.23",
          ticketServiceFee: "6.75",
          ticketServiceFeeIVU: "0.78",
          ticketPromoterFee: "4.00",
          ticketPromoterFeeIVU: "0.46",
          ticketClubSeatsFee: "5.00",
          ticketClubSeatsFeeIVU: "0.58",
          ticketFacilityFee: "2.00",
          ticketFacilityFeeIVU: "0.23",
          ticketOrderFeeWeb: "3.00",
          ticketOrderFeeWebIVU: "0.35",
          ticketTotal: "151.38",
        },
      },
    ],
  },
];

const Order = Record({
  orderId: text,
  status: text,
  operation: text,
  companyId: text,
  receivedAt: nat64,
  id: Principal,
});
type Order = typeof Order.tsType;
let Orders = StableBTreeMap<Principal, Order>(0);

const User = Record({
  id: Principal,
  createdAt: nat64,
  recordingIds: Vec(Principal),
  username: text,
  email: text,
  phone: text,
});
type User = typeof User.tsType;

const Event = Record({
  eventId: text,
  eventName: text,
  eventArtist: text,
  eventVenue: text,
  eventCountry: text,
  eventVenueGPS: nat8,
  eventDateTime: nat64,
  eventPromoterCompany: text,
  eventInformation: text,
});
type Event = typeof Event.tsType;

const Ticket = Record({
  orderId: text,
  eventId: text,
  id: Principal,
  ticketId: text,
  ticketStatus: text,
  ticketSection: text,
  ticketRow: text,
  ticketSeat: text,
  ticketDescription: text,
  ticketQty: text,
  ticketPrice: text,
  ticketPriceIVU: text,
  ticketServiceFee: text,
  ticketServiceFeeIVU: text,
  ticketPromoterFee: text,
  ticketPromoterFeeIVU: text,
  ticketClubSeatsFee: text,
  ticketClubSeatsFeeIVU: text,
  ticketFacilityFee: text,
  ticketFacilityFeeIVU: text,
  ticketOrderFeeWeb: text,
  ticketOrderFeeWebIVU: text,
  ticketTotal: text,
});
type Ticket = typeof Ticket.tsType;

const Company = Record({
  companyId: text,
  companyName: text,
  companyDescription: text,
});
type Company = typeof Company.tsType;

const Venue = Record({
  venueId: text,
  venueName: text,
  venueDescription: text,
  venueAddress: text,
  venueCountry: text,
  venueCity: text,
  venueState: text,
  venueZip: text,
  venueGPS: text,
});
type Venue = typeof Venue.tsType;
// Data structures =============================>

function postLog(req: Request, res: Response, next: NextFunction) {
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Method: ${req.method}`);
  console.log(`Request Headers: ${JSON.stringify(req.headers, null, 2)}`);
  console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);
  next();
}

// Middleware to validate Customer tokens
const customerFrontDoor = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers["authorization"];
  const vendorIdHeader = req.headers["rs_sec_hdr_vendor_id"];
  const vendorPasswordHeader = req.headers["rs_sec_hdr_vendor_password"];

  if (!authHeader || !vendorIdHeader || !vendorPasswordHeader) {
    return res.status(401).send("No authorization headers provided.");
  }

  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).send("Bearer token not provided");
  }

  console.log("authHeader: " + token.trimStart().trimEnd());
  console.log("vendorIdHeader: " + vendorIdHeader);
  console.log("vendorPasswordHeader: " + vendorPasswordHeader);

  console.log("Token: " + process.env.ACCESS_TOKEN_SECRET);
  console.log("Vendor Id: " + process.env.RS_SEC_HDR_VENDOR_ID);
  console.log("Vendor Password: " + process.env.RS_SEC_HDR_VENDOR_PASSWORD);

  if (
    token.trimStart().trimEnd() === process.env.ACCESS_TOKEN_SECRET && 
    vendorIdHeader.trimStart().trimEnd() === process.env.RS_SEC_HDR_VENDOR_ID && 
    vendorPasswordHeader.trimStart().trimEnd() === process.env.RS_SEC_HDR_VENDOR_PASSWORD
  ) {
    next(); // proceed to the next middleware or route handler
  } else {
    res.sendStatus(403); // if token is invalid, return 403 Forbidden
  }
};

export default Server(() => {
  const app = express();

  app.use(express.json());
  app.use(postLog);

  // GET
  app.get("/transactions", customerFrontDoor, (_req, res) => {
    res.json(transaction);
  });

  // GET
  app.get("/transactions/all", (_req, res) => {
    const sortedTransactions = transaction.sort((a, b) =>
      a.orderId.localeCompare(b.orderId)
    );
    res.json(sortedTransactions);
  });

  // POST
  app.post("/transactions", customerFrontDoor, (req, res) => {
    const { orderId } = req.body;

    const orderIdExists = transaction.some(
      (transaction) => transaction.orderId === orderId
    );

    if (orderIdExists) {
      res
        .status(409)
        .send("Order transation with this OrderId already exists.");
      return;
    }

    transaction = [...transaction, req.body];
    res.send("Ticket transaction added successfully!");

    // Distribute payload into Stable Structures

    // Store the Order
  });

  // PUT
  app.put("/voidticket/:ticketId", customerFrontDoor, (req, res) => {
    const ticketId = req.params.ticketId;
    const newStatus = req.body.status;

    // Find the ticket directly
    const foundTicket = transaction.find((t) =>
      t.seats.some((seat) => seat.ticket.ticketId === ticketId)
    );

    console.log("Found ticket: " + foundTicket);

    if (!foundTicket) {
      res.status(404).send("Ticket with the specified ID not found.");
      return;
    }

    // Update the ticket status
    foundTicket.seats.forEach((seat) => {
      if (seat.ticket.ticketId === ticketId) {
        seat.ticket.ticketStatus = newStatus;
        console.log("Actual status: " + seat.ticket.ticketStatus);
        console.log("New status: " + newStatus);
      }
    });

    res.send("Ticket status updated successfully!");
  });

  // DELETE
  app.delete("/transactions/:orderid", customerFrontDoor, (req, res) => {
    const orderId = req.params.orderid;

    // Find the ticket directly
    const orderIdExists = transaction.some(
      (transaction) => transaction.orderId === orderId
    );

    if (!orderIdExists) {
      res.status(404).send("Order with the specified ID not found.");
      return;
    }

    transaction = transaction.filter(
      (transaction) => transaction.orderId !== orderId
    );
    res.send("Ticket transaction deleted successfully!");
  });

  app.use(express.static("/dist"));

  return app.listen();
});
