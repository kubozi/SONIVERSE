import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import './SoundDetails.css';
import Waveform from './Waveform';
import Button from '../../UI/Buttons/Button';
import { getToken, getTokenByID } from '../../blockchain/tezos/tezosUtils';
import { buy } from '../../blockchain/tezos/tezosUtils';
import { getOwner } from '../../blockchain/tezos/tezosUtils';
import LoadingSpinner from '../../UI/Spinners/LoadingSpinner';

var urlencode = require('urlencode');

const LOAD_DELAY_BUFFER = 2000;

// The SoundDetails component is used for displaying the main info regarding the audio asset creator, wave audio palyer, the price of the asset and a button for buying the asset.
const SoundDetails = (props) => {

    const history = useHistory();
    const params = useParams();
    const { cid } = params;
    const { id } = params;

    const [ sound, setSound ] = useState();
    const [ soundURL, setSoundURL ] = useState('');
    const [ owner, setOwner ] = useState('');
    const [ busy, setBusy ] = useState(false);
    const [ busyMsg, setBusyMsg ] = useState('');
    const [ bought, setBought ] = useState(false);

    useEffect(() => {
        async function getTokenData() {
            // const token = await getToken(cid);
            const token = await getTokenByID(id);
            console.log(token);
            setSound(token);
            let fullSoundURL = encodeURI(token.soundURL);
            fullSoundURL = 'https://' + fullSoundURL;
            setSoundURL(fullSoundURL);
            let owner = getOwner(token.author, token.holder);
            console.log('token owner: ' + owner);
            setOwner(owner);
        }
        getTokenData();
    }, []);

    const buyButtonHandler = async() => {
        setBusy(true);
        setBusyMsg('Buying...');
        var op = await buy(sound.tokenID, sound.amount);
        if(!op) console.log('failed to buy sound');
        console.log(op);
        setBought(true);
        setBusyMsg("Successfully bought sound");

        setTimeout(() => {
            history.push('/mysounds/'+owner);
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
                <Waveform className="waveform" url={soundURL} />
                <br/>
                <br/>
                <h3>{sound.name} by <Link to={`/mysounds/${owner}`} style={{ textDecoration: 'none' }}>{owner}</Link></h3>
                
                { sound.creator && <h3>Original creator: {sound.creator}</h3> }
                <br />
                { sound.description && <p>{sound.description}</p> }
                <a href={getFullSoundURL()}>IPFS</a>

                <br/>
                <br/>
                <div>Price: {sound.amount}</div>
                <br/>
                { props.connectedAddress &&
                  props.connectedAddress != owner &&
                  <Button onClick={buyButtonHandler}>BUY</Button> }
            </div>
    }

    return ( content );
}

export default SoundDetails;