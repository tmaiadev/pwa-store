import React, { Component } from 'react';
import PropTypes from 'proptypes';
import ARROW_DOWN_ICON from './arrow-down.svg';
import './select.css';

class Select extends Component {
    onChange() {
        if (this.props.onChange) {
            this.props.onChange(this.$el.value);
        }
    }

    render() {
        return (
            <div className="select">
                <label className="select__label"
                       htmlFor={this.props.id}>{this.props.label}:</label>
                <select className="select__input"
                        id={this.props.id}
                        name={this.props.name}
                        onChange={this.onChange.bind(this)}
                        defaultValue={this.props.defaultValue}
                        ref={$el => this.$el = $el}>
                    {this.props.options.map((o, i) => {
                        return (
                            <option key={i}
                                    className="select__option"
                                    value={o.value}>
                                {o.label}
                            </option>
                        )
                    })}
                </select>
                <img className="select__arrow-down"
                     src={ARROW_DOWN_ICON}
                     alt="Arrow Down"
                     aria-hidden />
            </div>
        )
    }
}

Select.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    )
}

export default Select;