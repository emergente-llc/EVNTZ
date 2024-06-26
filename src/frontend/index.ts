import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("azle-app")
export class AzleApp extends LitElement {
  @property()
  sortedTransactions = {};
  nftResponse = "";

  constructor() {
    super();
    this.getAllTransaction();
  }

  async getAllTransaction() {
    this.sortedTransactions = "Loading...";

    const response = await fetch(
      `${import.meta.env.VITE_CANISTER_ORIGIN}/v1/tickets/all/sorted`
    );
    const responseJson = await response.json();

    this.sortedTransactions = responseJson;
  }

  async uploadTheFirstNft() {
    this.nftResponse = "Uploading own first nft...";

    // const response = await fetch(
    //   `${import.meta.env.VITE_CANISTER_ORIGIN}/v1/nft/create`, {
    //     method: "POST",
    //     body: "",
    //   }
    // );
    // const responseJson = await response.json();

    // if(responseJson.ok) this.nftResponse = "Nft created! 😎";
  }

  render() {
    return html`
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />
      <div class="container">
        <div class="row g-3">
          <div class="col-md-8">
            <div class="alert alert-primary" role="alert">
              <h3>EVNTZ - Sales Transaction dashboard</h3>
            </div>

            <button
              type="button"
              class="btn btn-primary"
              @click=${this.getAllTransaction}
            >
              Fetch all transactions
            </button>
            
            <button
              type="button"
              class="btn btn-secondary"
              @click=${this.uploadTheFirstNft}
            >
              Upload new nft
            </button>
            <p>${this.nftResponse}</p>

            &nbsp;
            &nbsp;
            &nbsp;

            <button type="button" class="btn btn-light position-relative">
              Transactions
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                ${Object.keys(this.sortedTransactions).length}
                <span class="visually-hidden">All transactions</span>
              </span>
            </button>


            <br />
            <br />
            
            <pre style="white-space: pre-wrap;">
              ${JSON.stringify(this.sortedTransactions, null, 2)}
            </pre>

            <br />

            <button
              type="button"
              class="btn btn-primary"
              @click=${this.getAllTransaction}
            >
              Fetch all transactions
            </button>

            <br />
            <br />
          </div>
        </div>
      </div>
    `;
  }
}
