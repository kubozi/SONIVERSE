import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import SoundItem from "./SoundItem";
import { getAllTokens } from '../../blockchain/tezos/tezosUtils'
import LoadingSpinner from '../../UI/Spinners/LoadingSpinner';

import { getIndexSounds } from '../../API/api';
import useHttp from '../../hooks/use-http';
import { getShortLoadDelayBuffer } from '../../Utils/Utils';

// SoundsList component is responsible for displaying the latest sounds minted and submitted for sale. These sounds are displayed as a list of audio waveforms that can be played back and click the name of the sound to expand to sound details.
const SoundsList = (props) =>
{
    // fetch user data from db
    let { sendRequest, status, data: sounds } = useHttp(getIndexSounds);

    useEffect(() => {
        sendRequest();

        console.log(sounds);
    }, [sendRequest]);

    return (
        <ul className='sounds-list'>
            {
                sounds &&
                sounds.length > 0 &&
                sounds.reverse().map((sound) => (
                    <SoundItem
                        key={Math.random().toString()}
                        tokenID={sound.tokenID} 
                        description={sound.description}
                        tags={sound.tags}
                        royalties={sound.royalties}
                        createdAt={sound.createdAt}
                        name={sound.name}
                        creator={sound.creator}
                        owner={sound.owner}
                        ipfsURL={sound.ipfsURL}
                        soundIPFSURL={sound.soundIPFSURL}
                    />
                ))
            }
        </ul>
        );
}

export default SoundsList;
