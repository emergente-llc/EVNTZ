import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("azle-app")

export class AzleApp extends LitElement {

  @property()
  sortedTransactions = {};

  constructor() {
    super();
    this.getAllTransaction();
  }

  async getAllTransaction() {
    this.sortedTransactions = "Loading...";

    const response = await fetch(
      `${import.meta.env.VITE_CANISTER_ORIGIN}/transactions/all`
    );
    const responseJson = await response.json();

    this.sortedTransactions = responseJson;
  }

  render() {
    return html`
      <h1>EVNTZ - Sales Transaction dashboard</h1>

      <div style="width: 50%;">
        Transactions: 
        <br>
        <pre style="white-space: pre-wrap;">
          ${JSON.stringify(this.sortedTransactions, null, 2)}
        </pre>
      </div>
      <br />
      <div>
        <button>
          @click=${this.getAllTransaction}>Test /transactions
        </button>        
      </div>
    `;
  }
}
