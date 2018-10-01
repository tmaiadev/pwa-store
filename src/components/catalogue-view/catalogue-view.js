import React, { Component } from 'react';
import Toolbar from '../toolbar/toolbar';
import Container from '../container/container';
import Row from '../row/row';
import Select from '../select/select';
import FUNNEL_ICON from './funnel.svg';
import './catalogue-view.css';

const ORDERS_OPTIONS = [
    { value: 'NEW', label: 'Novidades' },
    { value: 'PRICE_ASC', label: 'Preços Crescente' },
    { value: 'PRICE_DESC', label: 'Preços Decrescente' }
]

class CatalogueView extends Component {
    render() {
        return (
            <div className="catalogue-view">
                <Toolbar>
                    <Container>
                        <Row>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <button className="catalogue-view__filter-btn">
                                    <img src={FUNNEL_ICON}
                                         className="catalogue-view__filter-btn__icon"
                                         aria-hidden
                                         alt="Filtro" /> Filtro
                                </button>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <Select id="order"
                                        name="order"
                                        label="Ordenar por"
                                        options={ORDERS_OPTIONS} />
                            </div>
                        </Row>
                    </Container>
                </Toolbar>
            </div>
        )
    }
}

export default CatalogueView;