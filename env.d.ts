/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CANISTER_ORIGIN: string | undefined;
    readonly NFT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
