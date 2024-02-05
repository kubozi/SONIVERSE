import './SoundLabel.css'

import Price from '../../UI/Price';
import { convertMutezToTez } from '../../blockchain/tezos/tezosUtils';

const SoundLabel = (props) => {

    const soundname = props.soundname;
    const owner = props.owner;
    const price = convertMutezToTez(props.price);
    console.log('price: ', price);
    console.log('props.price ', props.price);
    console.log('soundname: ', soundname);

    return (
        <div className='sound-item-label-container'>
            <ul>
                <li>
                    <h3 className='sound-item-label-soundname'>{soundname}</h3>
                </li>

                <li>
                    <h3 className='sound-item-label-owner'>@{owner}</h3>
                </li>

                <li>
                    <div><Price price={price} /></div>
                </li>
            </ul>
        </div>
    )
}

export default SoundLabel;