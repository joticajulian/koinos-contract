/**
 * Script to deploy the contract
 */
import { Signer, Contract, Provider } from "koilib";
import * as dotenv from "dotenv";
import { TransactionJson, TransactionOptions } from "koilib/lib/interface";
import { getBytecode } from "./utils";
import abi from "../build/___CONTRACT_ABI_FILE___";
import koinosConfig from "../koinos.config.js";

dotenv.config();

if (!["true", "false"].includes(process.env.USE_FREE_MANA))
  throw new Error(`The env var USE_FREE_MANA must be true or false`);
const useFreeMana = process.env.USE_FREE_MANA === "true";

const [inputNetworkName] = process.argv.slice(2);

async function main() {
  const networkName = inputNetworkName || "harbinger";
  const network = koinosConfig.networks[networkName];
  if (!network) throw new Error(`network ${networkName} not found`);
  const provider = new Provider(network.rpcNodes);

  const contractAccount = Signer.fromWif(
    network.accounts.contract.privateKeyWif
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
    const manaSharer = Signer.fromWif(
      network.accounts.manaSharer.privateKeyWif
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
      }
    );

  const { receipt, transaction } = await contract.deploy({
    abi: JSON.stringify(abi),
    nextOperations: [takeOwnership],
  });
  console.log("Transaction submitted");
  console.log(
    `consumption: ${(Number(receipt.rc_used) / 1e8).toFixed(2)} mana`
  );
  const { blockNumber } = await transaction.wait("byBlock", 60000);
  console.log(
    `Contract ${contractAccount.address} uploaded in block number ${blockNumber} (${networkName})`
  );
}

main()
  .then(() => {})
  .catch((error) => console.error(error));
