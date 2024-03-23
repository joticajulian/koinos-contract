export default {
  methods: {
    init: {
      argument: "cards.config",
      return: "",
      description: "Initialize contract",
      entry_point: 3142846090,
      read_only: false,
      "entry-point": "0xbb54068a",
      "read-only": false,
    },
    get_config: {
      argument: "",
      return: "cards.config",
      description: "Get contract configuration",
      entry_point: 3159346644,
      read_only: true,
      "entry-point": "0xbc4fcdd4",
      "read-only": true,
    },
    get_attributes: {
      argument: "nft.token",
      return: "cards.attributes",
      description: "Get attributes",
      entry_point: 1264017895,
      read_only: true,
      "entry-point": "0x4b5761e7",
      "read-only": true,
    },
    mint_5_cards: {
      argument: "common.address",
      return: "",
      description: "Mint 5 random cards",
      entry_point: 3290240373,
      read_only: false,
      "entry-point": "0xc41d1575",
      "read-only": false,
    },
    mint_special: {
      argument: "common.address",
      return: "",
      description: "Mint a special card",
      entry_point: 1643364022,
      read_only: false,
      "entry-point": "0x61f3beb6",
      "read-only": false,
    },
    approve: {
      argument: "nft.approve_args",
      return: "",
      description:
        "Grant permissions to other account to manage a specific Token owned by the user. The user must approve only the accounts he trust.",
      entry_point: 1960973952,
      read_only: false,
      "entry-point": "0x74e21680",
      "read-only": false,
    },
    transfer: {
      argument: "nft.transfer_args",
      return: "",
      description: "Transfer NFT",
      entry_point: 670398154,
      read_only: false,
      "entry-point": "0x27f576ca",
      "read-only": false,
    },
    name: {
      argument: "",
      return: "common.str",
      description: "Get name of the NFT",
      entry_point: 2191741823,
      read_only: true,
      "entry-point": "0x82a3537f",
      "read-only": true,
    },
    symbol: {
      argument: "",
      return: "common.str",
      description: "Get the symbol of the NFT",
      entry_point: 3077209249,
      read_only: true,
      "entry-point": "0xb76a7ca1",
      "read-only": true,
    },
    uri: {
      argument: "",
      return: "common.str",
      description: "Get URI of the NFT",
      entry_point: 1894111158,
      read_only: true,
      "entry-point": "0x70e5d7b6",
      "read-only": true,
    },
    get_info: {
      argument: "",
      return: "nft.info",
      description: "Get name, symbol and decimals",
      entry_point: 3179243600,
      read_only: true,
      "entry-point": "0xbd7f6850",
      "read-only": true,
    },
    owner: {
      argument: "",
      return: "common.address",
      description: "Get the owner of the collection",
      entry_point: 1276127593,
      read_only: true,
      "entry-point": "0x4c102969",
      "read-only": true,
    },
    total_supply: {
      argument: "",
      return: "common.uint64",
      description: "Get total supply",
      entry_point: 2967091508,
      read_only: true,
      "entry-point": "0xb0da3934",
      "read-only": true,
    },
    royalties: {
      argument: "",
      return: "nft.royalties",
      description: "Get royalties",
      entry_point: 921242832,
      read_only: true,
      "entry-point": "0x36e90cd0",
      "read-only": true,
    },
    balance_of: {
      argument: "nft.balance_of_args",
      return: "common.uint64",
      description: "Get balance of an account",
      entry_point: 1550980247,
      read_only: true,
      "entry-point": "0x5c721497",
      "read-only": true,
    },
    owner_of: {
      argument: "nft.token",
      return: "common.address",
      description: "Get the owner of a token",
      entry_point: 3982608455,
      read_only: true,
      "entry-point": "0xed61c847",
      "read-only": true,
    },
    metadata_of: {
      argument: "nft.token",
      return: "common.str",
      description: "Get the metadata of a token",
      entry_point: 392990591,
      read_only: true,
      "entry-point": "0x176c8f7f",
      "read-only": true,
    },
    get_tokens: {
      argument: "nft.get_tokens_args",
      return: "nft.token_ids",
      description: "Get list of token IDs",
      entry_point: 2103140055,
      read_only: true,
      "entry-point": "0x7d5b5ed7",
      "read-only": true,
    },
    get_tokens_by_owner: {
      argument: "nft.get_tokens_by_owner_args",
      return: "nft.token_ids",
      description: "Get tokens owned by an address",
      entry_point: 4229163893,
      read_only: true,
      "entry-point": "0xfc13eb75",
      "read-only": true,
    },
    get_approved: {
      argument: "nft.token",
      return: "common.address",
      description: "Check if an account is approved to operate a token ID",
      entry_point: 1282609184,
      read_only: true,
      "entry-point": "0x4c731020",
      "read-only": true,
    },
    is_approved_for_all: {
      argument: "nft.is_approved_for_all_args",
      return: "common.boole",
      description:
        "Check if an account is approved to operate all tokens owned by other account",
      entry_point: 3886779621,
      read_only: true,
      "entry-point": "0xe7ab8ce5",
      "read-only": true,
    },
    get_operator_approvals: {
      argument: "nft.get_operators_args",
      return: "nft.get_operators_return",
      description: "Get allowances of an account",
      entry_point: 3676042766,
      read_only: true,
      "entry-point": "0xdb1bf60e",
      "read-only": true,
    },
    transfer_ownership: {
      argument: "common.address",
      return: "",
      description: "Transfer ownership of the collection",
      entry_point: 961275650,
      read_only: false,
      "entry-point": "0x394be702",
      "read-only": false,
    },
    set_royalties: {
      argument: "nft.royalties",
      return: "",
      description: "Set royalties",
      entry_point: 995865963,
      read_only: false,
      "entry-point": "0x3b5bb56b",
      "read-only": false,
    },
    set_metadata: {
      argument: "nft.metadata_args",
      return: "",
      description: "Set metadata",
      entry_point: 1029287705,
      read_only: false,
      "entry-point": "0x3d59af19",
      "read-only": false,
    },
    set_approval_for_all: {
      argument: "nft.set_approval_for_all_args",
      return: "",
      description:
        "Grant permissions to other account to manage all Tokens owned by the user. The user must approve only the accounts he trust.",
      entry_point: 541336086,
      read_only: false,
      "entry-point": "0x20442216",
      "read-only": false,
    },
    mint: {
      argument: "nft.mint_args",
      return: "",
      description: "Mint NFT",
      entry_point: 3698268091,
      read_only: false,
      "entry-point": "0xdc6f17bb",
      "read-only": false,
    },
  },
  types:
    "CrgICgtjYXJkcy5wcm90bxIFY2FyZHMaFGtvaW5vcy9vcHRpb25zLnByb3RvIjsKA3ZyZhIaCgVwcm9vZhgBIAEoDEIEgLUYAlIFcHJvb2YSGAoEaGFzaBgCIAEoDEIEgLUYAlIEaGFzaCLgBAoGY29uZmlnEjAKEXBhY2tzX2NvbnRyYWN0X2lkGAEgASgMQgSAtRgGUg9wYWNrc0NvbnRyYWN0SWQSJAoOdnJmX3B1YmxpY19rZXkYAiABKAxSDHZyZlB1YmxpY0tleRIyChV0aHJlc2hvbGRfZm9pbF9zaWx2ZXIYCiABKA1SE3RocmVzaG9sZEZvaWxTaWx2ZXISLgoTdGhyZXNob2xkX2ZvaWxfZ29sZBgLIAEoDVIRdGhyZXNob2xkRm9pbEdvbGQSNgoXdGhyZXNob2xkX3Jhcml0eV9jb21tb24YFCABKA1SFXRocmVzaG9sZFJhcml0eUNvbW1vbhIyChV0aHJlc2hvbGRfcmFyaXR5X3JhcmUYFSABKA1SE3RocmVzaG9sZFJhcml0eVJhcmUSMgoVdGhyZXNob2xkX3Jhcml0eV9lcGljGBYgASgNUhN0aHJlc2hvbGRSYXJpdHlFcGljEjwKGnRocmVzaG9sZF9yYXJpdHlfbGVnZW5kYXJ5GBcgASgNUhh0aHJlc2hvbGRSYXJpdHlMZWdlbmRhcnkSLgoTY2FyZHNfcmFyaXR5X2NvbW1vbhgyIAEoDVIRY2FyZHNSYXJpdHlDb21tb24SKgoRY2FyZHNfcmFyaXR5X3JhcmUYMyABKA1SD2NhcmRzUmFyaXR5UmFyZRIqChFjYXJkc19yYXJpdHlfZXBpYxg0IAEoDVIPY2FyZHNSYXJpdHlFcGljEjQKFmNhcmRzX3Jhcml0eV9sZWdlbmRhcnkYNSABKA1SFGNhcmRzUmFyaXR5TGVnZW5kYXJ5IrMBCgphdHRyaWJ1dGVzEhgKB2VkaXRpb24YASABKA1SB2VkaXRpb24SJQoGcmFyaXR5GAIgASgOMg0uY2FyZHMucmFyaXR5UgZyYXJpdHkSFwoHY2FyZF9pZBgDIAEoDVIGY2FyZElkEh8KBGZvaWwYBCABKA4yCy5jYXJkcy5mb2lsUgRmb2lsEhQKBW5vbmNlGAUgASgNUgVub25jZRIUCgVidXJudBgGIAEoDVIFYnVybnQiNQoHbnVtYmVycxIWCgZ2YWx1ZXMYASADKARSBnZhbHVlcxISCgRzZWVkGAIgASgMUgRzZWVkKkkKBnJhcml0eRIQCgx1bmRlZl9yYXJpdHkQABIKCgZjb21tb24QARIICgRyYXJlEAISCAoEZXBpYxADEg0KCWxlZ2VuZGFyeRAEKiwKBGZvaWwSDgoKdW5kZWZfZm9pbBAAEgoKBnNpbHZlchABEggKBGdvbGQQAmIGcHJvdG8zCqQMCh1rb2lub3Nib3gtcHJvdG8vbmZ0L25mdC5wcm90bxIDbmZ0GhRrb2lub3Mvb3B0aW9ucy5wcm90byJNCgdyb3lhbHR5EiIKCnBlcmNlbnRhZ2UYASABKARCAjABUgpwZXJjZW50YWdlEh4KB2FkZHJlc3MYAiABKAxCBIC1GAZSB2FkZHJlc3MiLwoJcm95YWx0aWVzEiIKBXZhbHVlGAEgAygLMgwubmZ0LnJveWFsdHlSBXZhbHVlIkwKDW1ldGFkYXRhX2FyZ3MSHwoIdG9rZW5faWQYASABKAxCBIC1GAJSB3Rva2VuSWQSGgoIbWV0YWRhdGEYAiABKAlSCG1ldGFkYXRhImYKBGluZm8SEgoEbmFtZRgBIAEoCVIEbmFtZRIWCgZzeW1ib2wYAiABKAlSBnN5bWJvbBIQCgN1cmkYAyABKAlSA3VyaRIgCgtkZXNjcmlwdGlvbhgEIAEoCVILZGVzY3JpcHRpb24iLQoPYmFsYW5jZV9vZl9hcmdzEhoKBW93bmVyGAEgASgMQgSAtRgGUgVvd25lciIoCgV0b2tlbhIfCgh0b2tlbl9pZBgBIAEoDEIEgLUYAlIHdG9rZW5JZCJYChhpc19hcHByb3ZlZF9mb3JfYWxsX2FyZ3MSGgoFb3duZXIYASABKAxCBIC1GAZSBW93bmVyEiAKCG9wZXJhdG9yGAIgASgMQgSAtRgGUghvcGVyYXRvciJCCgltaW50X2FyZ3MSFAoCdG8YASABKAxCBIC1GAZSAnRvEh8KCHRva2VuX2lkGAIgASgMQgSAtRgCUgd0b2tlbklkIiwKCWJ1cm5fYXJncxIfCgh0b2tlbl9pZBgBIAEoDEIEgLUYAlIHdG9rZW5JZCJ0Cg10cmFuc2Zlcl9hcmdzEhgKBGZyb20YASABKAxCBIC1GAZSBGZyb20SFAoCdG8YAiABKAxCBIC1GAZSAnRvEh8KCHRva2VuX2lkGAMgASgMQgSAtRgCUgd0b2tlbklkEhIKBG1lbW8YBCABKAlSBG1lbW8idgoMYXBwcm92ZV9hcmdzEi8KEGFwcHJvdmVyX2FkZHJlc3MYASABKAxCBIC1GAZSD2FwcHJvdmVyQWRkcmVzcxIUCgJ0bxgCIAEoDEIEgLUYBlICdG8SHwoIdG9rZW5faWQYAyABKAxCBIC1GAJSB3Rva2VuSWQimQEKGXNldF9hcHByb3ZhbF9mb3JfYWxsX2FyZ3MSLwoQYXBwcm92ZXJfYWRkcmVzcxgBIAEoDEIEgLUYBlIPYXBwcm92ZXJBZGRyZXNzEi8KEG9wZXJhdG9yX2FkZHJlc3MYAiABKAxCBIC1GAZSD29wZXJhdG9yQWRkcmVzcxIaCghhcHByb3ZlZBgDIAEoCFIIYXBwcm92ZWQiggEKEmdldF9vcGVyYXRvcnNfYXJncxIaCgVvd25lchgBIAEoDEIEgLUYBlIFb3duZXISGgoFc3RhcnQYAiABKAxCBIC1GAZSBXN0YXJ0EhQKBWxpbWl0GAMgASgFUgVsaW1pdBIeCgpkZXNjZW5kaW5nGAQgASgIUgpkZXNjZW5kaW5nIlYKFGdldF9vcGVyYXRvcnNfcmV0dXJuEhoKBW93bmVyGAEgASgMQgSAtRgGUgVvd25lchIiCglvcGVyYXRvcnMYAiADKAxCBIC1GAZSCW9wZXJhdG9ycyJjCg9nZXRfdG9rZW5zX2FyZ3MSGgoFc3RhcnQYASABKAxCBIC1GAJSBXN0YXJ0EhQKBWxpbWl0GAIgASgFUgVsaW1pdBIeCgpkZXNjZW5kaW5nGAMgASgIUgpkZXNjZW5kaW5nIogBChhnZXRfdG9rZW5zX2J5X293bmVyX2FyZ3MSGgoFb3duZXIYASABKAxCBIC1GAZSBW93bmVyEhoKBXN0YXJ0GAIgASgMQgSAtRgCUgVzdGFydBIUCgVsaW1pdBgDIAEoBVIFbGltaXQSHgoKZGVzY2VuZGluZxgEIAEoCFIKZGVzY2VuZGluZyIuCgl0b2tlbl9pZHMSIQoJdG9rZW5faWRzGAEgAygMQgSAtRgCUgh0b2tlbklkc2IGcHJvdG8zCoQDCidrb2lub3Nib3gtcHJvdG8vbWFuYXNoYXJlci9jb21tb24ucHJvdG8SBmNvbW1vbhoUa29pbm9zL29wdGlvbnMucHJvdG8iGwoDc3RyEhQKBXZhbHVlGAEgASgJUgV2YWx1ZSIeCgZ1aW50MzISFAoFdmFsdWUYASABKA1SBXZhbHVlIiIKBnVpbnQ2NBIYCgV2YWx1ZRgBIAEoBEICMAFSBXZhbHVlIh0KBWJvb2xlEhQKBXZhbHVlGAEgASgIUgV2YWx1ZSIlCgdhZGRyZXNzEhoKBXZhbHVlGAEgASgMQgSAtRgGUgV2YWx1ZSJdCglsaXN0X2FyZ3MSGgoFc3RhcnQYASABKAxCBIC1GAZSBXN0YXJ0EhQKBWxpbWl0GAIgASgFUgVsaW1pdBIeCgpkZXNjZW5kaW5nGAMgASgIUgpkZXNjZW5kaW5nIi0KCWFkZHJlc3NlcxIgCghhY2NvdW50cxgBIAMoDEIEgLUYBlIIYWNjb3VudHNiBnByb3RvMw==",
  koilib_types: {
    nested: {
      cards: {
        nested: {
          vrf: {
            fields: {
              proof: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "HEX",
                },
              },
              hash: {
                type: "bytes",
                id: 2,
                options: {
                  "(koinos.btype)": "HEX",
                },
              },
            },
          },
          rarity: {
            values: {
              undef_rarity: 0,
              common: 1,
              rare: 2,
              epic: 3,
              legendary: 4,
            },
          },
          foil: {
            values: {
              undef_foil: 0,
              silver: 1,
              gold: 2,
            },
          },
          config: {
            fields: {
              packs_contract_id: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
              vrf_public_key: {
                type: "bytes",
                id: 2,
              },
              threshold_foil_silver: {
                type: "uint32",
                id: 10,
              },
              threshold_foil_gold: {
                type: "uint32",
                id: 11,
              },
              threshold_rarity_common: {
                type: "uint32",
                id: 20,
              },
              threshold_rarity_rare: {
                type: "uint32",
                id: 21,
              },
              threshold_rarity_epic: {
                type: "uint32",
                id: 22,
              },
              threshold_rarity_legendary: {
                type: "uint32",
                id: 23,
              },
              cards_rarity_common: {
                type: "uint32",
                id: 50,
              },
              cards_rarity_rare: {
                type: "uint32",
                id: 51,
              },
              cards_rarity_epic: {
                type: "uint32",
                id: 52,
              },
              cards_rarity_legendary: {
                type: "uint32",
                id: 53,
              },
            },
          },
          attributes: {
            fields: {
              edition: {
                type: "uint32",
                id: 1,
              },
              rarity: {
                type: "rarity",
                id: 2,
              },
              card_id: {
                type: "uint32",
                id: 3,
              },
              foil: {
                type: "foil",
                id: 4,
              },
              nonce: {
                type: "uint32",
                id: 5,
              },
              burnt: {
                type: "uint32",
                id: 6,
              },
            },
          },
          numbers: {
            fields: {
              values: {
                rule: "repeated",
                type: "uint64",
                id: 1,
              },
              seed: {
                type: "bytes",
                id: 2,
              },
            },
          },
        },
      },
      koinos: {
        options: {
          go_package: "github.com/koinos/koinos-proto-golang/koinos",
        },
        nested: {
          bytes_type: {
            values: {
              BASE64: 0,
              BASE58: 1,
              HEX: 2,
              BLOCK_ID: 3,
              TRANSACTION_ID: 4,
              CONTRACT_ID: 5,
              ADDRESS: 6,
            },
          },
          _btype: {
            oneof: ["btype"],
          },
          btype: {
            type: "bytes_type",
            id: 50000,
            extend: "google.protobuf.FieldOptions",
            options: {
              proto3_optional: true,
            },
          },
        },
      },
      nft: {
        nested: {
          royalty: {
            fields: {
              percentage: {
                type: "uint64",
                id: 1,
                options: {
                  jstype: "JS_STRING",
                },
              },
              address: {
                type: "bytes",
                id: 2,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
            },
          },
          royalties: {
            fields: {
              value: {
                rule: "repeated",
                type: "royalty",
                id: 1,
              },
            },
          },
          metadata_args: {
            fields: {
              token_id: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "HEX",
                },
              },
              metadata: {
                type: "string",
                id: 2,
              },
            },
          },
          info: {
            fields: {
              name: {
                type: "string",
                id: 1,
              },
              symbol: {
                type: "string",
                id: 2,
              },
              uri: {
                type: "string",
                id: 3,
              },
              description: {
                type: "string",
                id: 4,
              },
            },
          },
          balance_of_args: {
            fields: {
              owner: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
            },
          },
          token: {
            fields: {
              token_id: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "HEX",
                },
              },
            },
          },
          is_approved_for_all_args: {
            fields: {
              owner: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
              operator: {
                type: "bytes",
                id: 2,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
            },
          },
          mint_args: {
            fields: {
              to: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
              token_id: {
                type: "bytes",
                id: 2,
                options: {
                  "(koinos.btype)": "HEX",
                },
              },
            },
          },
          burn_args: {
            fields: {
              token_id: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "HEX",
                },
              },
            },
          },
          transfer_args: {
            fields: {
              from: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
              to: {
                type: "bytes",
                id: 2,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
              token_id: {
                type: "bytes",
                id: 3,
                options: {
                  "(koinos.btype)": "HEX",
                },
              },
              memo: {
                type: "string",
                id: 4,
              },
            },
          },
          approve_args: {
            fields: {
              approver_address: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
              to: {
                type: "bytes",
                id: 2,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
              token_id: {
                type: "bytes",
                id: 3,
                options: {
                  "(koinos.btype)": "HEX",
                },
              },
            },
          },
          set_approval_for_all_args: {
            fields: {
              approver_address: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
              operator_address: {
                type: "bytes",
                id: 2,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
              approved: {
                type: "bool",
                id: 3,
              },
            },
          },
          get_operators_args: {
            fields: {
              owner: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
              start: {
                type: "bytes",
                id: 2,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
              limit: {
                type: "int32",
                id: 3,
              },
              descending: {
                type: "bool",
                id: 4,
              },
            },
          },
          get_operators_return: {
            fields: {
              owner: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
              operators: {
                rule: "repeated",
                type: "bytes",
                id: 2,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
            },
          },
          get_tokens_args: {
            fields: {
              start: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "HEX",
                },
              },
              limit: {
                type: "int32",
                id: 2,
              },
              descending: {
                type: "bool",
                id: 3,
              },
            },
          },
          get_tokens_by_owner_args: {
            fields: {
              owner: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
              start: {
                type: "bytes",
                id: 2,
                options: {
                  "(koinos.btype)": "HEX",
                },
              },
              limit: {
                type: "int32",
                id: 3,
              },
              descending: {
                type: "bool",
                id: 4,
              },
            },
          },
          token_ids: {
            fields: {
              token_ids: {
                rule: "repeated",
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "HEX",
                },
              },
            },
          },
        },
      },
      common: {
        nested: {
          str: {
            fields: {
              value: {
                type: "string",
                id: 1,
              },
            },
          },
          uint32: {
            fields: {
              value: {
                type: "uint32",
                id: 1,
              },
            },
          },
          uint64: {
            fields: {
              value: {
                type: "uint64",
                id: 1,
                options: {
                  jstype: "JS_STRING",
                },
              },
            },
          },
          boole: {
            fields: {
              value: {
                type: "bool",
                id: 1,
              },
            },
          },
          address: {
            fields: {
              value: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
            },
          },
          list_args: {
            fields: {
              start: {
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
              limit: {
                type: "int32",
                id: 2,
              },
              descending: {
                type: "bool",
                id: 3,
              },
            },
          },
          addresses: {
            fields: {
              accounts: {
                rule: "repeated",
                type: "bytes",
                id: 1,
                options: {
                  "(koinos.btype)": "ADDRESS",
                },
              },
            },
          },
        },
      },
    },
  },
  events: {
    "collections.token_approval_event": {
      argument: "nft.approve_args",
    },
    "collections.transfer_event": {
      argument: "nft.transfer_args",
    },
    "collections.owner_event": {
      argument: "common.address",
    },
    "collections.royalties_event": {
      argument: "nft.royalties",
    },
    "collections.set_metadata_event": {
      argument: "nft.metadata_args",
    },
    "collections.operator_approval_event": {
      argument: "nft.set_approval_for_all_args",
    },
    "collections.mint_event": {
      argument: "nft.mint_args",
    },
  },
};
