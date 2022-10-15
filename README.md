# SONIVERSE audio asset marketplace

Soniverse is a marketplace for audio sound effects creators where they can monetize their work using the Tezos blockchain network.

The smart contracts for our platform are deployed on the Kathmadunet TESTNET, their addresses are:
1.
2. 

You can find the smart contract source code on IPFS: [SmartPy](https://smartpy.io/ide?cid=QmchaTaXmQCGuDtcBjyecqAz5xiGSQEEkFrHPoALzPhac7&k=bd3e1b5d2c1974263a1b)

## Scripts

In the project directory, you can run:

### `npm start`

Runs the Soniverse app in dev mode. \
Navigate to [localhost](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app in production mode and optimizes the build for performance. \
Can be used to deploy the app.

## Requirements

1. Temple wallet installed in your browser. Get it from [here](https://templewallet.com/)
2. Some amount of XTZ on Kathmadunet is also needed in your wallet account.
3. NodeJS, npm and git installed.

## Testing

To properly test the platform functionality:

1. Run `npm install` to install all project dependencies.
2. Run `npm start` to get the web app running on localhost:3000.
3. Make sure you have [Temple Wallet](https://templewallet.com/) plugin installed on your browser and connect your wallet.
4. On the web app's navbar click on the `connect` button to connect your tezos wallet (on Kathmadunet).

![](images/connect)

5. Once your wallet is connected you can click on the `create` tab on the navbar and use the form to upload a sound to IPFS, and create your NFT token.

![](images/create)
![](images/create_form)

6. Your Sound will be displayed then on the front page and then you can choose another sound from the list to buy it, and transfer the token ownership to your account.

![](images/details)

## Information

Upload sound / mint audio assets: Users can use our web app to create sounds by first connecting to their wallet account and using the create link \
on the navbar [create](http://localhost:3000/create) where they have to fill out the form and choose a sound to upload. \
The code associated with this is in [NewSound.js](https://github.com/kubozi/SONIVERSE/blob/main/src/components/Sounds/NewSound.js) fileSubmitHandler method. 
This method will first upload a sound to IPFS by using [nft.storage](https://nft.storage/). It will then run the mint function on our smart contract

Purchase NFT: A user can browse our web application by clicking on a sound, and use the buy button to purchase the audio asset. By purchasing the \
NFT asset the ownership on the smart contract will change to the buyer's address. The buy/collect functionality on the client side is located in [SoundDetails.js](https://github.com/kubozi/SONIVERSE/blob/main/src/components/Sounds/SoundDetails.js)

React components: The main component responsible for rendering the platform is [App.js](https://github.com/kubozi/SONIVERSE/blob/main/src/App.js). \
App.js consists of a header with the [navbar](https://github.com/kubozi/SONIVERSE/blob/main/src/components/Navbar/Navbar.js), the main body with the sound related components [sound components](https://github.com/kubozi/SONIVERSE/tree/main/src/components) and a placeholder [footer](https://github.com/kubozi/SONIVERSE/tree/main/src/components/Footer)

Smart contract interaction: The code responsible for interacting with the deployed smart contracts on the Tezos network is located at [tezosUtils](https://github.com/kubozi/SONIVERSE/blob/main/src/blockchain/tezos/tezosUtils.js)

