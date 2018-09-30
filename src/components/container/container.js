import React from 'react';
import PropTypes from 'proptypes';
import './container.css';

const Container = props => {
    return (
        <div className={`container ${props.noPadding === true ? 'container--no-padding' : ''}`}>
            {props.children}
        </div>
    )
}

Container.propTypes = {
    noPadding: PropTypes.bool
}

export default Container;