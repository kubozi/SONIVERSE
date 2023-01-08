import React from 'react'
import AlgoLogo from '../../Assets/algorand_logo_mark_white.svg'
import './AlgoIcon.css'

const AlgoIcon = () => {
    // return ( <img src={AlgoLogo} alt='' style={{width:50, height: 50}}/> );

    return ( <div className='algo-logo-icon'><img src={AlgoLogo} alt=''  /></div> );
}

export default AlgoIcon