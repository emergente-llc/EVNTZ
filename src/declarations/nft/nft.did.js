export const idlFactory = ({ IDL }) => {
  const LogoResult = IDL.Record({ 'data' : IDL.Text, 'logo_type' : IDL.Text });
  const Dip721NonFungibleToken = IDL.Record({
    'maxLimit' : IDL.Nat16,
    'logo' : LogoResult,
    'name' : IDL.Text,
    'symbol' : IDL.Text,
  });
  const TokenId = IDL.Nat64;
  const MetadataVal = IDL.Variant({
    'Nat64Content' : IDL.Nat64,
    'Nat32Content' : IDL.Nat32,
    'Nat8Content' : IDL.Nat8,
    'NatContent' : IDL.Nat,
    'Nat16Content' : IDL.Nat16,
    'TextArray' : IDL.Vec(IDL.Text),
    'BlobContent' : IDL.Vec(IDL.Nat8),
    'TextContent' : IDL.Text,
  });
  const MetadataKeyVal = IDL.Record({ 'key' : IDL.Text, 'val' : MetadataVal });
  const MetadataPurpose = IDL.Variant({
    'Preview' : IDL.Null,
    'Rendered' : IDL.Null,
  });
  const MetadataPart = IDL.Record({
    'data' : IDL.Text,
    'key_val_data' : IDL.Vec(MetadataKeyVal),
    'purpose' : MetadataPurpose,
  });
  const MetadataDesc = IDL.Vec(MetadataPart);
  const Nft = IDL.Record({
    'id' : TokenId,
    'owner' : IDL.Principal,
    'metadata' : MetadataDesc,
  });
  const ApiError = IDL.Variant({
    'ZeroAddress' : IDL.Null,
    'InvalidTokenId' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Null,
  });
  const MetadataResult = IDL.Variant({ 'Ok' : MetadataDesc, 'Err' : ApiError });
  const ExtendedMetadataResult = IDL.Variant({
    'Ok' : IDL.Record({ 'token_id' : TokenId, 'metadata_desc' : MetadataDesc }),
    'Err' : ApiError,
  });
  const MintReceiptPart = IDL.Record({ 'id' : IDL.Nat, 'token_id' : TokenId });
  const MintReceipt = IDL.Variant({ 'Ok' : MintReceiptPart, 'Err' : ApiError });
  const OwnerResult = IDL.Variant({ 'Ok' : IDL.Principal, 'Err' : ApiError });
  const TxReceipt = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : ApiError });
  const InterfaceId = IDL.Variant({
    'Burn' : IDL.Null,
    'Mint' : IDL.Null,
    'Approval' : IDL.Null,
    'TransactionHistory' : IDL.Null,
    'TransferNotification' : IDL.Null,
  });
  const Dip721NFT = IDL.Service({
    'balanceOfDip721' : IDL.Func([IDL.Principal], [IDL.Nat64], ['query']),
    'getAllNfts' : IDL.Func([], [IDL.Vec(Nft)], ['query']),
    'getMaxLimitDip721' : IDL.Func([], [IDL.Nat16], ['query']),
    'getMetadataDip721' : IDL.Func([TokenId], [MetadataResult], ['query']),
    'getMetadataForUserDip721' : IDL.Func(
        [IDL.Principal],
        [ExtendedMetadataResult],
        [],
      ),
    'getTokenIdsForUserDip721' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(TokenId)],
        ['query'],
      ),
    'logoDip721' : IDL.Func([], [LogoResult], ['query']),
    'mintDip721' : IDL.Func([IDL.Principal, MetadataDesc], [MintReceipt], []),
    'nameDip721' : IDL.Func([], [IDL.Text], ['query']),
    'ownerOfDip721' : IDL.Func([TokenId], [OwnerResult], ['query']),
    'safeTransferFromDip721' : IDL.Func(
        [IDL.Principal, IDL.Principal, TokenId],
        [TxReceipt],
        [],
      ),
    'supportedInterfacesDip721' : IDL.Func(
        [],
        [IDL.Vec(InterfaceId)],
        ['query'],
      ),
    'symbolDip721' : IDL.Func([], [IDL.Text], ['query']),
    'totalSupplyDip721' : IDL.Func([], [IDL.Nat64], ['query']),
    'transferFromDip721' : IDL.Func(
        [IDL.Principal, IDL.Principal, TokenId],
        [TxReceipt],
        [],
      ),
    'update_value' : IDL.Func(
        [TokenId, IDL.Text, MetadataVal],
        [TxReceipt],
        [],
      ),
  });
  return Dip721NFT;
};
export const init = ({ IDL }) => {
  const LogoResult = IDL.Record({ 'data' : IDL.Text, 'logo_type' : IDL.Text });
  const Dip721NonFungibleToken = IDL.Record({
    'maxLimit' : IDL.Nat16,
    'logo' : LogoResult,
    'name' : IDL.Text,
    'symbol' : IDL.Text,
  });
  return [IDL.Principal, Dip721NonFungibleToken];
};
