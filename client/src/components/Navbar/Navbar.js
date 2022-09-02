import { useState } from 'react';
import { Route, Link } from 'react-router-dom';

import Button from '../../UI/Buttons/Button';
import Profile from '../../data/Profile';

import { connectWallet } from '../../blockchain/tezos/tezosUtils'
import { getShortAddress } from '../../Utils/Utils'

import './Navbar.css'
import '../../assets/fonts/EXTRAORDINARI CRAFT.ttf';

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

        if(!activeAccount) return;
        
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

    return (
        <nav>
            <div className="site-title">
                <Link to='/index' style={{ textDecoration: 'none' }}>
                    <div className="logo">
                        <h1 className="logo-header">S</h1>
                    </div>
                </Link>
            </div>
            <ul>
                <li>
                    { selectedAccount && <Link to={`/mysounds/${selectedAccount}`} style={{ textDecoration: 'none' }}>My Sounds</Link> }
                </li>
                <li>
                    { connected && <Link style={{ textDecoration: 'none' }} to='/create'>Create</Link> }
                </li>
                { connected ? 
                    <li><Button>{selectedAccountShort}</Button></li> : 
                    <li><Button onClick={connectClickHandler}>Connect</Button></li> 
                }
            </ul>
        </nav>  
    )
}

export default Navbar;