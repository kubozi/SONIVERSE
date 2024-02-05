import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SoundItem from "./SoundItem";
import './SearchSoundsList.css'

const SearchSoundsList = (props) =>
{
    const searchTerm = props.searchTerm;

    if(props.sounds.length == 0)
    {
        return <>
            <p>No sounds found</p>
        </>
    }

    return (
        <div>
            <h2 className='search-term-label'>+{searchTerm}</h2>
            <ul className="search-sounds-list">
                {
                    props.sounds &&
                    props.sounds.length > 0 &&
                    props.sounds.map((sound) => (
                        <SoundItem 
                            key={Math.random().toString()}
                            tokenID={sound.tokenID} 
                            price={sound.price}
                            description={sound.description}
                            tags={sound.tags}
                            royalties={sound.royalties}
                            createdAt={sound.createdAt}
                            name={sound.name}
                            creator={sound.creator}
                            owner={sound.owner}
                            ipfsURL={sound.ipfsURL}
                            soundIPFSURL={sound.soundIPFSURL}
                            searchTagHandler={props.searchTagHandler} />
                        ))
                    }
            </ul>
        </div>
    );
}

export default SearchSoundsList;