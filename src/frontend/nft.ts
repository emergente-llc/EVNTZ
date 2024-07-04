import { html, LitElement } from "lit";
import confetti from "canvas-confetti";
import { customElement, property } from "lit/decorators.js";

type DataNft = {
  name: string,
  description: string,
  img: File
}

@customElement("nft-form")
class NftFormComponent extends LitElement {

  @property()
  loading = false;
  @property()
  textButton = "Create my nft 😄";

  imgSrcToArrayBuffer = async (img: Blob) => {
    const arrayBuffer = await new Promise(resolve => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsArrayBuffer(img);
    });
  
    return new Uint8Array(arrayBuffer as any);
  }

  protected createRenderRoot() {
    return this;
  }

  sendRequestForCreateNft = async (dataNft: DataNft) => {
    const { VITE_CANISTER_ORIGIN } = import.meta.env;


    const arrayBufferImg = await this.imgSrcToArrayBuffer(dataNft.img);

    const nftMetadata = [
      {
        data: Array.from(arrayBufferImg),
        purpose: { Rendered: null },
        key_val_data:
          [
            { key: "name", val: { TextContent: dataNft.name } },
            { key: "description", val: { TextContent: dataNft.description } },
          ]
      }
    ]

    const body = {
      minter: "zrzlu-77t5u-6mmw7-zpbko-j73cv-fh5aq-wgjyr-w7but-3nars-j4lul-nae",
      metadata: nftMetadata,
    }

    const response = await fetch(`${VITE_CANISTER_ORIGIN}/v1/nft/mint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    })

    const data = await response.json();

    return data;
  }

  _createEvent(name: string, detail?: any): void {
    const event = new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail // this will add `this.tags` to the detail property in the CustomEvent
    });

    this.dispatchEvent(event);
  }

  

  handleSubmitCreateNft = async (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as DataNft;

    this.loading = true;

    try {
      const responseNft = await this.sendRequestForCreateNft(data);
      if (responseNft.Ok) {
        confetti();
        this._createEvent("add-nfts-total");
  
        const oldText = this.textButton;
  
        this.textButton = `Nft created 🥳🥳`;
  
        setTimeout(() => {
          this.textButton = oldText;
        }, 1000);
      }
    } catch(err) {
      const oldText = this.textButton;

      this.textButton = "There was a mistake 😢😥";
  
      setTimeout(() => {
        this.textButton = oldText;
      }, 1000);
    }

    this.loading = false;

    
  }

  render = () => html`
  <section data-bs-version="5.1" class="list1 cid-ugXsidhq15" id="list02-1i">	  
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-12 col-md-12 col-lg-10 m-auto">
					<div class="content">
						<div class="row justify-content-center mb-5">
							<div class="col-12 content-head">
								<div class="mbr-section-head">
									<h4 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
										<strong>Create NFT</strong></h4>
								</div>
							</div>
						</div>
						<form @submit=${this.handleSubmitCreateNft}>
							<div class="mb-3">
								<label for="nft-name" class="form-label">NFT's name</label>
								<input required type="text" name="name" class="form-control" id="nft-name" aria-describedby="nftNameHelp">
								<div id="nftNameHelp" class="form-text">Write a funny and unique name.</div>
							</div>
							<div class="mb-3">
								<label for="nft-description" class="form-label">Description</label>
								<input required type="text" name="description" class="form-control" id="nft-description" aria-describedby="nftNameHelp">
								<div id="nftNameHelp" class="form-text">You're creative and make a description for your NFT.</div>
							</div>
							<div class="mb-3">
								<label for="nft" class="form-label">Upload a image of your NFT</label>
								<input required name="img" class="form-control" type="file" id="formFile">
							</div>
							<div class="d-flex align-items-center gap-2">
								<button type="submit" class="btn ms-0 btn-primary">${this.textButton}</button>
                ${this.loading ? html`<div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>` : html``}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>`;
}

export default NftFormComponent;

