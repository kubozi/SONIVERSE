import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import SoundItem from "./SoundItem";
import Waveform from "./Waveform";
import './MySoundsList.css'
import { getTokensByOwner } from '../../blockchain/tezos/tezosUtils';
import LoadingSpinner from '../../UI/Spinners/LoadingSpinner';
import { getUserTestData, getTokensByOwnerAddress } from '../../API/api';
import useHttp from '../../hooks/use-http';
import { getShortLoadDelayBuffer } from '../../Utils/Utils';

const MySoundsList = (props) =>
{
    const params = useParams();
    const { address } = params;
    const { sendRequest, status, data: userSounds } = useHttp(getTokensByOwnerAddress);

    useEffect(() => {
        sendRequest(address);
        console.log(userSounds);
    }, [sendRequest]);

    return (
        <div>
            <br />
            <br />
            <br />
            <h2 className='msounds-label'>+{address}</h2>
            <br />
            <br />
            <br />
            <br />
            <br />
            <ul className='sounds-list'>
                {
                    userSounds &&
                    userSounds.length &&
                    userSounds.reverse().map((sound) => (
                        <SoundItem
                            key={Math.random().toString()}
                            price={sound.price}
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
        </div>
    );
}

export default MySoundsList;