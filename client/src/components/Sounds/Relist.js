import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import axios from 'axios';
import { getSoundDetails, updateRelistedSound } from '../../API/api'
import Button from '../../UI/Buttons/Button';
import { sellOffer } from '../../blockchain/tezos/tezosUtils';
import LoadingSpinner from '../../UI/Spinners/LoadingSpinner';
import { NotificationManager } from "react-notifications";
import { convertTezToMutez } from '../../blockchain/tezos/tezosUtils';

import './Relist.css';

const Relist = (props) => {

    const navigate = useNavigate();
    const params = useParams();

    const { tokenID } = params;

    const [ newPrice, setNewPrice ] = useState(0.5);
    const [busy, setBusy] = useState(false);
    const [busyMsg, setBusyMsg] = useState('');
    const [buisnessDone, setBuisnessDone] = useState(false);

    let { sendRequest, status, data: sound, error } = useHttp(
        getSoundDetails, true
      );

      useEffect(() => {
        sendRequest(tokenID);
    }, [sendRequest, tokenID]);
    
    const relistHandler = async (e) => {
        console.log('relisting sound');
        console.log('new price: ', newPrice);
        console.log('tokenID: ', tokenID);
        if(newPrice < 0.1)
        {
            alert('Price must be greater than 0.1 tez');
            return;
        }
        const newPriceMutez = await convertTezToMutez(newPrice);

        setBusy(true);
        setBusyMsg('Relisting sound...');
        try 
        {
            // update smart contract
            console.log('updating smart contract');
            if(!(await sellOffer(tokenID, newPriceMutez))) throw new Error('failed to update smart contract');

            // if successful update the db
            console.log('tokenID: ', tokenID);
            console.log('newPrice: ', newPriceMutez);
            const succ = await updateRelistedSound(tokenID, newPriceMutez);
            if(succ)
            {
                setBusyMsg('Sound relisted!');
                setBuisnessDone(true);
                NotificationManager.success("Successfully relisted sound!");
                setTimeout(() => {
                    setBusy(false);
                    navigate('/');
                }, 2000);
            }
            else
            {
                setBusyMsg('Failed to relist sound!');
                setBuisnessDone(true);
                NotificationManager.error("Failed to relist sound!");
                setTimeout(() => {
                    setBusy(false);
                    navigate('/');
                }
                , 2000);
            }
        }
        catch(err) 
        {
            console.log(err);
            setBusyMsg('Failed to relist sound!');
            NotificationManager.error("Failed to relist sound!");
            setBuisnessDone(true);
            setBusy(false);
            setTimeout(() => {
                navigate('/');
            }
            , 2000); 
        }
    };

    let content = <p>loading...</p>;

    if(busy)
    {
        return(
        <>
            <br/>
            <br/>
            <br/>
            <h3>{busyMsg}</h3>
            {!buisnessDone && <LoadingSpinner />}
        </>
        );
    }

    if(sound && props.connectedAddress)
    {
        content = 

        <div className='relist-form'>
            <form onSubmit={(event) => event.preventDefault()}>
                <h2 className='relist-form-h2'>{sound.name}</h2>
                <h1>{sound.description}</h1>            
            
                <br />                 <br />                 <br /> 
                <p>New Price: (Tez)</p>
                <input type="number" 
                    id="price" 
                    name="price" 
                    defaultValue={newPrice} 
                    onChange={(e) => setNewPrice(e.target.value)}/>
                <br /> 
                <br /> 
                <br /> 
                <br /> 
                <br /> 
                <br /> 
                <p>Relist sound?</p>

                <Button onClick={relistHandler}>Submit</Button>
            </form> 
        </div>
    }

    return(content);
}

export default Relist;