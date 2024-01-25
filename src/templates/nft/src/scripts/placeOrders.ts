/**
 * Script to list the NFTs in a market place.
 * This script assumes that the owner of the NFTs is the
 * contract itself.
 *
 * Befor running this script update:
 * - TOTAL_NFTS
 * - PRICE
 */
import { Signer, Contract, Provider, Transaction, utils } from "koilib";
import * as dotenv from "dotenv";
import { TransactionJson, TransactionOptions } from "koilib/lib/interface";
import abi from "../build/___CONTRACT_CLASS___-abi.json";
import abiMarketPlace from "./abi-market.json";
import koinosConfig from "../koinos.config.js";

dotenv.config();

const TOTAL_NFTS = 150;
const PRICE = "50.0"; // KOIN
const NFTS_PER_TX = 10;
const KOIN_CONTRACT_ID = "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL";

const marketPlaces = [
  {
    name: "kollection",
    id: "16tsFkc5RyuwQmXxVABzHHwS513Nu2B9S3",
  },
  {
    name: "koinos-raffles",
    id: "1AyXgogBeFG9XSJjpSBFujNcfXbo8cbrKE",
  },
];

const [inputNetworkName, inputMarketPlace] = process.argv.slice(2);

async function main() {
  const networkName = inputNetworkName || "harbinger";
  const network = koinosConfig.networks[networkName];
  if (!network) throw new Error(`network ${networkName} not found`);
  if (networkName !== "mainnet")
    throw new Error(`this script is not prepared for ${networkName}`);
  const marketPlace = marketPlaces.find((m) => m.name === inputMarketPlace);
  if (!marketPlace)
    throw new Error(
      `invalid marketplace. It should be ${marketPlaces
        .map((m) => m.name)
        .join(" or ")}. Received '${inputMarketPlace}'`
    );
  const provider = new Provider(network.rpcNodes);

  const contractAccount = Signer.fromWif(
    network.accounts.contract.privateKeyWif
  );
  contractAccount.provider = provider;

  const contract = new Contract({
    signer: contractAccount,
    provider,
    abi,
  });

  const marketContract = new Contract({
    id: marketPlace.id,
    provider,
    abi: abiMarketPlace,
  });

  const rcLimit = "2000000000";
  let txOptions: TransactionOptions;
  if (process.env.USE_FREE_MANA === "true") {
    txOptions = {
      payer: network.accounts.freeManaSharer.id,
      rcLimit,
    };
  } else {
    const manaSharer = Signer.fromWif(
      network.accounts.manaSharer.privateKeyWif
    );
    manaSharer.provider = provider;
    txOptions = {
      payer: manaSharer.address,
      rcLimit,
      beforeSend: async (tx: TransactionJson) => {
        await manaSharer.signTransaction(tx);
      },
    };
  }

  let nextNFT = 1;
  while (nextNFT < TOTAL_NFTS) {
    const tx = new Transaction({
      signer: contractAccount,
      provider,
      options: txOptions,
    });

    let i = nextNFT;
    while (i < nextNFT + NFTS_PER_TX && i <= TOTAL_NFTS) {
      const tokenId = `0x${Buffer.from(Number(i).toString()).toString("hex")}`;

      const { result } = await contract.functions.owner_of({
        token_id: tokenId,
      });

      if (result && result.value !== contract.getId()) {
        console.log(`skipping ${i}. Owner: ${result.value}`);
        continue;
      }

      const { result: resultOrder } = await marketContract.functions.get_order({
        collection: contract.getId(),
        token_id: tokenId,
      });

      if (resultOrder) continue;

      await tx.pushOperation(contract.functions.approve, {
        token_id: tokenId,
        approver_address: contract.getId(),
        to: marketContract.getId(),
      });

      await tx.pushOperation(marketContract.functions.create_order, {
        collection: contract.getId(),
        token_sell: KOIN_CONTRACT_ID,
        token_id: tokenId,
        token_price: utils.parseUnits(PRICE, 8),
        time_expire: "0",
      });
    }

    if (tx.transaction.operations.length > 0) {
      const receipt = await tx.send();
      console.log(`Transaction submitted: from ${nextNFT} to ${i - 1}`);
      console.log(
        `consumption: ${(Number(receipt.rc_used) / 1e8).toFixed(2)} mana`
      );
      const { blockNumber } = await tx.wait("byBlock", 60000);
      console.log(`mined in block ${blockNumber} (${networkName})`);
    }
    nextNFT = i;
  }
}

main()
  .then(() => {})
  .catch((error) => console.error(error));
