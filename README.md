# Arkinos

CLI tool to bootstrap a koinos contract.

To create a new project run:

```
npx arkinos
```

Select between 3 different templates:

- Token Contract
- NFT Contract
- Generic Contract

Select also if you want to create a frontend to interact with the contract. The frontend is powered by Next.js (React).

Once it is installed read the documentation in the README. You can launch your contract with simple steps:

```
# build the contract
yarn install
yarn build

# generate keys to update the .env file
yarn keys

# deploy in the blockchain
yarn deploy

# bootstrap a frontend
yarn updateFrontend
yarn dev
```
