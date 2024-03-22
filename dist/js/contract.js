// import { Contract } from "koilib";

/**
 * Call read function of the contract
 */
export async function contractRead(functionName, args) {
  const contract = new Contract({
    id: "16tKwjvXDKn7CTVo2QbheHHGeVB5xk6QLE",
    provider: new Provider(["https://harbinger-api.koinos.io"]),
  });

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
export async function contractWrite(functionName, args, signer) {
  const contract = new Contract({
    id: "16tKwjvXDKn7CTVo2QbheHHGeVB5xk6QLE",
    provider: new Provider(["https://harbinger-api.koinos.io"]),
    signer,
  });

  await contract.fetchAbi();

  console.log(`Calling write function '${functionName}'`);
  console.log("Arguments:");
  console.log(args);

  // execute the write function in the blockchain
  const { transaction, receipt } = await contract.functions[functionName](
    args,
    {
      //payer: "1KyZyhNwiDo6a93f3FvK8pxspKdgEtQDwa",
      payee: signer.address,
      rcLimit: "1000000000",
    },
  );

  console.log("Receipt");
  console.log(receipt);
  const { blockNumber } = await transaction.wait();
  console.log(`mined in block ${blockNumber}`);
  return { transaction, receipt, blockNumber };
}
