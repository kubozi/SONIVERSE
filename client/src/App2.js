import { Route, Routes, Redirect, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar/Navbar';
import SoundsList from './components/Sounds/SoundsList';
import NewSound from './components/Sounds/NewSound';
import NewSound2 from './components/Sounds/NewSound2';
import SoundDetails from './components/Sounds/SoundDetails';
// import { FooterContainer } from './components/Footer/Footer'
import MySoundsList from './components/Sounds/MySoundsList';
import Relist from './components/Sounds/Relist';

import './App.css';

// https://cloudflare-ipfs.com/ipfs/bafyreifsbicxqmcu6yiffjmbpo2qooslewctgyy5jyboao4hclcdv2aqse/metadata.json

function App2() {

    const navigate = useNavigate();

    const [ connectedAddress, setConnectedAddress ] = useState('');

    const walletConnectedHandler = (address) => {
        setConnectedAddress(address);
        navigate('/');
    }

    return (
        <div className='App'>

            <header>
                <Navbar onWalletConnect={walletConnectedHandler}/>
            </header>
                <main>
                <Routes>

                    <Route 
                        exact 
                        path='/' 
                        element= {<SoundsList/>}>
                    </Route>

                    <Route 
                        exact 
                        path='/index' 
                        element= {<SoundsList/>}>
                    </Route>
                    
                    <Route 
                        exact 
                        path='/sounds/:id' 
                        element={<SoundDetails connectedAddress={connectedAddress}/>}>
                    </Route>

                    <Route 
                        exact 
                        path='/address/:address' 
                        element={<MySoundsList connectedAddress={connectedAddress} />}/>

                    <Route 
                        exact 
                        path='/create' 
                        element={<NewSound connectedAddress={connectedAddress}/> }/>

                    <Route
                        exact
                        path='/relist/:tokenID'
                        element={<Relist connectedAddress={connectedAddress}/> }/>
{/* 
                    <Route exact path='/create' element={<NewSound2 connectedAddress={connectedAddress}/> }>
                    </Route> */}

                </Routes>
                </main>

            </div>
    );
}

export default App2;