import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { initSatellite, setDoc, signIn, signOut,  NFIDProvider, authSubscribe, type User, Unsubscribe } from "@junobuild/core";
import { nanoid } from "nanoid";
import "./nft";

// Update the top-level await to be within an async function
async function initializeApp() {
  await initSatellite({
    satelliteId: "reahh-3qaaa-aaaal-ajmkq-cai"
  });
}
initializeApp();

@customElement("azle-app")
export class AzleApp extends LitElement {
  @property()
  sortedTransactions = {};
  transactions: any[] = [];
  @property()
  nftsTotal = 0;
  unsubscribeAuth: Unsubscribe = () => {};
  @property()
  user: User | null = null;

  constructor() {
    super();
    this.getAllTransaction();
    this.getNftsTotal();
    this.setupCompany();
  }

  async createCompany() {
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
          company_documents: "List of assets",
        },
      },
    });
  
    console.log("Company created: ", doc);
  }
  
  async createCompanyConfigs() {
    const configsId = nanoid();

    const doc = await setDoc({
      collection: "company_configs",
      doc: {
        key: configsId,
        data: {
          company_config_id: configsId,
          company_id: "company id here",
          access_token_secret: "Bearer b59bde1a-f5f6-457f-8ad9-29b4c32e0b2r",
          vendor_id: "353767e3-b069-47a3-92c9-3be4bbafda85",
          vendor_password: "H$&5m*CaKY7$4@O129V*q3%vH@yL#T",
          ip_whitelist: "127.0.0.1, http://be2us-64aaa-aaaaa-qaabq-cai.localhost:8000",
        },
      },
    });
  
    console.log("Company Configs created:", doc);
  }
  
  async setupCompany() {
    try {
      await this.createCompany();
      await this.createCompanyConfigs();
    } catch (error) {
      console.error("Error creating company:", error);
    }
  }

  getNftsTotal = async () =>{
    const response = await fetch(
      `${import.meta.env.VITE_CANISTER_ORIGIN}/v1/nft/total`
    );
    const total = await response.text();

    this.nftsTotal = +total;
  }

  async getAllTransaction() {
    const response = await fetch(
      //'${import.meta.env.VITE_CANISTER_ORIGIN}/v1/tickets/all/sorted'
      'http://be2us-64aaa-aaaaa-qaabq-cai.localhost:8000/v1/tickets/all/sorted'
    );
    const responseJson = await response.json();

    this.sortedTransactions = responseJson;
    this.transactions = responseJson;
  }

  protected createRenderRoot() {
    return this;
  }

  handleAddNftsTotal = () => {
    this.nftsTotal++;
  };

  connectedCallback() {
    super.connectedCallback();
    
    window.addEventListener("add-nfts-total", this.handleAddNftsTotal);

    this.unsubscribeAuth = authSubscribe((user: User | null) => {
     this.user = user;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    
    window.removeEventListener("add-nfts-total", this.handleAddNftsTotal);
    this.unsubscribeAuth();
  }
  
  signInAsync = async () => {
    await signIn({
      provider: new NFIDProvider({
        appName: "EVNTZ",
        logoUrl: "dist/website/assets/images/evntz.png" // "../logo/evntz_logo.png"
      })
    });
  }

  signOutAsync = async () => {
    await signOut();
  }

  render() {
    return html`

        <section data-bs-version="5.1" class="counter1 counters cid-ugXs5vm9Vt pt-3" id="counter1-1h">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-12 content-head">
                <div class="card-wrapper mb-5">
                  <div class="card-box align-center">
                    <button type="button" class="btn btn-warning" @click=${this.setupCompany}>
                      Set Company Setups
                    </button>

                    <button type="button" class="btn btn-primary" @click=${this.getAllTransaction}>
                      Fetch all transactions
                    </button>
                    
                    ${this.user ? html`<button type="button" class="btn btn-warning" @click=${this.signOutAsync}>
                      Sign out with NFID
                    </button>` : html`<button type="button" class="btn btn-info" @click=${this.signInAsync}>
                      Sign in with NFID
                    </button>`}

                    ${this.user ? html`Login User: ${this.user.key}` : ""}

                    <h5 class="mbr-section-title mbr-fonts-style mb-4 display-1" style="font-weight: 700; font-size: 64px; font-family: Inter Tight, sans-serif; text-align: center;">
                      Transactions
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="row content-row mt-4">
              <div class="item features-without-image col-12 col-md-6 col-lg-3 item-mb" style="text-align: center;">
                <div class="item-wrapper">
                  <div class="title mb-3">
                    <h3 class="count mbr-fonts-style display-1">
                      <span style="color: #9fe870; font-weight: 700; text-align: center;" class="align-center">
                        ${Object.keys(this.sortedTransactions).length}
                      </span>
                    </h3>
                  </div>
                  <h4 class="card-title mbr-fonts-style display-5">
                    <span style="font-weight: 700; font-size: 31.168px; text-align: center;">
                      <strong>Received</strong>
                    </span>
                  </h4>
                </div>
              </div>
              <div class="item features-without-image col-12 col-md-6 col-lg-3 item-mb" style="text-align: center;">
                <div class="item-wrapper">
                  <div class="title mb-3">
                    <h3 class="count mbr-fonts-style display-1">
                      <span style="color: #9fe870; font-weight: 700; text-align: center;" class="align-center">
                        ${Object.keys(this.sortedTransactions).length}
                      </span>
                    </h3>
                  </div>
                  <h4 class="card-title mbr-fonts-style display-5">
                    <span style="font-weight: 700; font-size: 31.168px; text-align: center;">
                      <strong>Processed</strong>
                    </span>
                  </h4>
                </div>
              </div>
              <div class="item features-without-image col-12 col-md-6 col-lg-3 item-mb" style="text-align: center;">
                <div class="item-wrapper">
                  <div class="title mb-3">
                    <h3 class="count mbr-fonts-style display-1">
                      <span style="color: #9fe870; font-weight: 700; text-align: center;" class="align-center">
                        ${this.nftsTotal}
                      </span>
                    </h3>
                  </div>
                  <h4 class="card-title mbr-fonts-style display-5">
                    <span style="font-weight: 700; font-size: 31.168px; text-align: center;">
                      <strong>NFTs Created</strong>
                    </span>
                  </h4>
                </div>
              </div>
              <div class="item features-without-image col-12 col-md-6 col-lg-3 item-mb" style="text-align: center;">
                <div class="item-wrapper">
                  <div class="title mb-3">
                    <h3 class="count mbr-fonts-style display-1">
                      <span style="color: #9fe870; font-weight: 700; text-align: center;" class="align-center">
                        ${this.nftsTotal}
                      </span>
                    </h3>
                  </div>
                  <h4 class="card-title mbr-fonts-style display-5">
                    <span style="font-weight: 700; font-size: 31.168px; text-align: center;">
                      <strong>Active NFTs</strong>
                    </span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        <br><br>
            
        <div class="container">
          ${this.transactions.map(transaction => html`
            <div class="card my-3">
              <div class="card-header">
                <strong>Order ID:</strong> <span class="badge bg-primary">${transaction.order_id}</span>
              </div>
              <div class="card-body">
                <h5 class="card-title">
                  <span style="color: #52007D">
                    Event: ${transaction.event_id}
                  </span>
                </h5>
                <p class="card-text">
                  <strong>Status:</strong> <span class="badge bg-success">${transaction.status}</span><br>
                  <strong>Operation:</strong> ${transaction.operation}<br>
                  <strong>Company ID:</strong> ${transaction.company_id}<br>
                  <strong>Email:</strong> ${transaction.user.email}<br>
                  <strong>Phone:</strong> ${transaction.user.phone}
                </p>
                <h5>Event Details</h5>
                <p>
                  <strong>Event ID:</strong> ${transaction.event_id}<br>
                </p>
                <h5>Seats</h5>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Status</th>
                      <th>Section</th>
                      <th>Row</th>
                      <th>Seat</th>
                      <th>Description</th>
                      <th>Qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${transaction.sale.map((saleItem: any) => html`
                      <tr>
                        <td>${saleItem.ticket.ticket_id}</td>
                        <td>${saleItem.ticket.ticket_status}</td>
                        <td>${saleItem.ticket.ticket_section}</td>
                        <td>${saleItem.ticket.ticket_row}</td>
                        <td>${saleItem.ticket.ticket_seat}</td>
                        <td>${saleItem.ticket.ticket_description}</td>
                        <td>${saleItem.ticket.ticket_qty}</td>
                        <td>${saleItem.ticket.ticket_price}</td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>
            </div>
          `)}
        </div>

        <nft-form .user=${this.user}></nft-form>
    `;
  }
}
