### Bootstrap the frontend

Now let's bootstrap the frontend to interact with the contract. First run the following command to update the constants and ABI in the frontend:

```bash
yarn updateFrontend
```

to interact with the contract in mainnet run:

```bash
yarn updateFrontend mainnet
```

Now, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Go back to the code and take a special look to the folder `packages/website/src/koinos`. Over there you will find the following files:

- `constants.ts`: Definition of constants like contract id and rpc node. Here is also the configuration for wallet connect.
- `abi.ts`: ABI of your contract.
- `contract.ts`: Creation of the contract class to be able to interact with the blockchain. It contains the code to read data and submit transactions.
- `wallet.ts`: The submission of transactions require a signer. This file provides the code to get the signer from the principal wallets in koinos.
