import { TezosToolkit, Wallet } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {bytes2Char, char2Bytes} from '@taquito/utils';

import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks
} from "@airgap/beacon-dapp";
import config from "../../config";
import axios from 'axios';

const Tezos = new TezosToolkit(config.RPC_URL);

const options = {
   name: config.NAME,
   iconUrl: 'https://tezostaquito.io/img/favicon.png',
   preferredNetwork: config.NETWORK,
}

const wallet = new BeaconWallet(options);
Tezos.setWalletProvider(wallet);

export const connectWallet = async() => {
    console.log("TEZOS WALLET CONECTIOn");
    await wallet.requestPermissions({
        network: { type: config.NETWORK }
    });
    return wallet;
}

export const disconnectWallet = async() => {
    await wallet.clearActiveAccount();
}

const getMarketplaceContract = async() => {
    const address = config.CONTRACT_ADDRESS;
    const contract = await Tezos.wallet.at(address);
    return contract;
}

export const getTokenContract = async() => {
   const address = config.TOKEN_ADDRESS;
   const contract = await Tezos.wallet.at(address);
   return contract;
}

export const getNewTokenID = async() => {
    const marketplaceRes = await axios.get(
        `https://api.${config.NETWORK}.tzkt.io/v1/contracts/${config.CONTRACT_ADDRESS}/bigmaps/data/keys`);
    const d1 = marketplaceRes.data;
    return d1.length;
}

export const getAllTokens = async() => {
    const marketplaceRes = await axios.get(
        `https://api.${config.NETWORK}.tzkt.io/v1/contracts/${config.CONTRACT_ADDRESS}/bigmaps/data/keys`);
    const tokenRes = await axios.get(
        `https://api.${config.NETWORK}.tzkt.io/v1/contracts/${config.TOKEN_ADDRESS}/bigmaps/token_metadata/keys`);

    const marketplaceData = marketplaceRes.data;
    const tokenData = tokenRes.data;

    let tokens = [];
    console.log("TOKEN DATA: (" + tokenData.length + ")");
    console.log("MARKETPLACE DATA: " + marketplaceData[0].value);
    console.log("TOKEN DATA: " + tokenData[0].value);

    for(let i = 0; i < tokenData.length; i++) {
        try
        {
            let mData = marketplaceData[i].value;
            let url = tokenData[i].value.token_info[''];
            if(!url) continue;
            url = bytes2Char(url);
            console.log(url);

            let metadataURL = url.replace('ipfs://', 'ipfs.io/ipfs/');
            const mrRes = await axios.get('http://' + metadataURL);
            let data = mrRes.data;
            let soundURL = data.image.replace('ipfs://', 'ipfs.io/ipfs/');
            let cid = data.image.replace('ipfs://', '').split('/')[0];

            const token = 
            {
                name: data.name,
                description: data.description,
                creator: data.creator,
                soundURL: soundURL,
                metadataURL: metadataURL,
                collectable: mData.collectable,
                amount: mData.amount,
                tokenID: mData.token_id,
                holder: mData.holder,
                author: mData.author,
                cid: cid
            };
            tokens.push(token);
        }    
        catch(err)
        {
            console.error(err);
            continue;
        }            

    }
    return tokens;
}

export const getToken = async (cid) => {
    let tokens = await getAllTokens();
    const token = tokens.find(t => t.cid === cid) 
    return token;
}

export const getTokenByID = async (id) => {
    let tokens = await getAllTokens();
    const token = tokens.find(t => t.tokenID === id) 
    return token;
}

export const getTokensByOwner = async (owner) => {

    let myTokens = [];
    let tokens = await getAllTokens();
    for(let i = 0; i < tokens.length; i++)
    {
        var token = tokens[i];
        console.log(token);
        var token_owner = getOwner(token.author, token.holder);
        if(token_owner.toUpperCase() === owner.toUpperCase()) myTokens.push(token);
    }
    return myTokens;
}

export const getOwner = (author, holder) => {
    if(holder.toUpperCase() == config.CONTRACT_ADDRESS.toUpperCase())
        return author;
    else return holder;
}

export const mint = async (address, url, token_id, amount) => {
    amount = parseInt(amount);
    const contract = await getMarketplaceContract();
    url = char2Bytes(url);
    const op = await contract.methods.mint(amount, url).send();

    return await op.confirmation(3);
};

export const buy = async (id, amount) => {
    console.log('try collect: ' + id + ' ' + amount); 
    try
    {
        const contract = await getMarketplaceContract();
        const op = await contract.methods
        .collect(id)
        .send({ mutez: true, amount: amount });
        return await op.confirmation();
    }
    catch(err)
    {
        console.error(err);
        return false;
    }
}

export const pay = async (to, amount) => {
    const amountTez = await convertMutezToTez(amount);
    console.log('paying ' + amountTez + ' to ' + to + ');');
    Tezos.wallet
    .transfer({ to: to, amount: amountTez })
    .send()
    .then((op) => {
      console.log(`Hash: ${op.opHash}`);
  
      op.confirmation()
        .then((result) => {
          console.log(result);
          if (result.completed) {
            console.log('Transaction correctly processed!');
          } else {
            console.log('An error has occurred');
          }
        })
        .catch((err) => console.error(err));
    });
}

export const payRoalyties = async (to, fullPrice, royaltiesPercentage) => {

    const royaltiesTopay = parseFloat(fullPrice) * parseFloat(royaltiesPercentage) * 0.01;

    console.log('royalties to pay: ' + royaltiesTopay + ' to: ' + to + ' full price: ' + fullPrice + ' royalties percentage: ' + royaltiesPercentage + ';');

    try
    {
        const result = await pay(to, royaltiesTopay);
        if(!result) return false;
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
}

// used to put audio asset back for sale after being bought (collactable is set to false)
export const sellOffer = async (tokenID, amount) => {
    try {
        console.log('attempting sell offer: ' + tokenID + ' ' + amount);
        const contract = await getMarketplaceContract();
        const op = await contract.methods.sellOffer(
            amount,
            tokenID).send();
        console.log(op);
        return await op.confirmation();
    }
    catch(err) {
        console.log(err);
        return false;
    }
}

const convertMutezToTez = (mutez) => {
    return parseFloat(parseFloat(mutez) / 1000000);
}