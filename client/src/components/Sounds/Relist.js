import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import axios from 'axios';
import { getSoundDetails, updateRelistedSound } from '../../API/api'
import Button from '../../UI/Buttons/Button';
import { sellOffer } from '../../blockchain/tezos/tezosUtils';

const Relist = (props) => {

    const navigate = useNavigate();
    const params = useParams();

    const { tokenID } = params;

    const [ newPrice, setNewPrice ] = useState(0);
    const [ busy, setBusy ] = useState(false);

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

        try 
        {
            // update smart contract
            console.log('updating smart contract');
            if(!(await sellOffer(tokenID, newPrice))) throw new Error('failed to update smart contract');

            // if successful update the db
            console.log('tokenID: ', tokenID);
            console.log('newPrice: ', newPrice);
            await updateRelistedSound(tokenID, newPrice);
            
        }
        catch(err) 
        {
            console.log(err);
        }
    };

    let content = <p>loading...</p>;

    if(sound && props.connectedAddress)
    {
        content = 

        <div className='relist-form'>
            <form onSubmit={(event) => event.preventDefault()}>
                <label htmlFor='name'>{sound.name}</label>
                <input type="number" 
                    id="price" 
                    name="price" 
                    defaultValue={newPrice} 
                    onChange={(e) => setNewPrice(e.target.value)}/>
                <br /> 
                <Button onClick={relistHandler}>Submit</Button>
            </form> 
        </div>
    }

    return(content);
}

export default Relist;