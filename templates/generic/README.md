# Generic Contract

This generic contract stores user data in the blockchain.

### Create the code

The code is located at `src/assembly/___CONTRACT_CLASS___.ts`. With this contract you will be able to define get methods, write methods, and define custom proto buffers.

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

### Set data

Now run the following script to write some data:

```sh
yarn setdata
```

For mainnet run:

```sh
yarn setdata mainnet
```
