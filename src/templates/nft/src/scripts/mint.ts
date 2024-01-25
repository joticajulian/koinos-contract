/**
 * Script to mint NFTs.
 * - The owner of the new NFTs will be the contract itself.
 * - The token ID is computed from the number of the NFT
 *
 * Before running this script update:
 * - TOTAL_NFTS
 */
import { Signer, Contract, Provider, Transaction } from "koilib";
import fs from "fs";
import { TransactionJson } from "koilib/lib/interface";
import abi from "../build/___CONTRACT_CLASS___-abi.json";
import koinosConfig from "../koinos.config.js";

const TOTAL_NFTS = 150;
const NFTS_PER_TX = 10;

const [inputNetworkName] = process.argv.slice(2);

async function main() {
  const networkName = inputNetworkName || "harbinger";
  const network = koinosConfig.networks[networkName];
  if (!network) throw new Error(`network ${networkName} not found`);
  const provider = new Provider(network.rpcNodes);
  const manaSharer = Signer.fromWif(network.accounts.manaSharer.privateKey);
  const contractAccount = Signer.fromWif(network.accounts.contract.privateKey);
  manaSharer.provider = provider;
  contractAccount.provider = provider;

  const contract = new Contract({
    signer: contractAccount,
    provider,
    abi,
  });

  let nextNFT = 1;
  const { result: resultTotalSupply } = await contract.functions.total_supply();
  if (resultTotalSupply && resultTotalSupply.value) {
    nextNFT = Number(resultTotalSupply.value) + 1;
  }
  while (nextNFT < TOTAL_NFTS) {
    const tx = new Transaction({
      signer: contractAccount,
      provider,
      options: {
        payer: manaSharer.address,
        beforeSend: async (tx: TransactionJson) => {
          await manaSharer.signTransaction(tx);
        },
        rcLimit: "500000000",
      },
    });

    let i = nextNFT;
    while (i < nextNFT + NFTS_PER_TX && i <= TOTAL_NFTS) {
      const metadata = fs.readFileSync(`metadata/${i}.json`, "utf8");
      const tokenId = `0x${Buffer.from(Number(i).toString()).toString("hex")}`;
      await tx.pushOperation(contract.functions.mint, {
        token_id: tokenId,
        to: contract.getId(),
      });
      await tx.pushOperation(contract.functions.set_metadata, {
        token_id: tokenId,
        metadata: JSON.stringify(metadata),
      });
      i += 1;
    }

    const receipt = await tx.send();
    console.log(`Transaction submitted: from ${nextNFT} to ${i - 1}`);
    console.log(
      `consumption: ${(Number(receipt.rc_used) / 1e8).toFixed(2)} mana`
    );
    const { blockNumber } = await tx.wait("byBlock", 60000);
    console.log(`mined in block ${blockNumber} (${networkName})`);
    nextNFT = i;
  }
}

main()
  .then(() => {})
  .catch((error) => console.error(error));
