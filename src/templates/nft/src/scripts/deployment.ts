import { Signer, Contract, Provider } from "koilib";
import { TransactionJson } from "koilib/lib/interface";
import { getBytecode } from "./utils";
import abi from "../build/___CONTRACT_CLASS___-abi.json";
import koinosConfig from "../koinos.config.js";

const [inputNetworkName] = process.argv.slice(2);

async function main() {
  const networkName = inputNetworkName || "harbinger";
  const network = koinosConfig.networks[networkName];
  if (!network) throw new Error(`network ${networkName} not found`);
  const provider = new Provider(network.rpcNodes);
  const manaSharer = Signer.fromWif(network.accounts.manaSharer.privateKeyWif);
  const contractAccount = Signer.fromWif(
    network.accounts.contract.privateKeyWif
  );
  manaSharer.provider = provider;
  contractAccount.provider = provider;

  const contract = new Contract({
    signer: contractAccount,
    provider,
    abi,
    bytecode: getBytecode(),
    options: {
      payer: manaSharer.address,
      beforeSend: async (tx: TransactionJson) => {
        await manaSharer.signTransaction(tx);
      },
    },
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
    rcLimit: "10000000000",
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
