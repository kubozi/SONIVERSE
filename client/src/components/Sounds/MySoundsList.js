import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import SoundItem from "./SoundItem";
import Waveform from "./Waveform";
import './SoundsList.css'
import { getTokensByOwner } from '../../blockchain/tezos/tezosUtils';
import LoadingSpinner from '../../UI/Spinners/LoadingSpinner';

const LOAD_DELAY_BUFFER = 500;

const MySoundsList = (props) =>
{
    console.log('TESTING MY SOUNDS LIST');
    const params = useParams();
    const { address } = params;

    const [ sounds, setSounds ] = useState([]);
    const [ loaded, setLoaded ] = useState(false);

    console.log('conected address: ' + props.connectedAddress);

    useEffect(() => {
        async function getMyTokens() {
            console.log('get my tokens');
            const tokens = await getTokensByOwner(address);
            console.log(sounds);
            setSounds(tokens);

            setTimeout(() => {
                setLoaded(true);
              }, LOAD_DELAY_BUFFER)
        }
        getMyTokens();
        console.log(sounds);
    }, []);

    if(!loaded) { return (<>
        <br/>
        <br/>
        <br/>
        <LoadingSpinner />
    </>); }

    return (
        <ul className='sounds-list'>
            {
                sounds &&
                sounds.length &&
                sounds.map((sound) => (
                    <SoundItem
                        key={Math.random().toString()}
                        tokenID={sound.tokenID} 
                        name={sound.name}
                        author={sound.author}
                        holder={sound.holder}
                        metadataURL={sound.metadataURL}
                        soundURL={sound.soundURL}
                        cid={sound.cid}
                    />
                ))
            }
        </ul>
        );
}

export default MySoundsList;