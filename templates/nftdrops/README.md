# NFT contract adapted for Kollection Drops - KCS-5

This NFT contract extends the KCS-5 standard in order to add Drops,
where the "mint" function can be used to mint multiple tokens and at
the same time it's possible to set a price to mint them.

### Configure the contract

First open the contract `packages/contract/src/assembly/___CONTRACT_CLASS___.ts`. As you can see this contract extends the Nft Class, which already contains all the methods and parameters for an NFT collection.

Now update `_name`, `_symbol`, and `_uri` to the specific values for your collection.

The `_uri` is the API to resolve the metadata of the NFTs. However, the KCS-5 standard allows you to store the metadata onchain so you don't have to provide this API (NOTE: This option is not yet supported by Kollection).

If you plan to store the metadata onchain then set an empty string for the `_uri`:

```ts
_uri: string = "";
```

If the metadata will be served by an external API then define its URI:

```ts
_uri: string = "https://example.com";
```

You can also customize the contract by adding your code in this file.

### Install and build

Install and build the contract:

```sh
yarn install
yarn build
```

The WASM file will be generated in `packages/contract/src/build/release`.

### Deploy the contract

To deploy the contract you need a private key. If you need to generate new keys run:

```sh
yarn keys
```

different keys and the corresponding mnemonic phrase will be displayed in the console. Copy one of them for the following step.

Open the `.env` file and define the following values:

- `MINT_ONLY_BY_COLLECTION_OWNER`: Set "false" if anyone can mint an NFT by paying a fee (Kollection drops). Set "true" if only the collection owner can mint tokens.
- `ADDRESS_PAY`: Address that will receive the payments. Do not define it if MINT_ONLY_BY_COLLECTION_OWNER is true.
- `PRICE`: Price of NFTs in satoshis. That is, for 12.3 KOIN set 1230000000.
- `USE_FREE_MANA`: Set true or false. When "true" it will use free mana provided by Kondor to deploy the contract. If it is false then define the private key of an account with funds in order to use its mana.
- `HARBINGER_MANA_SHARER_PRIVATE_KEY`: Private key of an account with funds in harbinger. You can skip this value if `USE_FREE_MANA` is set to true.
- `MAINNET_MANA_SHARER_PRIVATE_KEY`: Private key of an account with funds in mainnet. You can skip this value if `USE_FREE_MANA` is set to true.
- `HARBINGER_CONTRACT_PRIVATE_KEY`: Private key of the new contract in harbinger.
- `MAINNET_CONTRACT_PRIVATE_KEY`: Private key of the new contract in mainnet.

To deploy the contract in harbinger run:

```sh
yarn deploy
```

To deploy the contract in mainnet run:

```sh
yarn deploy mainnet
```

### Define Metadata

Run this script if you want to store the metadata onchain. First, define the metadata in the folder "scripts/metadata" (open this folder to see an example of the format). Open the `.env` file and define `TOTAL_NFTS` with the total NFTs.

Run the following command to set the metadata in harbinger:

```sh
yarn metadata
```

Run the following command for mainnet:

```sh
yarn metadata mainnet
```
