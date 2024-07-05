import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { initSatellite, signIn, signOut,  NFIDProvider, authSubscribe, type User, Unsubscribe } from "@junobuild/core";
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
      `${import.meta.env.VITE_CANISTER_ORIGIN}/v1/tickets/all/sorted`
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
        logoUrl: "/EVNTZ/logo/evntz_logo.png"
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
                    <strong>Order ID:</strong> <span class="badge bg-primary">${transaction.orderId}</span>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">
                      <span style="color: #52007D">
                        Event: ${transaction.event.eventName}
                      </span>
                    </h5>
                    <p class="card-text">
                      <strong>Status:</strong> <span class="badge bg-success">${transaction.status}</span><br>
                      <strong>Operation:</strong> ${transaction.operation}<br>
                      <strong>Company ID:</strong> ${transaction.companyId}<br>
                      <strong>User Name:</strong> ${transaction.user.name}<br>
                      <strong>Email:</strong> ${transaction.user.email}<br>
                      <strong>Phone:</strong> ${transaction.user.phone}
                    </p>
                    <h5>Event Details</h5>
                    <p>
                      <strong>Event ID:</strong> ${transaction.event.eventId}<br>
                      <strong>Artist:</strong> ${transaction.event.eventArtist}<br>
                      <strong>Venue:</strong> ${transaction.event.eventVenue}<br>
                      <strong>Country:</strong> ${transaction.event.eventCountry}<br>
                      <strong>GPS:</strong> ${transaction.event.eventVenueGPS}<br>
                      <strong>Date and Time:</strong> ${transaction.event.eventDateTime}<br>
                      <strong>Promoter:</strong> ${transaction.event.eventPromoterCompany}<br><br>                      
                      <strong>Information:</strong><br>
                      <p><u>${transaction.event.eventInformation}</u></p>
                    </p>
                    <h5>Seats</h5>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Section</th>
                          <th>Row</th>
                          <th>Seat</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${transaction.seats.map((seat: any) => html`
                          <tr>
                            <td>${seat.ticket.ticketSection}</td>
                            <td>${seat.ticket.ticketRow}</td>
                            <td>${seat.ticket.ticketSeat}</td>
                            <td>${seat.ticket.ticketPrice}</td>
                            <td>${seat.ticket.ticketTotal}</td>
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
