<div align="center" style="display:flex;flex-direction:column;">
  <a href="https://www.evntz.io/">
    <img src="logo/evntz_logo.png" width="100%" alt="EVNTZ" role="presentation"/>
  </a>

  <br />
  <br />
</div>

# EVNTZ

#### 🚀 Introduction

EVNTZ is an agnostic digital platform designed to seamlessly integrate with existing web2 ticketing systems, leveraging the power of tokenization and sophisticated security mechanisms in the Internet Computer Protocol, transforming the way event tickets are issued.

EVNTZ, built on the Internet Computer Protocol Blockchain, aims to revolutionize the event ticketing industry by eliminating fraud and scalping through the use of digitization and smart contract canisters. It offers customizable features like royalty divisions and price limitations, enabling artists and organizers to control revenue from potential resales and mitigate the effects of ticket scalping. NFT tickets can be programmed with price limitations or designated as non-transferable, ensuring fairness and security. The platform integrates with web2 ticketing systems, providing control, traceability, transparency, and integrity to artists and customers. EVNTZ's responsive web application allows users to access the platform from any device. The open-source code ensures transparency and auditability. Users can transfer tickets securely, preventing fraudulent activities. Business rules and algorithms incorporate historical data to detect illicit actions and enhance security. EVNTZ fosters stronger connections between artists, fans, event organizers, and brands, creating immersive and engaging experiences.

#### 💁‍♂️️ Links & Resources
Here are some useful links:
-   [EVNTZ](https://v4wsq-jyaaa-aaaal-ajmta-cai.icp0.io/)

#### FOR DEMO PURPOSES ONLY
```bash
git clone https://github.com/emergente-llc/EVNTZ.git

cd EVNTZ

# with npm
npm install

# with dfx
dfx start --clean --background --host 127.0.0.1:8000

# with dfx
dfx deploy nft --argument "(  
  principal\"$(dfx identity get-principal)\",  
  record {  
    logo = record {  
      logo_type = \"NFT_logo/png\";  
      data = \"\";  
    };  
    name = \"Dev Journey NFT\";  
    symbol = \"DJNFT\";  
    maxLimit = 50;  
  }  
)"

dfx generate

ACCESS_TOKEN_SECRET="YOUR-ACCESS-TOKEN-SECRET" RS_SEC_HDR_VENDOR_ID="YOUR-VENDOR-ID" RS_SEC_HDR_VENDOR_PASSWORD="YOUR-VENDOR-PASSWORD" NFT_ID="$(dfx canister id nft)" dfx deploy backend

# In browser
http://<backend_canister_name>.localhost:8000
```

#### 🧑‍🤝‍🧑 Community
Have questions, comments, or feedback?

- [LinkedIn](https://www.linkedin.com/company/evntzpr)
- [Instagram](https://www.instagram.com/evntz_official/)
- [X](@evntz_official)

#### 💬 Contact
Email us at hello@evntz.io

#### 🖥️ Technology Stack
EVNTZ was develop using:

- [Azle](https://github.com/demergent-labs/azle)
Azle helps you to build secure decentralized/replicated servers in TypeScript or JavaScript on [ICP](https://internetcomputer.org/). The current replication factor is [13-40 times](https://dashboard.internetcomputer.org/subnets).

For more documentation please see [The Azle Book](https://demergent-labs.github.io/azle/).

- [Juno](https://juno.build/)
Build Web3 at Lightning Speed. Juno is a blockchainless platform designed for developers aiming to craft groundbreaking applications on the Web3 space.

- [NFID](https://nfid.one/)
Your crypto wallet & gateway to ICP apps. Start exploring ICP applications in seconds. Trusted by hundreds of thousands of users worldwide.

- [Motoko](https://internetcomputer.org/docs/current/motoko/main/getting-started/motoko-introduction)
Motoko is a modern, general-purpose programming language you can use specifically to author ICP canister smart contracts. Although aimed primarily at ICP canister development, its design is general enough to support future compilation to other targets. Motoko is designed to be approachable for programmers who have some basic familiarity with object-oriented and/or functional programming idioms in either JavaScript, or another modern programming language, such as Rust, Swift, TypeScript, C#, or Java.
