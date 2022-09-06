import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import SoundItem from "./SoundItem";
import Waveform from "./Waveform";
import './SoundsList.css'
import { getTokensByOwner } from '../../blockchain/tezos/tezosUtils';
import LoadingSpinner from '../../UI/Spinners/LoadingSpinner';
import { getUserTestData } from '../../API/api';
import useHttp from '../../hooks/use-http';
import { getShortLoadDelayBuffer } from '../../Utils/Utils';

const MySoundsList = (props) =>
{
    // fetch user data from db
    const { sendRequest, status, data: loadedUserData } = useHttp(getUserTestData);

    const params = useParams();
    const { address } = params;

    const [ sounds, setSounds ] = useState([]);
    const [ loaded, setLoaded ] = useState(false);

    const LOAD_DELAY_BUFFER = getShortLoadDelayBuffer();


    useEffect(() => {
        async function getMyTokens() {
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
                sounds.reverse().map((sound) => (
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