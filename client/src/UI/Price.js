import TezIcon from './Icons/TezIcon';
import './Price.css'

const Price = (props) => {
    return (
        <div className='flexbox-container'>
            <div className='price-text'>{props.price}</div>
            <div className='crypto-icon'><TezIcon/></div>
        </div>);
}

export default Price;