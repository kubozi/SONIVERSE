import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import SoundItem from "./SoundItem";
import { getAllTokens } from '../../blockchain/tezos/tezosUtils'
import LoadingSpinner from '../../UI/Spinners/LoadingSpinner';
import { getIndexSounds } from '../../API/api';
import useHttp from '../../hooks/use-http';
import { getShortLoadDelayBuffer } from '../../Utils/Utils';
import Button from '../../UI/Buttons/Button';

// SoundsList component is responsible for displaying the latest sounds minted and submitted for sale. These sounds are displayed as a list of audio waveforms that can be played back and click the name of the sound to expand to sound details.
const SoundsList = (props) =>
{
    const [ extendedView, setExtendedView ] = useState(false);
    
    let { sendRequest, status, data: sounds } = useHttp(getIndexSounds);
    const [ loadedSounds, setLoadedSounds ] = useState(sounds);
    
    useEffect(() => {
        indexDataLoader();
    }, [sendRequest]);

    const indexDataLoader = async () => {
        await sendRequest();
        console.log('index data loaded: ');
        console.log(sounds);
        setLoadedSounds(sounds);
    }

    const loadMoreHandler = async () => {
        let allSounds = await getIndexSounds(true);
        setLoadedSounds(allSounds);
        console.log('all sounds: ', allSounds.length);
        setExtendedView(true);
    }

    if(extendedView && loadedSounds.length > 0) {
        return (
            <div>
                <ul className='sounds-list'>
                    {
                        loadedSounds &&
                        loadedSounds.length > 0 &&
                        loadedSounds
                        .filter(s => s.listed)
                        .map((s) => (
                                <SoundItem
                                    key={Math.random().toString()}
                                    tokenID={s.tokenID} 
                                    price={s.price}
                                    description={s.description}
                                    tags={s.tags}
                                    royalties={s.royalties}
                                    createdAt={s.createdAt}
                                    name={s.name}
                                    creator={s.creator}
                                    owner={s.owner}
                                    ipfsURL={s.ipfsURL}
                                    soundIPFSURL={s.soundIPFSURL}
                                    searchTagHandler={props.searchTagHandler}
                                />
                        ))
                    }
                </ul>
            </div> )
    }

    return (
        <div>
            <ul className='sounds-list'>
                {
                    sounds &&
                    sounds.length > 0 &&
                    sounds
                    .filter(s => s.listed)
                    .map((s) => (
                        <SoundItem
                            key={Math.random().toString()}
                            tokenID={s.tokenID} 
                            price={s.price}
                            description={s.description}
                            tags={s.tags}
                            royalties={s.royalties}
                            createdAt={s.createdAt}
                            name={s.name}
                            creator={s.creator}
                            owner={s.owner}
                            ipfsURL={s.ipfsURL}
                            soundIPFSURL={s.soundIPFSURL}
                            searchTagHandler={props.searchTagHandler}
                        />
                    ))
                }
            </ul>
            <br />
            <br />
            <br />
            {   !extendedView &&
                <Button onClick={() => loadMoreHandler()}>MORE</Button>
            }
        </div>

        );
}

export default SoundsList;
