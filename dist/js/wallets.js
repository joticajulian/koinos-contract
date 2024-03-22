// import * as kondor from "kondor-js";

export async function connectKondor() {
  console.log("Connecting kondor...");
  const accounts = await kondor.getAccounts();
  if (accounts.length === 0) throw new Error("No accounts selected");
  const signer = kondor.getSigner(accounts[0].address);
  console.log("Kondor connected");
  return signer;
}

// const mkwWalletConnectorUrl =
//     "https://mykw.vercel.app/embed/wallet-connector";
// let mkw;
// mkw = new MyKoinosWallet(mkwWalletConnectorUrl);
// mkw.connect();
