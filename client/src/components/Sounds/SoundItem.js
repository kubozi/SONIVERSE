import { useParams, Route, Link } from 'react-router-dom';

import './SoundItem.css'
import Waveform from './Waveform';
import { getShortAddress } from '../../Utils/Utils';
import { getOwner } from '../../blockchain/tezos/tezosUtils';
import SoundLabel from './SoundLabel';
import TagList from './TagList';

let urlencode = require('urlencode');

const SoundItem = (props) =>
{
    const ownerShort = getShortAddress(props.owner);
    const name = props.name;
    const price = props.price;
    const tags = props.tags;
    const soundIpfsUrl = props.soundIPFSURL;
    const tokenID = props.tokenID;

    return(
        <div className="sound-item">
                <Link style={{textDecoration: 'none'}}to={`/sounds/${tokenID}`}>
                    <SoundLabel 
                        soundname={name} 
                        price={price} 
                        owner={ownerShort}/>
                </Link>
                <Waveform url={soundIpfsUrl} />
                <TagList 
                    searchTagHandler={props.searchTagHandler} 
                    tags={tags} />
        </div>
    );
}

export default SoundItem;