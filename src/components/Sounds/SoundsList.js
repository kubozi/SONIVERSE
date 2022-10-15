import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import SoundItem from "./SoundItem";
import { getAllTokens } from '../../blockchain/tezos/tezosUtils'
import LoadingSpinner from '../../UI/Spinners/LoadingSpinner';

import { getUserTestData } from '../../API/api';
import useHttp from '../../hooks/use-http';
import { getShortLoadDelayBuffer } from '../../Utils/Utils';

// SoundsList component is responsible for displaying the latest sounds minted and submitted for sale. These sounds are displayed as a list of audio waveforms that can be played back and click the name of the sound to expand to sound details.
const SoundsList = (props) =>
{
    // fetch user data from db
    const { sendRequest, status, data: loadedUserData } = useHttp(getUserTestData);
    
    const [ sounds, setSounds ] = useState([]);
    const [ loaded, setLoaded ] = useState(false);

    const LOAD_DELAY_BUFFER = getShortLoadDelayBuffer();

    useEffect(() => {
        async function getTokens() {
            const tokens = await getAllTokens();
            console.log(sounds);
            setSounds(tokens);

            setTimeout(() => {
                setLoaded(true);
              }, LOAD_DELAY_BUFFER)
        }
        getTokens();
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
                sounds.reverse().map((sound) => (
                    sound.collectable &&
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

export default SoundsList;
