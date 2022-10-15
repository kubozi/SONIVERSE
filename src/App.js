import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useState } from 'react';

import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import SoundsList from './components/Sounds/SoundsList';
import NewSound from './components/Sounds/NewSound';
import SoundDetails from './components/Sounds/SoundDetails';
import { FooterContainer } from './components/Footer/Footer'
import MySoundsList from './components/Sounds/MySoundsList';

// The App component is the main component responsible for displaying the SONIVERSE web page. It consists of a dynamic Navbar header, the main body consists of various components that can be switched to by utilizing ReactRouter for loading faster different components depensing on user requests.
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
