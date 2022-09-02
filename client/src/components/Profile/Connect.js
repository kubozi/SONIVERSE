import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import Button from "../../UI/Buttons/Button"
// import { getAlgoSignerAccounts, connectAlgoSigner } from '../../utils/blockchain/algorand/algorandWallets';

import './Connect.css'

const Connect = (props) => {

    const [ walletConnected, setWalletConnected ] = useState(false);
    const [ accounts, setAccounts ] = useState([]);
    const [ selectedAccount, setSelectedAccount ] = useState('');

    const connectAlgoSignerAction = useCallback(async () => {

      }, []);

    const accountClickHandler = (value) => {
        setSelectedAccount(value);

        // object to return to App
        // const connectionResult = {
        //     method: 'algosigner',
        //     selectedAccount: value,
        //     accounts: accounts,
        //     walletConnected: walletConnected,
        //     pluginInstalled: algoSignerInstalled}


        props.onWalletConnection(connectionResult);
    }

    const walletConnectHandler = (e) => {
        // alert('Only AlgoSigner is supported at the moment!');
    }

    let pluginNotInstalledContent = (
        <div>
            <p>Please install AlgoSigner plugin</p>
            <a href='https://www.purestake.com/technology/algosigner/' />
        </div>
    );

    return (
        <div>
            {/* {content} */}
        </div>
    );
}

export default Connect;