import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useState } from 'react';

import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import SoundsList from './components/Sounds/SoundsList';
import Test from './components/Test';
import NewSound from './components/Sounds/NewSound';
import SoundDetails from './components/Sounds/SoundDetails';
import { FooterContainer } from './components/Footer/Footer'
import MySoundsList from './components/Sounds/MySoundsList';

function App() {

  const [ connectedAddress, setConnectedAddress ] = useState('');

  const history = useHistory();
  
  const walletConnectedHandler = (address) => {
    setConnectedAddress(address);
    history.push('/');
  }

  return (
    <div className="App">
      <header>
        <Navbar onWalletConnect={walletConnectedHandler} />
      </header>
      <main>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/index' />
          </Route>
          <Route path='/index' exact>
            <SoundsList />
          </Route>
          
          <Route path='/sounds/:id' exact>
            <SoundDetails connectedAddress={connectedAddress} />
          </Route>
          <Route path='/mysounds/:address' exact>
            <MySoundsList connectedAddress={connectedAddress} />
          </Route>
          <Route path='/create' exact>
            <NewSound connectedAddress={connectedAddress} />
          </Route>
        </Switch>
      </main>
      <FooterContainer />
    </div>
  );
}

export default App;
