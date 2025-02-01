/**
 * Script to deploy the contract
 */
import {
  Signer,
  Contract,
  Provider,
  TransactionJson,
  TransactionOptions,
} from "koilib";
import * as dotenv from "dotenv";
import { getBytecode } from "./utils";
import abi from "../src/build/___CONTRACT_ABI_FILE___";
import koinosConfig from "../src/koinos.config.js";

dotenv.config();

if (!["true", "false"].includes(process.env.USE_FREE_MANA))
  throw new Error(`The env var USE_FREE_MANA must be true or false`);
const useFreeMana = process.env.USE_FREE_MANA === "true";

if (!["true", "false"].includes(process.env.MINT_ONLY_BY_COLLECTION_OWNER))
  throw new Error(
    `The env var MINT_ONLY_BY_COLLECTION_OWNER must be true or false`,
  );
const onlyByCollectionOwner =
  process.env.MINT_ONLY_BY_COLLECTION_OWNER === "true";
let addressPay = "";
let price = "";
if (!onlyByCollectionOwner) {
  if (!process.env.ADDRESS_PAY)
    throw new Error(`The env var ADDRESS_PAY is not defined`);
  addressPay = process.env.ADDRESS_PAY;
  if (!process.env.PRICE) throw new Error(`The env var PRICE is not defined`);
  price = process.env.PRICE;
}

const [inputNetworkName] = process.argv.slice(2);

async function main() {
  const networkName = inputNetworkName || "harbinger";
  const network = koinosConfig.networks[networkName];
  if (!network) throw new Error(`network ${networkName} not found`);
  const provider = new Provider(network.rpcNodes);

  if (!network.accounts.contract.privateKeyWif) {
    throw new Error(
      `no private key defined for the contract in ${networkName}`,
    );
  }
  const contractAccount = Signer.fromWif(
    network.accounts.contract.privateKeyWif,
  );
  contractAccount.provider = provider;

  const rcLimit = "10000000000";
  let txOptions: TransactionOptions;
  if (useFreeMana) {
    txOptions = {
      payer: network.accounts.freeManaSharer.id,
      payee: contractAccount.address,
      rcLimit,
    };
  } else {
    if (!network.accounts.manaSharer.privateKeyWif) {
      throw new Error(
        `no private key defined for the manaSharer in ${networkName}`,
      );
    }
    const manaSharer = Signer.fromWif(
      network.accounts.manaSharer.privateKeyWif,
    );
    manaSharer.provider = provider;
    txOptions = {
      payer: manaSharer.address,
      payee: contractAccount.address,
      rcLimit,
      beforeSend: async (tx: TransactionJson) => {
        await manaSharer.signTransaction(tx);
      },
    };
  }

  const contract = new Contract({
    signer: contractAccount,
    provider,
    abi,
    bytecode: getBytecode(),
    options: txOptions,
  });

  const { operation: takeOwnership } =
    await contract.functions.transfer_ownership(
      {
        value: contract.getId(),
      },
      {
        onlyOperation: true,
      },
    );

  const { operation: configureMint } = await contract.functions.configure_mint(
    {
      only_by_collection_owner: onlyByCollectionOwner,
      address_pay: addressPay,
      price,
    },
    {
      onlyOperation: true,
    },
  );

  const { receipt, transaction } = await contract.deploy({
    abi: JSON.stringify(abi),
    nextOperations: [takeOwnership, configureMint],
  });
  console.log("Transaction submitted");
  console.log(
    `consumption: ${(Number(receipt.rc_used) / 1e8).toFixed(2)} mana`,
  );
  const { blockNumber } = await transaction.wait();
  console.log(
    `Contract ${contractAccount.address} uploaded in block number ${blockNumber} (${networkName})`,
  );
}

main()
  .then(() => {})
  .catch((error) => console.error(error));
