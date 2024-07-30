/* 
   MUST IMPLEMENT BEST PRACTICES FROM
   OWASP API Security Project
   https://owasp.org/www-project-api-security/ 
*/

import { Server, Principal, serialize } from "azle";
import express, { Request, Response, NextFunction, Router } from "express";
import { validateTicket } from "./json_zod_validation";
import { initSatellite, setDoc } from "@junobuild/core";
import { nanoid } from "nanoid";
// import { ipWhitelistMiddleware } from './ipWhitelistMiddleware';

const toMetadataNft = (obj: { [key: string]: any }) => {
  const metadata: { [key: string]: any } = {};

  const types = {
    string: "TextContent",
    number: "NatContent",
    boolean: "Bool",
    bigint: "Nat64Content",
    undefined: "",
    object: "",
    function: "",
    symbol: "",
  };

  Object.keys(obj).forEach((entrie: string) => {
    const val = obj[entrie];
    const type = types[typeof val];
    metadata[entrie] = {
      [type]: val,
    };
  });

  return metadata;
};

async function initializeApp() {
  await initSatellite({
    satelliteId: "reahh-3qaaa-aaaal-ajmkq-cai",
  });
}
initializeApp();

// Data structures =============================>
type Transaction = {
  order_id: string;
  status: string;
  operation: string;
  company_id: string;
  event_id: string;
  user: {
    email: string;
    phone: string;
  },
  sale: [
    {
      ticket: {
        ticket_id: string;
        ticket_status: string;
        ticket_section: string;
        ticket_row: string;
        ticket_seat: string;
        ticket_description: string;
        ticket_qty: number;
        ticket_price: number;
        fees: [
          {
            fee_id: string;
            fee_description: string;
            fee_amount: number;
            taxes: {
              tax_id: string;
              tax_description: string;
              tax_amount: number;
            }
          }
        ],
        ticket_total: number;
      }
    }
  ]
};

let transaction: Transaction[] = [
  {
    "order_id": "HEA4L30",
    "status": "new",
    "operation": "sale",
    "company_id": "4542e7f0-675k-4f57-bca0-c73er95272sw",
    "event_id": "f482d45e-t5cb-47yn-857d-524t4f86274r",
    "user": {
      "email": "hello@evntz.io",
      "phone": "7871234589"
    },
    "sale": [
      {
        "ticket": {
          "ticket_id": "0005",
          "ticket_status": "active",
          "ticket_section": "101",
          "ticket_row": "A",
          "ticket_seat": "05",
          "ticket_description": "VIP",
          "ticket_qty": 1,
          "ticket_price": 999.00,
          "fees": [
            {
              "fee_id": "A0",
              "fee_description": "Base Price",
              "fee_amount": 999.00,
              "taxes": {
                "tax_id": "6%",
                "tax_description": "6%",
                "tax_amount": 13.23
              }
            }
          ],
          "ticket_total": 1035.38
        }
      }
    ]
  },
];

type Company_configs = {
  ACCESS_TOKEN_SECRET: string;
  RS_SEC_HDR_VENDOR_ID: string;
  RS_SEC_HDR_VENDOR_PASSWORD: string;
};

let company_configs: Company_configs = {
  "ACCESS_TOKEN_SECRET": "b59bde1a-f5f6-457f-8ad9-29b4c32e0b2r",
  "RS_SEC_HDR_VENDOR_ID": "353767e3-b069-47a3-92c9-3be4bbafda85",
  "RS_SEC_HDR_VENDOR_PASSWORD": "H$&5m*CaKY7$4@O129V*q3%vH@yL#T"
};
// Data structures =============================>

function postLog(req: Request, res: Response, next: NextFunction) {
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Method: ${req.method}`);
  console.log(`Request Headers: ${JSON.stringify(req.headers, null, 2)}`);
  console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);
  next();
}

// async function getConnectedCompany() {
//   const ConnCompanyDoc = await getDoc({
//     collection: "company",
//     key: "-j2WsqfnmK6kIctELn9QB"
//   });
//   console.log("Company from Juno: ", ConnCompanyDoc);
// };

// async function getConnectedCompanyConfigs() {
//   const ConnCompanyConfigDoc = await getDoc({
//     collection: "company_configs",
//     key: "APoNwJLBwgE-e2vF_KIaR"
//   });
//   console.log("Company config from Juno: ", ConnCompanyConfigDoc);
// };

// async function getConnectedCompanyData() {
//   try {
//     await getConnectedCompany();
//     await getConnectedCompanyConfigs();
//   } catch (error) {
//     console.error("Error creating company:", error);
//   }
// }
// getConnectedCompanyData();


// Middleware to validate Customer Tokens
const customerFrontDoor = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"] as string;
  const vendorIdHeader = req.headers["rs_sec_hdr_vendor_id"] as string;
  const vendorPasswordHeader = req.headers["rs_sec_hdr_vendor_password"] as string;
  //const clientIP = req.ip as string;

  if (!authHeader || !vendorIdHeader || !vendorPasswordHeader) {
    return res.status(401).json({ error: "No authorization headers provided." });
  }

  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Token not found." });
  }

  //console.log("IP: " + clientIP.trimStart().trimEnd());
  console.log("authHeader: " + token.trimStart().trimEnd());
  console.log("vendorIdHeader: " + vendorIdHeader.trimStart().trimEnd());
  console.log("vendorPasswordHeader: " + vendorPasswordHeader.trimStart().trimEnd());
  console.log("Token: " + company_configs.ACCESS_TOKEN_SECRET.toString());
  console.log("Vendor Id: " + company_configs.RS_SEC_HDR_VENDOR_ID.toString());
  console.log("Vendor Password: " + company_configs.RS_SEC_HDR_VENDOR_PASSWORD.toString());

  if (token.trimStart().trimEnd() === company_configs.ACCESS_TOKEN_SECRET.toString() &&
    vendorIdHeader.trimStart().trimEnd() === company_configs.RS_SEC_HDR_VENDOR_ID.toString() &&
    vendorPasswordHeader.trimStart().trimEnd() === company_configs.RS_SEC_HDR_VENDOR_PASSWORD.toString()
  ) {
    next(); // proceed to the next middleware or route handler
  } else {
    res.sendStatus(403).json({ error: "403 Forbidden" }); // if token is invalid, return 403 Forbidden
  }
};

const toJson = (json: { [key: string]: any }) => (
  JSON.parse(JSON.stringify(json, (_key, value) =>
    typeof value === 'bigint'
      ? Number(value.toString())
      : value // return everything else unchanged
  ))
)

export default Server(() => {
  const app = express();
  app.use(express.json());
  app.use(postLog);
  const nft = Router();
  
  // GET
  nft.get("/total", async (req, res) => {
    try {
      const response = await fetch(`icp://${process.env.NFT_ID}/totalSupplyDip721`, {
        body: serialize({
          candidPath: "/candid/nft.did",
          args: []
        })
      });
      const responseJson = await response.json();
      res.json(toJson(responseJson));
    } catch (err) {
      res.send({
        error: err,
      });
    }
  });

  // POST
  nft.post("/mint", async (req, res) => {
    const minter: string = req.body.minter;
    const metadataNft: { [key: string]: any } = req.body.metadata;

    try {
      const response = await fetch(`icp://${process.env.NFT_ID}/mintDip721`, {
        body: serialize({
          candidPath: "/candid/nft.did",
          args: [Principal.fromText(minter), metadataNft]
        })
      });

      const responseJson = await response.json();
      res.json(toJson(responseJson));
    } catch (err) {
      res.send(`${err}`);
    }
  });

  // PUT
  nft.put("/update", async (req, res) => {
    const tokenId: string = req.body.token;
    const key: string = req.body.key;
    const metadataNft: { [key: string]: any } = req.body.metadata;

    try {
      const response = await fetch(`icp://${process.env.NFT_ID}/update_value`, {
        body: serialize({
          candidPath: "/candid/nft.did",
          args: [tokenId, key, metadataNft]
        })
      });

      const responseJson = await response.json();
      res.json(toJson(responseJson));
    } catch (err) {
      res.send(`${err}`);
    }
  });

  // GET
  nft.get("/tokens/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const response = await fetch(`icp://${process.env.NFT_ID}/getTokenIdsForUserDip721`, {
        body: serialize({
          candidPath: "/candid/nft.did",
          args: [id]
        })
      });

      const responseJson = await response.json();
      res.json(toJson(responseJson));
    } catch (err) {
      res.send(`${err}`);
    }
  });

  // GET
  nft.get("/tokens/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const response = await fetch(`icp://${process.env.NFT_ID}/getTokenIdsForUserDip721`, {
        body: serialize({
          candidPath: "/candid/nft.did",
          args: [id]
        })
      });

      const responseJson = await response.json();
      res.json(toJson(responseJson));
    } catch (err) {
      res.send(`${err}`);
    }
  });

  // GET
  nft.get("/metadata/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const response = await fetch(`icp://${process.env.NFT_ID}/getMetadataForUserDip721`, {
        body: serialize({
          candidPath: "/candid/nft.did",
          args: [id]
        })
      });

      const responseJson = await response.json();
      res.json(toJson(responseJson));
    } catch (err) {
      res.send(`${err}`);
    }
  });

  // POST
  nft.post("/transfer", async (req, res) => {
    const { from, to, tokenId } = req.body;

    try {
      const response = await fetch(`icp://${process.env.NFT_ID}/safeTransferFromDip721`, {
        body: serialize({
          candidPath: "/candid/nft.did",
          args: [from, to, tokenId]
        })
      });

      const responseJson = await response.json();
      res.json(toJson(responseJson));
    } catch (err) {
      res.send(`${err}`);
    }
  });

  app.use("/v1/nft", nft);

  // GET
  app.get("/v1/tickets/all", async (_req, res) => {
    res.json(transaction);
  });

  // GET
  app.get("/v1/tickets/all/sorted", async (_req, res) => {
    const sortedTransactions = transaction.sort((a, b) =>
      a.order_id.localeCompare(b.order_id)
    );
    res.json(sortedTransactions);
  });

  // POST
  app.post("/v1/tickets/post", customerFrontDoor, async (req, res) => {
    const result = validateTicket(req.body);

    if (result.error) {
      console.error(result.error.errors);
      return res.status(400).json({ error: "Invalid input data.", details: result.error.errors });
    }
    else {
      console.log('Validation successful');

      const orderIdExists = transaction.some(
        (transaction) => transaction.order_id === req.body.order_id
      );

      if (orderIdExists) {
        return res.status(409).json({ error: "Can't post this transaction." });
      }

      /**************************************/
      /* JUNO DATABASE COLLECTIONS -> START */
      /**************************************/

      /*TODO: ORDERS COLLECTION */
        const orderId = nanoid();
        try {
          const doc = await setDoc({
            collection: "orders",
            doc: {
              key: orderId,
              data: {
                order_id: orderId,
                status: req.body.status,
                operation: req.body.operation,
                company_id: req.body.company_id,
                event_id: req.body.event_id,
                user_email: req.body.user.email,
                received_at: new Date().toLocaleString(),
              },
            },
          });
          
          const metadata = toMetadataNft(doc.data);
          
          try {
            const response = await fetch(`icp://${process.env.NFT_ID}/mintDip721`, {
              body: serialize({
                candidPath: "/candid/nft.did",
                args: [Principal.fromText(req.body.minter), metadata]
              })
            });
      
            const responseJson = await response.json();
            res.json(toJson(responseJson));
          } catch (err) {
            res.send(`${err}`);
          }

          console.log("Document added successfully:");
        } catch (error) {
          console.error("Error adding document:", error);
        }
      /*TODO: ORDERS COLLECTION */

      /**************************************/
      /* JUNO DATABASE COLLECTIONS -> START */
      /**************************************/
      transaction = [...transaction, req.body];
      res.json({ message: "Ticket transaction added successfully!" });

      function generateId(): Principal {
        const randomBytes = new Array(29)
          .fill(0)
          .map((_) => Math.floor(Math.random() * 256));

        return Principal.fromUint8Array(Uint8Array.from(randomBytes));
      }

      // Store the Order information
      // Canister({
      //   createOrder: update([text], Order, (orderId) => {
      //     const id = generateId();
      //     const order: Order = {
      //       orderId,
      //       id,
      //       status: req.body.status,
      //       operation: req.body.operation,
      //       companyId: req.body.company_id,
      //       receivedAt: ic.time(),
      //       eventId: req.body.event_id,
      //     };

      //     orders.insert(order.orderId, order);
      //     return order;
      //   }),
      //   readOrders: query([], Vec(Order), () => {
      //     return orders.values();
      //   }),
      // });
    }
  });

  // PUT
  app.put("/v1/tickets/put/:ticketId", async (req, res) => {
    const ticketId = req.params.ticketId;
    const newStatus = req.body.status;

    // Find the ticket directly
    const foundTicket = transaction.find((t) =>
      t.sale.some((sale) => sale.ticket.ticket_id === ticketId)
    );

    console.log("Found ticket: " + foundTicket);

    if (!foundTicket) {
      res.status(404).json({ error: "Ticket with the specified ID not found." });
      return;
    }

    // Update the ticket status
    foundTicket.sale.forEach((sale) => {
      if (sale.ticket.ticket_id === ticketId) {
        sale.ticket.ticket_status = newStatus;
        console.log("Actual status: " + sale.ticket.ticket_status);
        console.log("New status: " + newStatus);
      }
    });

    res.send("Ticket status updated successfully!");
  });

  // DELETE
  app.delete("/v1/tickets/delete/:orderid", async (req, res) => {
    const orderId = req.params.orderid;

    // Find the ticket directly
    const orderIdExists = transaction.some(
      (transaction) => transaction.order_id === orderId
    );

    if (!orderIdExists) {
      res.status(404).send("Order with the specified ID not found.");
      return;
    }

    transaction = transaction.filter(
      (transaction) => transaction.order_id !== orderId
    );
    res.send("Ticket transaction deleted successfully!");
  });

  app.use(express.static("/dist"));

  return app.listen();
});
