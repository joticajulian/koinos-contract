/**
 * Script to mint tokens
 */
import {
  Signer,
  Contract,
  Provider,
  TransactionJson,
  TransactionOptions,
} from "koilib";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import abi from "../src/build/___CONTRACT_ABI_FILE___";
import koinosConfig from "../src/koinos.config.js";

dotenv.config();

if (!process.env.TOTAL_SUPPLY)
  throw new Error(`The env var TOTAL_SUPPLY is not defined`);
if (!["true", "false"].includes(process.env.USE_FREE_MANA))
  throw new Error(`The env var USE_FREE_MANA must be true or false`);

const useFreeMana = process.env.USE_FREE_MANA === "true";
const totalSupply = process.env.TOTAL_SUPPLY;

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

  const contract = new Contract({
    signer: contractAccount,
    provider,
    abi,
  });

  const rcLimit = "2000000000";
  let txOptions: TransactionOptions;
  if (useFreeMana) {
    txOptions = {
      payer: network.accounts.freeManaSharer.id,
      payee: contract.getId(),
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
      payee: contract.getId(),
      rcLimit,
      beforeSend: async (tx: TransactionJson) => {
        await manaSharer.signTransaction(tx);
      },
    };
  }

  const { transaction, receipt } = await contract.functions.mint(
    {
      to: contract.getId(),
      value: totalSupply,
    },
    txOptions,
  );

  console.log("Transaction submitted");
  console.log(
    `consumption: ${(Number(receipt!.rc_used) / 1e8).toFixed(2)} mana`,
  );
  const { blockNumber } = await transaction!.wait();
  console.log(`mined in block ${blockNumber} (${networkName})`);
}

main()
  .then(() => {})
  .catch((error) => console.error(error));
