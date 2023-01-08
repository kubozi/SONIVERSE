import { useParams, Route, Link } from 'react-router-dom';

import './SoundItem.css'
import Waveform from './Waveform';
import { getShortAddress } from '../../Utils/Utils';
import { getOwner } from '../../blockchain/tezos/tezosUtils';

var urlencode = require('urlencode');

const SoundItem = (props) =>
{
    // const owner = getOwner(props.author, props.holder);
    // const ownerShort  = getShortAddress(owner);

    // let fullSoundURL = encodeURI(props.soundURL);
    // fullSoundURL = 'https://' + fullSoundURL;
    // console.log(fullSoundURL);

    return(
        <div className="sound-item">
                <Link to={`/sounds/${props.tokenID}`}>
                    <h3 className='sound-item_label'>{props.name} @{props.owner}</h3>
                </Link>
                { props.soundIPFSURL &&
                <Waveform url={props.soundIPFSURL} /> }
        </div>
    );
}

export default SoundItem;