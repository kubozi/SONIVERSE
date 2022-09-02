import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import SoundItem from "./SoundItem";
import data from '../../data/dummyData';
import { getAllTokens } from '../../blockchain/tezos/tezosUtils'
import LoadingSpinner from '../../UI/Spinners/LoadingSpinner';

const LOAD_DELAY_BUFFER = 500;

const SoundsList = (props) =>
{
    const [ sounds, setSounds ] = useState([]);
    const [ loaded, setLoaded ] = useState(false);

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
                sounds.map((sound) => (
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
