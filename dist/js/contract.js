// import { Contract } from "koilib";

const contract = new Contract({
  id: "16tKwjvXDKn7CTVo2QbheHHGeVB5xk6QLE",
  provider: new Provider(["https://harbinger-api.koinos.io"]),
  // TODO: abi
  // signer: undefined
});

/**
 * Call read function of the contract
 */
export async function contractRead(functionName, args) {
  await contract.fetchAbi();

  console.log(`Calling read function '${functionName}'`);
  console.log("Arguments:");
  console.log(args);

  // execute the read function in the blockchain
  const { result } = await contract.functions[functionName](args);
  return result;
}

/**
 * Call write function of the contract
 */
export async function contractWrite(functionName, args, signer, options) {
  await contract.fetchAbi();
  console.log(`Calling write function '${functionName}'`);
  console.log("Arguments:");
  console.log(args);

  // execute the write function in the blockchain
  contract.signer = signer;
  const { transaction, receipt, operation } = await contract.functions[
    functionName
  ](args, {
    // Default options

    // payer: "1KyZyhNwiDo6a93f3FvK8pxspKdgEtQDwa",
    payee: signer.address,
    rcLimit: "1000000000", // 10 mana
    // onlyOperation: false,
    // previousOperations: [],
    // nextOperations: [],
    // signTransaction: true,
    // sendTransaction: false,

    // Other options
    ...options,
  });

  if (options && options.onlyOperation) return { operation };

  console.log("Receipt");
  console.log(receipt);
  console.log("Waiting to be mined...");
  const { blockNumber } = await transaction.wait();
  console.log(`mined in block ${blockNumber}`);
  return { transaction, receipt, blockNumber };
}
