# SONIVERSE: A blockchain-powered audio asset exchange

Soniverse is a marketplace for audio sound effects creators where they can monetize their work using the Tezos blockchain network.

## Project structure

The project's source code is separated into two folders: the "client" and "server" folders. The "client" folder contains the front-end React web application, and the "server" folder contains the back-end Node.js application. A diagram of the project's structure can be seen below.

```bash
- project
   |- README.md
   |- client
   |  |
   |  |- src
   |  |  |- components
   |  |  |- API
   |  |  |- utils
   |  |  |- UI
   |  |  |- blockchain
   |  |  |- hooks
   |  |
   |  |- package.json
   |  |- public
   |
   |- server
      |
      |- controllers
      |- models
      |- routes
      |- app.js
      |- package.json
```

## Smart contracts
The smart contracts for our platform are deployed on MAINNET and Ghostnet TESTNET, their addresses are:

### GHOSTNET (currently used for testing)

1. [KT1G7B82VFWxhR8ZGF5QK85NniPRF8hqWrGx](https://better-call.dev/ghostnet/KT1G7B82VFWxhR8ZGF5QK85NniPRF8hqWrGx/operations)
2. [KT1GP3gJR86yh5WV4BdnSBEmYHLC9BcDqkGE](https://better-call.dev/ghostnet/KT1GP3gJR86yh5WV4BdnSBEmYHLC9BcDqkGE/operations)

### MAINNET
1. [KT1QMUoBv2mdn7akSYCrE13MWZ5BtwuVY2wE](https://better-call.dev/mainnet/KT1QMUoBv2mdn7akSYCrE13MWZ5BtwuVY2wE/operations)
2. [KT1HyFN4qhkiyGmNL1jrr2kQHUKepcGrzhmv](https://better-call.dev/mainnet/KT1HyFN4qhkiyGmNL1jrr2kQHUKepcGrzhmv/operations)

You can find the smart contract source code on IPFS: [SmartPy](https://smartpy.io/ide?cid=QmchaTaXmQCGuDtcBjyecqAz5xiGSQEEkFrHPoALzPhac7&k=bd3e1b5d2c1974263a1b)

### Smart Contract analysis:

The code defines a smart contract called "Marketplace" that has several entry points, which are functions that can be called by users to interact with the contract.

The contract's constructor function, `__init__`, initializes several variables including a big_map named data, which stores information about the NFTs, `counter`, `token_id` and `admin`.

The `mint` entry point allows the user to mint a new NFT, by creating a new NFT token on the FA2 token contract and adding it to the big_map `data`.

The `collect_management_rewards` entry point allows the admin of the contract to collect management rewards.

The `collect` entry point allows user to purchase the NFT.

The `sellOffer` entry point allows the owner of the asset to make a new offer and put it back to the marketplace.

The `update_admin` entry point allows the current admin of the contract to update the admin address.

The `fa2_transfer` function is called within other entry points to transfer NFTs between addresses.

## Testing Prerequisites

1. To use our platform, you must have [Temple Wallet](https://templewallet.com/) installed on Google Chrome.
2. To run the code, make sure you have Node (version 19.3.0) installed on your machine. If you are not running the code, please contact the developers for a live web link.
3. Create three accounts on the GHOSTNET network and acquire some XTZ using the [faucet](https://faucet.ghostnet.teztnets.xyz/). One account will be used as the creator account, another as the buyer account, and the third as the second buyer who will also pay royalties to the creator.

## Testing Steps

Please either watch the [demo video](https://drive.google.com/file/d/1clGK2smNglrqErK_EzrYKKZtJ6Lgj6JI/view?usp=share_link) or follow these steps:

1. After launching the website (either through code or a live link), click on the `Connect` button on the top right corner.
2. Once your wallet is connected connect your first account and then `create` and `mint` a new sound.
3. Disconnect your wallet and connect to account #2.
4. Locate the sound you previously uploaded, click on its name, and navigate to the details page. Then, click `Buy` to collect the audio asset.
5. To relist the asset on the marketplace, go to `My Sounds`, find the sound you uploaded, and click `Relist`.
6. Disconnect from account #2 and connect to account #3.
7. Find the relisted sound and click `Buy`. The web app will execute two transactions: sending a royalty payment to the original creator, and transferring the asset from the smart contract to account #3's address.

## Developer instructions

If you need to run the project from code please follow the instructions below:

### Server

1. Make sure you have Node (version 19.3.0) installed on your machine.
2. Use the command `git clone` to download the repository to a local folder.
3. Navigate to the folder `{project}/server`.
4. Create a file named `secret_config.js` in the folder `{project}/server/config` and use the following structure:
(You can either create your own MongoDB database with your own credentials or contact the developers for the database access)
```bash
module.exports =  secret_config = {
    MONGODB_REPO_NAME: '',
    MONGODB_USR: '',
    MONGODB_PASS: '',
}
```
5. Go to the `{project}/server` folder and run npm install in the terminal to install all server dependencies.
6. In the `{project}/server` folder, run npm start in the terminal to start the server.

### Client

1. Go to the `{project}/client` directory and run the command `npm install` in the terminal to install the client dependencies.
2. In the `{project}/client/src` folder, create a file called `config.js` and add the following structure with your own credentials (if you need them, contact the developers to obtain them):
```bash
const config = {
    NAME: '',
    RPC_URL: '',
    NETWORK: '',
    CONTRACT_ADDRESS: "",
    TOKEN_ADDRESS: "",
    IPFS_W3S_TOKEN: ""
    IPFS_NFTS_TOKEN: ""
}
export default config;
```
Use the following scripts:

1. `npm start` to run the Soniverse app in development mode. Access it by navigating to localhost in your browser.
2. `npm build` to create a production-optimized build for performance. Can be used for deploying the app.
3. `npm deploy` to deploy the production build to an Amazon S3 server bucket.
4. `npm update-taquito` to update the taquito web3 library to the latest version.