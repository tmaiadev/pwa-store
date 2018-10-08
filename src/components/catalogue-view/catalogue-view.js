import React, { Component } from 'react';
import Toolbar from '../toolbar/toolbar';
import Container from '../container/container';
import Row from '../row/row';
import Select from '../select/select';
import ProductPlaceholder from '../product-placeholder/product-placeholder';
import MobileFilters from '../mobile-filters/mobile-filters';
import Filters from '../filters/filters';
import FUNNEL_ICON from './funnel.svg';
import './catalogue-view.css';
import Product from '../product/product';

const ORDERS_OPTIONS = [
    { value: 'NEW', label: 'Novidades' },
    { value: 'PRICE_ASC', label: 'Preços Crescente' },
    { value: 'PRICE_DESC', label: 'Preços Decrescente' }
]

const DEFAULT_PRODUCTS = [
    null, null, null,
    null, null, null,
    null, null, null,
    null, null, null,
    null, null, null,
    null, null, null,
    null, null
]

class CatalogueView extends Component {
    state = {
        products: DEFAULT_PRODUCTS,
        filtersOpen: false,
        filters: {
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
        },
        order: ORDERS_OPTIONS[0].value
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts() {
        this.setState({
            products: DEFAULT_PRODUCTS
        }, async () => {
            const { app } = await import('../../firebase');
            const db = app.firestore();
            db.settings({ timestampsInSnapshots: true });

            // This is just a Demo.
            // I'll fetch all the products and apply the filters
            // later, just for demonstration. You should not do
            // this in production.
            const querySnapshot = await db.collection('products').get();
            const products = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            .filter(prod => {
                let result = true;

                const categories = Object.keys(this.state.filters.categories)
                .filter(cat => this.state.filters.categories[cat] === true);

                if (categories.indexOf(prod.category) === -1) {
                    result = false;
                }

                if (
                    prod.price < this.state.filters.priceRange.min ||
                    prod.price > this.state.filters.priceRange.max) {
                        result = false;
                }

                if (this.state.filters.colors.length > 0) {
                    if (this.state.filters.colors.map(c => c.value).indexOf(prod.color) === -1) {
                        result = false;
                    }
                }

                return result;
            })
            .sort((a, b) => {
                let r = true;
                switch (this.state.order) {
                    case 'PRICE_ASC':
                        r = a.price > b.price;
                        break;

                    case 'PRICE_DESC':
                        r = b.price > a.price;
                        break;

                    default:
                        break;
                }

                return r;
            });

            this.setState({ products });
        })
    }

    openFilters() {
        this.setState({ filtersOpen: true });
    }

    closeFilters() {
        this.setState({ filtersOpen: false });
    }

    onFilterChange(filters) {
        this.setState({ filters, filtersOpen: false }, () => this.fetchProducts());
    }

    onOrderChange(order) {
        this.setState({ order }, () => this.fetchProducts());
    }

    render() {
        return (
            <div className="catalogue-view">
                <Toolbar>
                    <Container>
                        <Row>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <button className="catalogue-view__filter-btn"
                                        onClick={this.openFilters.bind(this)}>
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
                                        options={ORDERS_OPTIONS}
                                        defaultValue={this.state.defaultValue}
                                        onChange={this.onOrderChange.bind(this)} />
                            </div>
                        </Row>
                    </Container>
                </Toolbar>
                <Container>
                    <div className="catalogue-view__skeleton">
                        <aside className="catalogue-view__aside">
                            <Filters onChange={this.onFilterChange.bind(this)} />
                        </aside>
                        <main className="catalogue-view__main">
                            <div className="catalogue-view__product-grid">
                                {this.state.products.map((p, i) => {
                                    return <div key={i} className="catalogue-view__product">
                                        {p ? <Product {...p} /> : <ProductPlaceholder/>}
                                    </div>;
                                })}
                            </div>
                        </main>
                    </div>
                </Container>
                <MobileFilters active={this.state.filtersOpen}
                               onChange={this.onFilterChange.bind(this)}
                               onClose={this.closeFilters.bind(this)} />
            </div>
        )
    }
}

export default CatalogueView;