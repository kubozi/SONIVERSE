import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';

import './SoundDetails.css';
import Waveform from './Waveform';
import Button from '../../UI/Buttons/Button';
import { 
    getToken, 
    getTokenByID, 
    payRoalyties, 
    convertMutezToTez,
    buyWithRoyal
} from '../../blockchain/tezos/tezosUtils';
import { buy } from '../../blockchain/tezos/tezosUtils';
import { getOwner } from '../../blockchain/tezos/tezosUtils';
import LoadingSpinner from '../../UI/Spinners/LoadingSpinner';
import axios from 'axios';
import { updateOwner } from '../../API/api';
import { getSoundDetails } from '../../API/api'
import useHttp from '../../hooks/use-http';
import { getShortAddress } from '../../Utils/Utils';
import { tagsCleaner } from '../../Utils/Utils';
import TagList from './TagList';
import Price from '../../UI/Price';
import { generateIPFSURL } from '../../Utils/Utils';
import { getSoundIpfsURL } from '../../blockchain/ipfsService';
import { NotificationManager } from "react-notifications";

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
    const [ duration, setDuration ] = useState('');

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
        let boughtAndPaidRoyalties = false;
        setBusy(true);
        setBusyMsg('Buying...');
        // should not pay royalties if the connector address is the creator 
        const shouldPayRoyalties =
             sound.royalties > 0 && 
             sound.creator !== sound.owner && 
             sound.creator !== props.connectedAddress;

        if(shouldPayRoyalties)
        {
            console.log('pay royalties to the creator');
            const res = await buyWithRoyal(
                sound.tokenID,
                sound.price,
                sound.royalties,
                sound.creator);
            if(!res) {
                console.log('failed to pay royalties');
                return false;
            }
            console.log('asset bought and royalties paid to creator');
            boughtAndPaidRoyalties = true;
        }
        else
        {
            console.log('no royalties to pay');

            if(sound.creator === props.connectedAddress)
            {
                console.log('creator is the buyer');
                return false;
            }
        }

        if(!boughtAndPaidRoyalties)
        {
            console.log('attempting to buy sound');
            var op = await buy(sound.tokenID, sound.price);
            if(!op) { 
                console.log('failed to buy sound');
                NotificationManager.error("Failed to buy sound...");
                return false;
            }
            console.log(op);
        }
        
        const updateOwnerArgs = {
            buyerAddress: props.connectedAddress,
            tokenID: sound.tokenID,
        }
        console.log('update ownership on the db..');
        const updateOwnerResponse = await updateOwner(updateOwnerArgs);
        console.log(updateOwnerResponse);

        setBought(true);
        setBusyMsg("Successfully bought sound");

        NotificationManager.success("Successfully bought sound!");

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
            <br/>
            <h3>{busyMsg}</h3>
            {!bought && <LoadingSpinner />}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </>
        );
    }

    if(sound)
    {
        const desc = sound['description'];
        const royalties = sound['royalties'];
        const name = sound['name'];
        const ipfsURL = generateIPFSURL(sound['ipfsURL']);
        const creator = sound['creator'];
        const shortCreator = getShortAddress(creator);
        const owner = sound['owner'];
        let tags = sound['tags'].toString().split(',');
        tags = tagsCleaner(tags);
        console.log(tags);
        const tokenID = sound['tokenID'];
        const shortOwner = getShortAddress(owner);
        const date = new Date(sound['createdAt']);
        const priceMutez = sound['price'];
        let price = convertMutezToTez(priceMutez);

        const sr = 48000;
        var au = document.createElement('audio');
        au.src = sound.soundIPFSURL;
        au.addEventListener('loadedmetadata', function(){
            var d = au.duration;
            setDuration(d.toFixed(2).toString() + ' s');
            console.log("The duration of the song is of: " + d + " seconds");
        },false);
        const channels = 'MONO'
        const type = 'WAV';

        content =       
            <div className='sound-details-container'>
                <h2>{name}</h2>
                <Waveform url={sound.soundIPFSURL}/>
                <br />
                <TagList tags={tags} searchTagHandler={props.searchTagHandler} />
                <br />
                <br />
                <br />
                <h3>{desc}</h3>
                <br />
                <div className='sound-inner-details'>
                    <div className='sound-inner-details-l'>
                        <p>Minted on {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</p>
                        <p>Created by <Link to={`/address/${creator}`}>{shortCreator}</Link></p>
                        <p>Owned by <Link to={`/address/${owner}`}>{shortOwner}</Link></p>
                        <a id='ipfs' href={ipfsURL}>IPFS</a>
                        <br/>
                        <p>Royalties: {+royalties}%</p>
                        <Price price={price} />
                        <br />
                    </div>
                    <div className='sound-inner-details-m'></div>
                    <div className='sound-inner-details-r'>
                        <p>SampleRate: {sr}</p>
                        <p>Type: {type}</p>
                        <p>Channels: {channels}</p>
                        <p>Duration: {duration}</p>
                    </div>
                </div>
                <br/>
                <br/>

                    { 
                        props.connectedAddress &&
                        props.connectedAddress != sound.owner &&
                        props.connectedAddress != sound.creator &&
                        <Button onClick={buyButtonHandler}>BUY</Button> 
                    }

                    { 
                        sound.listed === false &&
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