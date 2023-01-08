import React from 'react';
import './TagButton.css'

const TagButton = ({
    children, 
    onClick}) =>
{
    return(
        <button className='btn-smol' onClick={onClick}>
            {children}
        </button>
    )
}

export default TagButton;