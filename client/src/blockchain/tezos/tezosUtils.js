import config from '../../config';
import {bytes2Char, char2Bytes} from '@taquito/utils';

const { TezosToolkit, MichelsonMap } = require('@taquito/taquito');
const { BeaconWallet } = require('@taquito/beacon-wallet');
const axios = require('axios');

const Tezos = new TezosToolkit(config.RPC_URL);

const options = {
   name: config.NAME,
   iconUrl: 'https://tezostaquito.io/img/favicon.png',
   preferredNetwork: config.NETWORK,
}

const wallet = new BeaconWallet(options);
Tezos.setWalletProvider(wallet);

export const connectWallet = async() => {
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



// export const connectWallet = async () => {
//    try
//    {
//       Tezos = new TezosToolkit(config.RPC_URL);
//       let wallet = new BeaconWallet({
//           name: "soniverse",
//           preferredNetwork: NetworkType.JAKARTANET
//        });
//        Tezos.setWalletProvider(wallet);

//        console.log('test1');
       
//        const activeAccount = await wallet.client.getActiveAccount();
//        let userAddress;
//        if(activeAccount)
//        {
//           userAddress = activeAccount.address;
//        }
//        else
//        {
//          const permissions = await wallet.client.requestPermissions({network: {type: 'jakartanet'}});
//          userAddress = permissions.address;
//          //  console.error("failed to connect wallet");
//          //  return null;
//        }

//        console.log('test2');
  
//        let balance = await Tezos.tz.getBalance(userAddress);
  
//        let connectionData = 
//        {
//           userAddress: userAddress,
//           balance: balance,
//           wallet: wallet,
//           Tezos: Tezos
//        }
  
//        return connectionData;
//    }
//    catch(e)
//    {
//       console.log(e);
//       return null;
//    }
// }

// export const mintNFT = async (tezosToolkitInstance, amount, metadata) => {
//    try {
//       const contract = await tezosToolkitInstance.wallet.at(config.CONTRACT_ADDRESS);
//       // bytes is the metadata url in binary (expected by smart contract)

//       let urlBytes = char2Bytes(dummyIpfsURL);
//       console.log(urlBytes);
//       const metadataMap = MichelsonMap.fromLiteral({ '': urlBytes });
      
//       console.log("mint params: ");
//       console.log("address: " + config.CONTRACT_ADDRESS);
//       console.log("amount: " + amount);
//       console.log("map " + metadataMap);
//       const op = await contract.methods.mint(config.CONTRACT_ADDRESS, amount, metadataMap, 1).send();
//       await op.confirmation(3);
//    }
//    catch(e) {
//       console.log(e);
//       return false;
//    }

// };
