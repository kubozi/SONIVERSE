import React from 'react';
import './Button.css'

const STYLES = [
    'btn--primary',
    'btn--outline',
]

const SIZES = [
    'btn--medium',
    'btn--large',
    'btn--smol'
]

const Button = ({
    children, 
    type, 
    onClick, 
    buttonStyle, 
    buttonSize}) =>
{
    // use primary style if button style is not included to styles
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[1];
    if(buttonStyle == 'smol') checkButtonStyle = STYLES[2];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];


    return(
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
            {children}
        </button>
    )
}

export default Button;