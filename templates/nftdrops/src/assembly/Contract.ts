// SPDX-License-Identifier: MIT
import { System, authority, StringBytes, Storage } from "@koinos/sdk-as";
import { IToken, Nft, nft, token } from "@koinosbox/contracts";
import { ___PROTO_NAME___ } from "./proto/___PROTO_NAME___";

const CONFIGURE_MINT_SPACE_ID = 9;

export class ___CONTRACT_CLASS___ extends Nft {
  _name: string = "___CONTRACT_NAME___";
  _symbol: string = "___CONTRACT_CLASS___";
  _uri: string = "https://example.com";

  mintConfiguration: Storage.Obj<___PROTO_NAME___.mint_configuration> =
    new Storage.Obj(
      this.contractId,
      CONFIGURE_MINT_SPACE_ID,
      ___PROTO_NAME___.mint_configuration.decode,
      ___PROTO_NAME___.mint_configuration.encode,
    );

  /**
   * Configure mint
   * @external
   */
  configure_mint(args: ___PROTO_NAME___.mint_configuration): void {
    const owner = this.owner().value!;
    const isAuthorized = System.checkAuthority(
      authority.authorization_type.contract_call,
      owner,
    );
    System.require(isAuthorized, "not authorized by the owner");
    this.mintConfiguration.put(args);
    System.event("collections.configure_mint", this.callArgs!.args, [owner]);
  }

  /**
   *
   * @external
   * @entrypoint mint
   */
  mint_drops(args: ___PROTO_NAME___.mint_args): void {
    System.require(
      args.number_tokens_to_mint > 0,
      "number tokens to mint must be greater than 0",
    );

    const conf = this.mintConfiguration.get();
    System.require(conf, "mint not configured");

    if (conf!.only_by_collection_owner) {
      // the mint can only be done by the collection owner
      const isAuthorized = System.checkAuthority(
        authority.authorization_type.contract_call,
        this.owner().value!,
      );
      System.require(isAuthorized, "not authorized by the owner");
    } else {
      // the mint can be done by anyone by paying a fee
      const amountPay = conf!.price * args.number_tokens_to_mint;
      System.require(
        amountPay / args.number_tokens_to_mint == conf!.price,
        "multiplication overflow",
      );

      if (amountPay > 0) {
        const koin = new IToken(System.getContractAddress("koin"));
        koin.transfer(
          new token.transfer_args(args.to, conf!.address_pay, amountPay),
        );
      }
    }

    let initialNumber = this.total_supply().value + 1;
    for (
      let i = initialNumber;
      i < initialNumber + args.number_tokens_to_mint;
      i += 1
    ) {
      this._mint(new nft.mint_args(args.to, StringBytes.stringToBytes(`${i}`)));
    }
  }
}
