import { useState } from 'react';
import { Route, Link } from 'react-router-dom';

import Button from '../../UI/Buttons/Button';
import Profile from '../../data/Profile';

import { connectWallet } from '../../blockchain/tezos/tezosUtils'
import { disconnectWallet } from '../../blockchain/tezos/tezosUtils';
import { getShortAddress } from '../../Utils/Utils'
import AuxaIcon from '../../UI/Icons/AuxaIcon';
import SearchBar from '../Search/SearchBar';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import './Navbar.css'
// import '../../assets/fonts/EXTRAORDINARI CRAFT.ttf';

// Navbar is the navbar component of the app. It consists of the following links
// 1. Logo (refresehs the page)
// 2. My sounds (displayes the sounds owned by the connected address)
// 3. Create (displays a form to mint/upload sound)
// 4. Connect button to connect your tezos wallet (Temple Wallet)
const Navbar = (props) => {

    const [ selectedAccount, setSelectedAccount ] = useState('');
    const [ selectedAccountShort, setSelectedAccountShort ] = useState('');
    const [ profile, setProfile ] = useState(null);
    const [ connected, setConnected ] = useState(false);

    const connectClickHandler = async() => {

        setConnected(false);
        var wallet = await connectWallet();
        var activeAccount = await wallet.client.getActiveAccount();
        var userAddress = await wallet.getPKH();

        if(!activeAccount) 
        {
            console.log('NO ACTIVE ACCOUNT');
            return;
        }

        console.log(userAddress);
        
        setConnected(true);

        var profile = new Profile(
            userAddress,
            wallet,
            0,
            connected
        );

        console.log(profile);

        setProfile(profile);
        setSelectedAccount(profile.publicAddress);
        setSelectedAccountShort(getShortAddress(profile.publicAddress));
        console.log(profile.publicAddress);
        props.onWalletConnect(profile.publicAddress);
    };

    const searchResultsHandler = (sounds) => { props.onSearchResults(sounds) };

    const disconnectClickHandler = async () => {
        console.log('DISCONNECTING WALLET');
        await disconnectWallet();
        setProfile(null);
        setSelectedAccount('');
        setConnected(false);
    };

    const submit = async () => {
        confirmAlert({
          title: 'Disconnect Wallet',
          message: 'Are you sure you want to disconnect your wallet?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => disconnectClickHandler()
            },
            {
              label: 'No',
              onClick: () => {}
            }
          ]
        });
      };

    return (
        <div>
            <div className="flex-row">
                <div className="site-title mr-20">
                    <Link to='/index'>
                        <AuxaIcon className='logo'/>

                    </Link>
                </div>
                <SearchBar onSearchResults={searchResultsHandler} />
            </div>
            <nav>
                <ul>
                    { connected && 
                        <li>
                            <Link to='/index'>Sounds</Link>
                        </li>
                    }
                    { connected && 
                        <li>
                            <Link to={`/address/${selectedAccount}`}>My Sounds</Link>
                        </li> 
                    }
                    { connected && 
                        <li>
                            <Link to='/create'>Create</Link>
                        </li>
                    }

                    { connected ? 
                        <li>
                            <Button onClick={submit}>{getShortAddress(selectedAccount)}</Button>
                        </li> 
                        : 
                        <li>
                            <Button onClick={connectClickHandler}>Connect</Button>
                        </li> 
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;