# Token contract - KCS-3.alpha

NOTE: This version does not support the authorize function of smart wallets. This part will be implemented after the application of the governance proposal.

### Configure the contract

First open the contract `src/assembly/___CONTRACT_CLASS___.ts`. As you can see this contract extends the Token Class, which already contains all the methods and parameters for a token.

Now update `_name`, `_symbol`, and `_decimals` to the specific values for your token.

You can also customize the contract by adding your code in this file.

### Install and build

Install and build the contract:

```sh
yarn install
yarn build
```

The WASM file will be generated in `src/build/release`.

### Deploy the contract

Open the `.env` file and define the following values:

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

### Mint tokens

Now open the `.env` file and define the following values:

- `TOTAL_SUPPLY`: Total tokens to mint. The contract address will receive these tokens.

To mint tokens in harbinger run:

```sh
yarn mint
```

To mint tokens in mainnet run:

```sh
yarn mint mainnet
```
