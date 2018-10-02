import React from 'react';
import PropTypes from 'proptypes';
import './mobile-filters.css';

const MobileFilters = props => {
    const outsideClick = evt => {
        const $el = evt.target;
        if ($el.classList.contains('mobile-filters')) {
            props.onClose();
        }
    }

    return <div className={`mobile-filters ${props.active ? 'mobile-filters--active' : ''}`}
                tabIndex={props.active ? '0' : '-1'}
                onClick={outsideClick}>
        <aside className="mobile-filters__content">
            <div className="mobile-filters__scroll">
                <div className="mobile-filters__container">
                    <div style={{ textAlign: 'right', marginBottom: 8 }}>
                        <button className="mobile-filters__close-btn"
                                aria-label="Fechar filtros"
                                onClick={props.onClose.bind(this)}>&times;</button>
                    </div>
                </div>
            </div>
        </aside>
    </div>
}

MobileFilters.propTypes = {
    active: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}

export default MobileFilters;