import React from 'react';
import PropTypes from 'proptypes';
import './button.css';

const Button = props => {
    return (
        <button className="button"
                required={props.required}
                onClick={props.onClick}>
            {props.children}
        </button>
    )
}

Button.propTypes = {
    required: PropTypes.bool,
    onClick: PropTypes.func
}

export default Button;