import { 
    Route, 
    Routes, 
    Redirect, 
    useNavigate, 
    Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from './components/Navbar/Navbar';
import SoundsList from './components/Sounds/SoundsList';
import NewSound from './components/Sounds/NewSound';
import SoundDetails from './components/Sounds/SoundDetails';
import { FooterContainer } from './components/Footer/Footer'
import MySoundsList from './components/Sounds/MySoundsList';
import Relist from './components/Sounds/Relist';
import SearchSoundsList from './components/Sounds/SearchSoundsList';
import { getSoundsByTag } from './API/api';
import Banner from './components/Banner/Banner';
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

import './App.css';

// Add this line where you want to show the notification
// NotificationManager.info('Hey I am Adyasha', 'Info!', 2000);

function App() {

    const navigate = useNavigate();
    // useEffect(() => {
    //     navigate('/');
    // }, [navigate]);

    const [ connectedAddress, setConnectedAddress ] = useState('');
    const [searchSounds, setSearchSounds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const walletConnectedHandler = (address) => {
        setConnectedAddress(address);
        navigate('/');
    }

    const searchResultsHandler = async (searchData) =>
    {
      const searchTerm = searchData.searchTerm;
      const sounds = searchData.sounds;
      console.log('search result handler');
      console.log(sounds)
      console.log(searchTerm);
      setSearchSounds(sounds);
      setSearchTerm(searchTerm);
      navigate('/results');
    }

    const searchTagHandler = async (tag) => {
        console.log('search tag handler ' + tag);
      const sounds = await getSoundsByTag(tag);
      setSearchSounds(sounds);
      setSearchTerm(tag);
      navigate('/results');
    }

    return (
        <div className='App'>

            <header>
                <Navbar 
                    onSearchResults={searchResultsHandler} 
                    onWalletConnect={walletConnectedHandler}/>
            </header>
                <main>
                    <Routes>

                        <Route 
                            exact
                            path='/index.html'
                            element={<Navigate to='/' />}/>

                        <Route 
                            exact 
                            path='/' 
                            element= {
                                <>
                                    <Banner />
                                    <SoundsList searchTagHandler={searchTagHandler}/>
                                </>
                            }/>

                        <Route 
                            exact 
                            path='/index' 
                            element= {
                                <>
                                    <Banner />
                                    <SoundsList 
                                        searchTagHandler={searchTagHandler}/>
                                </>
                            }/>
                        
                        <Route 
                            exact 
                            path='/sounds/:id' 
                            element={<SoundDetails 
                                connectedAddress={connectedAddress}
                                searchTagHandler={searchTagHandler}/>}/>

                        <Route 
                            exact 
                            path='/address/:address' 
                            element={<MySoundsList 
                                searchTagHandler={searchTagHandler}
                                connectedAddress={connectedAddress} />}/>

                        <Route 
                            exact 
                            path='/create' 
                            element={<NewSound connectedAddress={connectedAddress}/> }/>

                        <Route
                            exact
                            path='/relist/:tokenID'
                            element={<Relist connectedAddress={connectedAddress}/> }/>

                        <Route 
                            exact
                            path='/results'
                            element={<SearchSoundsList
                                        searchTagHandler={searchTagHandler}
                                        searchTerm={searchTerm}
                                        sounds={searchSounds}/>}/>
                    </Routes>
                </main>
                <NotificationContainer />
                <FooterContainer />
            </div>
    );
}

export default App;