import { initSatellite, setDoc } from "@junobuild/core";
import { nanoid } from "nanoid";

async function initializeApp() {
  await initSatellite({
    satelliteId: "reahh-3qaaa-aaaal-ajmkq-cai",
  });
}
initializeApp();

async function createCompany() {
  const companyId = nanoid();

  const doc = await setDoc({
    collection: "company",
    doc: {
      key: companyId,
      data: {
        company_id: companyId,
        company_status: "Active",
        company_name: "EVNTZ",
        company_description: "Emergente LLC",
        company_address: "Guaynabo",
        company_country: "Puerto Rico",
        company_city: "Guaynabo",
        company_state: "PR",
        company_zip: "00971",
        company_gps: "123456`",
        company_documents: "",
      },
    },
  });

  console.log("Company created: ", doc);
}

async function createCompanyConfigs() {
  const configsId = nanoid();

  const doc = await setDoc({
    collection: "company_configs",
    doc: {
      key: configsId,
      data: {
        company_config_id: configsId,
        company_id: "dabbc655-584d-4a92-ba85-6f2a73dc7fc4",
        access_token_secret: "Bearer b59bde1a-f5f6-457f-8ad9-29b4c32e0b2r",
        vendor_id: "353767e3-b069-47a3-92c9-3be4bbafda85",
        vendor_password: "H$&5m*CaKY7$4@O129V*q3%vH@yL#T",
        ip_whitelist:
          "127.0.0.1, http://be2us-64aaa-aaaaa-qaabq-cai.localhost:8000",
      },
    },
  });

  console.log("Company Configs created:", doc);
}

async function createOrder() {
  const orderId = nanoid();

  const doc = await setDoc({
    collection: "orders",
    doc: {
      key: orderId,
      data: {
        order_id: orderId,
        status: "Active",
        operation: "sale",
        company_id: "dabbc655-584d-4a92-ba85-6f2a73dc7fc4",
        event_id: "353767e3-b069-47a3-92c9-3be4bbafda85",
        user_email: "hello@evntz.io",
        received_at: new Date().toISOString()
      },
    },
  });

  console.log("Order created:", doc);
}

async function createUser() {
  const userId = nanoid();

  const doc = await setDoc({
    collection: "users",
    doc: {
      key: userId,
      data: {
        user_id: userId,
        id: "Principal",
        email: "hello@evntz.io",
        phone: "17871112233",
        role: "dabbc655-584d-4a92-ba85-6f2a73dc7fc4"
      },
    },
  });

  console.log("User created:", doc);
}

async function createEvent() {
  const eventId = nanoid();

  const doc = await setDoc({
    collection: "events",
    doc: {
      key: eventId,
      data: {
        event_id: eventId,
        company_id: "id here",
        event_name: "Demo Day",
        event_artist: "EVNTZ",
        venue_id: "id here",
        event_date: "7/31/2024",
        event_time: "8:00 PM",        
        event_information: "Any information here"
      },
    },
  });

  console.log("Event created:", doc);
}

async function createTicket() {
  const ticketId = nanoid();

  const doc = await setDoc({
    collection: "tickets",
    doc: {
      key: ticketId,
      data: {
        ticket_index: ticketId,
        ticket_id: "0005",
        order_id: "id here",
        event_id: "id here",
        asset_id: "id here",
        ticket_status: "active",
        ticket_section: "101",
        ticket_row: "A",
        ticket_seat: "05",
        ticket_description: "VIP",
        ticket_qty: 1,
        ticket_price: 999.00,
        ticket_total: 1035.38
      },
    },
  });

  console.log("Ticket created:", doc);
}

async function createTax() {
  const taxId = nanoid();

  const doc = await setDoc({
    collection: "taxes",
    doc: {
      key: taxId,
      data: {
        tax_index: taxId,
        tax_id: "6%",
        tax_description: "6%",
        tax_amount: 0.06
      },
    },
  });

  console.log("Tax created:", doc);
}

async function createFee() {
  const feeId = nanoid();

  const doc = await setDoc({
    collection: "fees",
    doc: {
      key: feeId,
      data: {
        fee_index: feeId,
        fee_id: "A0",
        ticket_index: "id here",
        fee_description: "Base Price",
        fee_amount: 999.00,
        tax_index: "tax_id here"
      },
    },
  });

  console.log("Fee created:", doc);
}

async function createVenue() {
  const venueId = nanoid();
  const index = nanoid();

  const doc = await setDoc({
    collection: "venues",
    doc: {
      key: venueId,
      data: {
        venue_id: index,
        venue_name: "Coliseo de Puerto Rico",
        venue_description: "Coliseo de Puerto Rico",
        venue_address: "San Juan",
        venue_country: "Puerto Rico",
        venue_city: "San Juan",
        venue_state: "PR",
        venue_zip: "00914",
        venue_gps: "18.4277361,-66.0639617"
      },
    },
  });

  console.log("Venue created:", doc);
}

async function setupCompany() {
  try {
    await createCompany();
    await createCompanyConfigs();
    await createOrder();
    await createUser();
    await createEvent();
    await createTicket();
    await createFee();
    await createTax();
    await createVenue();
  } catch (error) {
    console.error("Error:", error);
  }
}