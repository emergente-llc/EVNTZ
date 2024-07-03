import confetti from "canvas-confetti";

type DataNft = {
  name: string,
  description: string,
  img: File
}

const arrayBufferToImgSrc = (arrayBuffer: ArrayBuffer, imgType = "jpeg") => {
  const byteArray = new Uint8Array(arrayBuffer)
  const picBlob = new Blob([byteArray], { type: `image/${imgType}` })
  const picSrc = URL.createObjectURL(picBlob)
  return picSrc
}

const imgSrcToArrayBuffer = async (img: Blob) => {
  const arrayBuffer = await new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsArrayBuffer(img);
  });

  return new Uint8ClampedArray(arrayBuffer as any);
}

const sendRequestForCreateNft = async (dataNft: DataNft) => {
  const { VITE_CANISTER_ORIGIN } = import.meta.env;


  const arrayBufferImg = await imgSrcToArrayBuffer(dataNft.img);

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


const handleSubmitCreateNft = async (e: Event) => {
  const button = document.querySelector("#btn-create-nft");

  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData.entries()) as DataNft;

  const spinnerHTML = `<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;

  button?.insertAdjacentHTML("afterend", spinnerHTML);
  button?.setAttribute("disabled", "true");
  const responseNft = await sendRequestForCreateNft(data);

  if (responseNft.Ok) {
    button?.removeAttribute("disabled");
    button?.nextSibling?.remove();
    confetti();

    const oldText = button?.textContent as string;

    if (button) button.textContent = `Nft created 🥳🥳`;

    setTimeout(() => {
      if (button) button.textContent = oldText;
    }, 1000);
  }
}

// const getNfts = async () => {
//   const { VITE_CANISTER_ORIGIN } = import.meta.env;
//   const response = await fetch(`${VITE_CANISTER_ORIGIN}/v1/nft/nfts`, {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
//   const data = await response.json();

//   return data;
// };

// const showNfts = async () => {
//   const sectionNfts = document.querySelector("#nfts");

//   const nfts = await getNfts();

//   const getNft = (nft: any) => {
//     const { metadata: [{ key_val_data, data }], id } = nft;

//     const nftAttributes = key_val_data.reduce((v: {
//       [key: string]: any
//     }, data: { key: string, val:{
//       [key: string]: any
//     } }) => {
//       v[data.key]  = Object.values(data.val).at(0)
//       return v;
//     }, {});

//     const src = arrayBufferToImgSrc(data);
//     return `
//   <article class="card" style="width: 18rem;">
    
//     <img src="${src}" class="card-img-top" alt="Imaegn del NFT #${id}">
//     <div class="card-body ms-0">
//       <h5 class="card-title">${nftAttributes.name}</h5>
//       <h6 class="card-subtitle mb-2 text-muted">NFT #${id}</h6>
//       <p class="card-text">${nftAttributes.description}</p>
//     </div>
//   </article>
//   `
//   };

//   sectionNfts?.insertAdjacentHTML("afterbegin", nfts.map(getNft).join("\n"));

// }

const handleDOMContentLoaded = () => {
  const formCreateNft = document.querySelector("#form-create-nft");

  formCreateNft?.addEventListener("submit", handleSubmitCreateNft);
  // showNfts();
}

document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);