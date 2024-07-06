/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CANISTER_ORIGIN: string | undefined;
    readonly ACCESS_TOKEN_SECRET: string;
    readonly RS_SEC_HDR_VENDOR_ID: string;
    readonly RS_SEC_HDR_VENDOR_PASSWORD: string;
    readonly NFT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
