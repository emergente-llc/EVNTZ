/* MUST IMPLEMENT BEST PRACTICES FROM
   OWASP API Security Project
   https://owasp.org/www-project-api-security/ 
*/

import {
  Record,
  Server,
  StableBTreeMap,
  Canister,
  text,
  nat64,
  Principal,
  Vec,
  nat8,
  ic,
  update,
  query,
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
  eventId: text,
});
type Order = typeof Order.tsType;
let orders = StableBTreeMap<text, Order>(0);

const User = Record({
  id: Principal,
  createdAt: nat64,
  username: text,
  email: text,
  phone: text,
});
type User = typeof User.tsType;
let users = StableBTreeMap<Principal, User>(1);

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
let events = StableBTreeMap<text, Event>(2);

const Ticket = Record({
  orderId: text,
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
let tickets = StableBTreeMap<Principal, Ticket>(3);

const Company = Record({
  companyId: text,
  companyName: text,
  companyDescription: text,
  companyAddress: text,
  companyCountry: text,
  companyCity: text,
  companyState: text,
  companyZip: text,
  companyGPS: text,
});
type Company = typeof Company.tsType;
let companies = StableBTreeMap<text, Company>(4);

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
let venues = StableBTreeMap<text, Venue>(5);
// Data structures =============================>

function postLog(req: Request, res: Response, next: NextFunction) {
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Method: ${req.method}`);
  console.log(`Request Headers: ${JSON.stringify(req.headers, null, 2)}`);
  console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);
  next();
}

// Middleware to validate Customer Tokens
const customerFrontDoor = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const vendorIdHeader = req.headers["rs_sec_hdr_vendor_id"];
  const vendorPasswordHeader = req.headers["rs_sec_hdr_vendor_password"];

  if (!authHeader || !vendorIdHeader || !vendorPasswordHeader) {
    return res.status(401).send("No authorization headers provided.");
  }

  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).send("Token not found.");
  }

  console.log("authHeader: " + token.trimStart().trimEnd());
  console.log("vendorIdHeader: " + vendorIdHeader);
  console.log("vendorPasswordHeader: " + vendorPasswordHeader);

  console.log("Token: " + process.env.ACCESS_TOKEN_SECRET);
  console.log("Vendor Id: " + process.env.RS_SEC_HDR_VENDOR_ID);
  console.log("Vendor Password: " + process.env.RS_SEC_HDR_VENDOR_PASSWORD);

  if (token.trimStart().trimEnd() === process.env.ACCESS_TOKEN_SECRET &&
    vendorIdHeader.trimStart().trimEnd() === process.env.RS_SEC_HDR_VENDOR_ID &&
    vendorPasswordHeader.trimStart().trimEnd() === process.env.RS_SEC_HDR_VENDOR_PASSWORD
  ) {
    next();
  } else {
    res.sendStatus(500).send("Internal Server Error");
  }
};

export default Server(() => {
  const app = express();

  app.use(express.json());
  app.use(postLog);

  // GET
  app.get("/v1/tickets/all", customerFrontDoor, (_req, res) => {
    res.json(transaction);
  });

  // GET
  app.get("/v1/tickets/all/sorted", (_req, res) => {
    const sortedTransactions = transaction.sort((a, b) =>
      a.orderId.localeCompare(b.orderId)
    );
    res.json(sortedTransactions);
  });

  // POST
  app.post("/v1/tickets/post", customerFrontDoor, (req, res) => {
    const { orderId } = req.body;

    // Input validation
    if (typeof orderId !== "string") {
      return res.status(400).send("Invalid input data.");
    }

    const orderIdExists = transaction.some(
      (transaction) => transaction.orderId === orderId
    );

    if (orderIdExists) {
      res.status(409).send("Can't post this transaction.");
      return;
    }

    // sanitize req.body
    const sanitizedBody = req.body;
    // Replace any SQL keywords with empty strings
    for (const key in sanitizedBody) {
      if (typeof sanitizedBody[key] === "string") {
        sanitizedBody[key] = sanitizedBody[key].replace(
          /\b(?:SELECT|JOIN|WHERE|AND|OR|DELETE|UPDATE|UNION|INSERT|LIKE|DROP|ALTER|TRUNCATE)\b/gi, ""
        );
      }
    }
    //req.body = sanitizedBody;

    transaction = [...transaction, sanitizedBody];
    res.send("Ticket transaction added successfully!");

    // Store the Order information
    // export default Canister({
    //   createOrder: update([text], Order, (orderId) => {
    //     const id = generateId();
    //     const order: Order = {
    //       orderId,
    //       id,
    //       status: req.body.status,
    //       operation: req.body.operation,
    //       companyId: req.body.companyId,
    //       receivedAt: ic.time(),
    //       eventId: req.body.eventId,
    //     };

    //     orders.insert(order.orderId, order);
    //     return order;
    //   }),
    //   readOrders: query([], Vec(Order), () => {
    //     return orders.values();
    //   }),
    // });

    // function generateId(): Principal {
    //   const randomBytes = new Array(29)
    //     .fill(0)
    //     .map((_) => Math.floor(Math.random() * 256));

    //   return Principal.fromUint8Array(Uint8Array.from(randomBytes));
    // }
  });

  // PUT
  app.put("/v1/tickets/put/:ticketId", customerFrontDoor, (req, res) => {
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
  app.delete("/v1/tickets/delete/:orderid", customerFrontDoor, (req, res) => {
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
