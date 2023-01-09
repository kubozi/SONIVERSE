import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';

import './SoundDetails.css';
import Waveform from './Waveform';
import Button from '../../UI/Buttons/Button';
import { getToken, getTokenByID, payRoalyties } from '../../blockchain/tezos/tezosUtils';
import { buy } from '../../blockchain/tezos/tezosUtils';
import { getOwner } from '../../blockchain/tezos/tezosUtils';
import LoadingSpinner from '../../UI/Spinners/LoadingSpinner';
import axios from 'axios';
import { updateOwner } from '../../API/api';
import { getSoundDetails } from '../../API/api'
import useHttp from '../../hooks/use-http';

var urlencode = require('urlencode');

const LOAD_DELAY_BUFFER = 2000;

// The SoundDetails component is used for displaying the main info regarding the audio asset creator, wave audio palyer, the price of the asset and a button for buying the asset.
const SoundDetails = (props) => {

    const navigate = useNavigate();
    const params = useParams();
    const { cid } = params;
    const { id } = params;

    // const [ sound, setSound ] = useState();
    const [ soundURL, setSoundURL ] = useState('');
    const [ owner, setOwner ] = useState('')
    const [ busy, setBusy ] = useState(false);
    const [ busyMsg, setBusyMsg ] = useState('');
    const [ bought, setBought ] = useState(false);

    let { sendRequest, status, data: sound, error } = useHttp(
        getSoundDetails, true
      );

      useEffect(() => {
        sendRequest(id);
    }, [sendRequest, id]);
    

    // for sale offer re mint a sound the has set collectable to false
    // add the original creator and owner to the sound. then if it's bought 
    // pay royalties to the original creator and the owner of the sound
    // and so on
    const buyButtonHandler = async() => {
        setBusy(true);
        setBusyMsg('Buying...');
        console.log('sound.roayltiesPercentage: ' + sound.royalties);
        console.log('sound.creator: ' + sound.creator);
        console.log('sonnd.owner: ' + sound.owner);
        const shouldPayRoyalties = sound.royalties > 0 && sound.creator !== sound.owner;
        console.log('should pay royalties: ' + shouldPayRoyalties);
        var op = await buy(sound.tokenID, sound.price);
        if(!op) console.log('failed to buy sound');
        console.log(op);
        
        const updateOwnerArgs = {
            buyerAddress: props.connectedAddress,
            tokenID: sound.tokenID,
        }
        console.log('update ownership on the db..');
        const updateOwnerResponse = await updateOwner(updateOwnerArgs);
        console.log(updateOwnerResponse);

        console.log('pay royalties to the creator');
        if(shouldPayRoyalties)
        {
            const royalPay = await payRoalyties(
                sound.creator, 
                sound.price, 
                sound.royalties);
            if(!royalPay) console.log('failed to pay royalties');
            console.log('royalties paid to creator');
        }

        setBought(true);
        setBusyMsg("Successfully bought sound");

        setTimeout(() => {
            navigate('/index');
          }, LOAD_DELAY_BUFFER)
    }

    const getFullSoundURL = () => {
        let fullSoundURL = encodeURI(sound.soundURL);
        fullSoundURL = 'https://' + fullSoundURL;
        return fullSoundURL;
    }

    let content = <></>;

    if(busy)
    {
        return(
        <>
            <br/>
            <br/>
            <br/>
            <h3>{busyMsg}</h3>
            {!bought && <LoadingSpinner />}
        </>
        );
    }

    if(sound)
    {
        content =       
            <div className="sound-info">
                <Waveform className="waveform" url={sound.soundIPFSURL} />
                <br/>
                <br/>
                <h3>{sound.name} by <Link to={`/address/${sound.owner}`} style={{ textDecoration: 'none' }}>{sound.owner}</Link></h3>
                
                { sound.creator && <h3>Original creator: {sound.creator}</h3> }
                <br />
                { sound.description && <p>{sound.description}</p> }
                <a href={sound.soundIPFSURL}>IPFS</a>

                <br/>
                <br/>
                <div>Price: {sound.price} microTezos</div>
                <br/>

                { props.connectedAddress &&
                  props.connectedAddress != sound.owner &&
                  <Button onClick={buyButtonHandler}>BUY</Button> 
                }

                { 
                    !sound.listed &&
                    props.connectedAddress &&
                    props.connectedAddress == sound.owner &&
                    <div>
                        <Link to={`/relist/${sound.tokenID}`}>
                            <Button>Relist</Button> 
                        </Link>
                    </div>
                }
            </div>
    }

    return ( content );
}

export default SoundDetails;