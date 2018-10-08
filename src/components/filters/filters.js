import React, { Component } from 'react';
import PropTypes from 'proptypes';
import InputRange from 'react-input-range';
import Button from '../button/button';
import { COLORS } from '../../constants';
import 'react-input-range/lib/css/index.css';
import './filters.css';

class Filters extends Component {
    state = {
        categories: {
            male: true,
            female: true,
            unissex: true
        },
        priceRange: {
            min: 0,
            max: 500
        },
        colors: []
    }

    onChangeCategories(prop) {
        const categories = this.state.categories;
        categories[prop] = !categories[prop]

        this.setState({
            categories
        })
    }

    toggleColor(colorValue) {
        const colors = [...this.state.colors];
        const index = colors.findIndex(c => c.value === colorValue);

        if (index === -1) {
            colors.push(COLORS.find(c => c.value === colorValue));
        } else {
            colors.splice(index, 1);
        }

        this.setState({ colors });
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.props.onChange(this.state);
    }

    render() {
        return (
            <form className="filters" onSubmit={this.onSubmit.bind(this)}>
                <label className="filters__label">Categorias:</label>
                <label className="filters__checkbox">
                    <input type="checkbox"
                           checked={this.state.categories.male}
                           className="filters__checkbox__input"
                           onChange={() => this.onChangeCategories('male')} /> Masculino
                </label>
                <label className="filters__checkbox">
                    <input type="checkbox"
                           checked={this.state.categories.female}
                           className="filters__checkbox__input"
                           onChange={() => this.onChangeCategories('female')} /> Feminino
                </label>
                <label className="filters__checkbox">
                    <input type="checkbox"
                           checked={this.state.categories.unissex}
                           className="filters__checkbox__input"
                           onChange={() => this.onChangeCategories('unissex')} /> Unissex
                </label>

                <br />

                <label className="filters__label">Preço:</label>
                <div className="filters__price-range">
                    <InputRange
                        minValue={0}
                        maxValue={500}
                        formatLabel={n => `R$ ${n.toFixed(2)}`}
                        value={this.state.priceRange}
                        onChange={priceRange => this.setState({ priceRange })} />
                </div>

                <br />

                <label className="filters__label">Cores:</label>
                <label className="filters__checkbox">
                    <input type="checkbox"
                            className={`filters__checkbox__input filters__checkbox__input--rainbow`}
                            onChange={() => this.setState({ colors: [] })}
                            checked={this.state.colors.length === 0} />
                            Todas as Cores
                </label>
                {COLORS.map(({ label, value }, index) => {
                    return (
                        <label key={index} className="filters__checkbox">
                            <input type="checkbox"
                                   className={`filters__checkbox__input filters__checkbox__input--${value}`}
                                   onChange={() => this.toggleColor(value)}
                                   checked={this.state.colors.findIndex(c => c.value === value) !== -1} /> {label}
                        </label>
                    )
                })}

                <br />

                <div style={{ textAlign: 'right' }}>
                    <Button type="submit">
                        Aplicar
                    </Button>
                </div>
            </form>
        )
    }
}

Filters.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default Filters;