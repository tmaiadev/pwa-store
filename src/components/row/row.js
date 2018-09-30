import React from 'react';
import './row.css';

export default props => {
    return <div className="row"
                style={{ gridTemplateColumns: `repeat(${props.children.length}, 1fr)` }}>
        {props.children}
    </div>
}