# Changelog

All notable changes to this project will be documented in this file. 🤘

## [v1.3.0](https://github.com/joticajulian/koinos-contract/releases/tag/v1.3.0) (2025-02-01)

### 🚀 Features

- Bump libraries: koilib, koinos-precompiler-as, @koinosbox/contracts, walletconnect.
- The temporal use of the @koinosbox/sdk-as@1.1.0-alpha.4 has been replaced by the official library @koinos/sdk-as since it already includes the security updates for check authority (renamed as System.checkAccountAuthority).
- koinosbox/contracts includes new contracts (SmartWalletAllowance, TextParserLib, Manuscript, EthAddress) and includes useful functions in System2 like checkMessageSignedByEthAddress and hexString.

## [v1.2.0](https://github.com/joticajulian/koinos-contract/releases/tag/v1.2.0) (2024-07-04)

### 🚀 Features

- Template for NFT contract adapted for Kollection drops
- Add contractId parameter in updateFrontend script to bootstrap any contract

## [v1.1.1](https://github.com/joticajulian/koinos-contract/releases/tag/v1.1.1) (2024-06-06)

### 🐛 Bug Fixes

- Fix issue when copying the files of the website

## [v1.1.0](https://github.com/joticajulian/koinos-contract/releases/tag/v1.1.0) (2024-04-19)

### 🚀 Features

- Using koilib v6
- Error messages improved when .env vars are not present

### 🐛 Bug Fixes

- Fix scripts in package.json in the root

## [v1.0.0-alpha.12](https://github.com/joticajulian/koinos-contract/releases/tag/v1.0.0-alpha.12) (2024-04-10)

### 🚀 Features

- Option to bootstrap a frontend in NextJS
- Use of workspaces for frontend and contract

### 🐛 Bug Fixes

- Fix selection of template

## [v1.0.0-alpha.11](https://github.com/joticajulian/koinos-contract/releases/tag/v1.0.0-alpha.11) (2024-03-05)

### 🐛 Bug Fixes

- Fix selection of template

## [v1.0.0-alpha.10](https://github.com/joticajulian/koinos-contract/releases/tag/v1.0.0-alpha.10) (2024-02-26)

### 🐛 Bug Fixes

- Fix ABI computation when protofiles has empty strings
- Fix proto file name

## [v1.0.0-alpha.9](https://github.com/joticajulian/koinos-contract/releases/tag/v1.0.0-alpha.9) (2024-02-26)

### 🚀 Features

- Template for generic contract

## [v1.0.0-alpha.8](https://github.com/joticajulian/koinos-contract/releases/tag/v1.0.0-alpha.8) (2024-02-24)

### 🚀 Features

- All contracts using new SDK that supports the get_contract_metadata system call
- Support Token Contract

## [v1.0.0-alpha.7](https://github.com/joticajulian/koinos-contract/releases/tag/v1.0.0-alpha.7) (2024-02-07)

### 🚀 Features

- Support NFT Contract
