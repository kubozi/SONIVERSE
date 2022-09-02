import React, { useEffect, useState } from "react";
import { useParams, Route, Link } from 'react-router-dom';

// import SoundItem from './Sounds/SoundItem';
import Button from '../UI/Buttons/Button';
// import TezosUtils from '../blockchain/tezos/tezos-web3-utils';
// // import { connectWallet } from '../blockchain/tezos/tezos-web3-utils';
// import { TezosToolkit } from '@taquito/taquito';
// import { BeaconWallet } from "@taquito/beacon-wallet";
// import { NetworkType } from "@airgap/beacon-sdk";
// import { connectWallet } from '../blockchain/tezos/tezosUtils';

import LoadingSpinner from '../UI/Spinners/LoadingSpinner'


// import { connectWallet } from "../blockchain/tezos/tezosUtils";
// import { mintNFT } from "../blockchain/tezos/tezosUtils";


const dummyIpfsURL = "https://ipfs.io/ipfs/QmW8jPMdBmFvsSEoLWPPhaozN6jGQFxxkwuMLtVFqEy6Fb";


const Test = (props) =>
{

    // const [Tezos, setTezos] = useState(new TezosToolkit(new TezosToolkit("https://jakartanet.smartpy.io/")));
    // const wallet_instance = new BeaconWallet(
    // {
    //     name: "NFT Marketplace",
    //     preferredNetwork: NetworkType.JAKARTANET
    // });

    // const rpcURL = "https://jakartanet.smartpy.io/";

    const handleButtonClick = async () => {

    //     let connectionData = await connectWallet();

    //     console.log(connectionData.userAddress);
    //     console.log(connectionData.balance.toString());
    //     console.log(await connectionData.wallet.client.getActiveAccount());


    //     await mint(connectionData.Tezos);
    };

    // const mint = async (tezosToolkitInstance) => {

    //     await mintNFT(tezosToolkitInstance, 1, dummyMetadataJSON);


    // }



    return(
        <div>
            <LoadingSpinner />
        </div>);
}

export default Test;