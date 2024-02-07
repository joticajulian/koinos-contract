# NFT contract - KCS-3.alpha

NOTE: This version does not support the authorize function of smart wallets. This part will be implemented after the application of the governance proposal.

Install and build the contract:

```sh
yarn install
yarn build
```

The WASM file will be generated in `src/build/release`.

### Configure the contract

First open the contract `src/assembly/___CONTRACT_CLASS___.ts`. As you can see this contract extends the Nft Class, which already contains all the methods and parameters for an NFT collection.

Now update `_name`, `_symbol`, and `_uri` to the specific values for your collection.

The `_uri` is the API to resolve the metadata of the NFTs. However, the KCS-3-nft standard allows you to store the metadata onchain so you don't have to provide this API.

If you plan to store the metadata onchain then set an empty string for the `_uri`:

```ts
_uri: string = "";
```

If the metadata will be served by an external API then define its URI:

```ts
_uri: string = "https://example.com";
```

You can also customize the contract by adding your code in this file.

### Deploy the contract

Open the `.env` file and define the following values:

- `USE_FREE_MANA`: Set true or false. When "true" it will use free mana provided by Kondor to deploy the contract. If it is false then define the private key of an account with funds in order to use its mana.
- `HARBINGER_MANA_SHARER_PRIVATE_KEY`: Private key of an account with funds in harbinger. You can skip this value if `USE_FREE_MANA` is set to true.
- `MAINNET_MANA_SHARER_PRIVATE_KEY`: Private key of an account with funds in mainnet. You can skip this value if `USE_FREE_MANA` is set to true.
- `HARBINGER_NFT_CONTRACT_PRIVATE_KEY`: Private key of the new contract in harbinger.
- `MAINNET_NFT_CONTRACT_PRIVATE_KEY`: Private key of the new contract in mainnet.

To deploy the contract in harbinger run:

```sh
yarn deploy
```

To deploy the contract in mainnet run:

```sh
yarn deploy mainnet
```

### Mint NFTs

Now open the `.env` file and define the following values:

- `TOTAL_NFTS`: Total NFTs to mint in the collection.
- `WRITE_METADATA`: Set true or false. If it is "true", then the script will submit the metadata to the blockchain. In that case update the metadata files in "scripts/metadata" folder.

To mint the NFTs in harbinger run:

```sh
yarn mint
```

To mint the NFTs in mainnet run:

```sh
yarn mint mainnet
```

### Sell NFTs

Open the `.env` file and define the `PRICE` in KOIN.

To sell the NFTs in https://kollection.app/ run:

```sh
yarn sell mainnet kollection
```

To sell the NFTs in https://dapp.koinosraffles.io/marketplace run:

```sh
yarn sell mainnet koinos-raffles
```
