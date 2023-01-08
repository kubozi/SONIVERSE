import React from 'react'
import AlgoIcon from './Icons/AlgoIcon';
import './Price.css'

const Price = (props) => {
    return (
        <div className='flexbox-container'>
            <div className='price-text'>{props.price}</div>
            <div><AlgoIcon/></div>
        </div>);
}

export default Price;