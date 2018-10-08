import React, { Component } from 'react';
import {
    FacebookShareButton,
    GooglePlusShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from 'react-share';
import { Link } from 'react-router-dom';
import Container from '../container/container';
import Toolbar from '../toolbar/toolbar';
import Row from '../row/row';
import Select from '../select/select';
import RETURN_ICON from './images/icon-return.svg';
import TOUCH_ICON from './images/icon-touch.svg';
import CART_ICON from './images/icon-cart.svg';
import FACEBOOK_ICON from './images/icon-facebook.svg';
import TWITTER_ICON from './images/icon-twitter.svg';
import WHATSAPP_ICON from './images/icon-whatsapp.svg';
import GOOGLEPLUS_ICON from './images/icon-googleplus.svg';
import './product-view.css';

const TAB = {
    OPTIONS: 'options',
    DETAILS: 'details'
}

const SIZE_OPTIONS = [
    { label: 'Pequeno', value: 's' },
    { label: 'Médio', value: 'm' },
    { label: 'Grande', value: 'l' },
    { label: 'Extra Grande', value: 'xl' }
]

class ProductView extends Component {
    state = {
        product: {
            name: '',
            image: '',
            details: '',
            price: 0
        },
        tab: TAB.OPTIONS
    }
    
    async componentDidMount() {
        const { id } = this.props.match.params;
        const firebase = await import('../../firebase');
        this.db = firebase.app.firestore();
        this.db.settings({ timestampsInSnapshots: true });
        const doc = await this.db.collection('products').doc(id).get();
        
        if (doc.exists) {
            this.setState({ product: doc.data() });
        } else {
            this.props.history.push('/');
        }
    }

    changeTab(tab) {
        this.setState({ tab });
    }

    buy() {
        alert("Este site é apenas uma demonstração.");
    }

    render() {
        const currentURL = window.location.href;

        return (
            <div className="product-view">
                <Toolbar> 
                    <Container>
                        <Row>
                            <div style={{ display: 'block' }}>
                                <Link to="/" className="product-view__return-btn">
                                    <img src={RETURN_ICON}
                                         alt="Voltar"
                                         className="product-view__return-btn__image" />
                                    Voltar
                                </Link>
                            </div>
                            <div className="product-view__share-bar">
                                <FacebookShareButton url={currentURL}
                                                     additionalProps={{ "aria-label": "Compartilhar no Facebook" }}>
                                    <div className="product-view__share-btn"
                                         style={{ backgroundColor: '#3b5998' }}>
                                        <img src={FACEBOOK_ICON}
                                             alt=""
                                             aria-hidden
                                             className="product-view__share-btn__image" />
                                    </div>
                                </FacebookShareButton>
                                <TwitterShareButton url={currentURL}
                                                    additionalProps={{ "aria-label": "Compartilhar no Twitter" }}>
                                    <div className="product-view__share-btn"
                                         style={{ backgroundColor: '#55acee' }}>
                                        <img src={TWITTER_ICON}
                                             alt=""
                                             aria-hidden
                                             className="product-view__share-btn__image" />
                                    </div>
                                </TwitterShareButton>
                                <GooglePlusShareButton url={currentURL}
                                                       additionalProps={{ "aria-label": "Compartilhar no Google+" }}>
                                    <div className="product-view__share-btn"
                                         style={{ backgroundColor: '#d62d20' }}>
                                        <img src={GOOGLEPLUS_ICON}
                                             alt=""
                                             aria-hidden
                                             className="product-view__share-btn__image" />
                                    </div>
                                </GooglePlusShareButton>
                                <WhatsappShareButton url={currentURL}
                                                     additionalProps={{ "aria-label": "Compartilhar no Whatsapp" }}>
                                    <div className="product-view__share-btn"
                                         style={{ backgroundColor: '#00bfa5' }}>
                                        <img src={WHATSAPP_ICON}
                                             alt=""
                                             aria-hidden
                                             className="product-view__share-btn__image" />
                                    </div>
                                </WhatsappShareButton>
                            </div>
                        </Row>
                    </Container>
                </Toolbar>
                
                {this.state.product.name ?
                    <div className="product-view__content">
                        <Container>
                            <h1 className="product-view__title">{this.state.product.name}</h1>
                        </Container>

                        <Container>
                            <div className="product-view__layout">
                                <div>
                                    <div className="product-view__photo"
                                        style={{ backgroundImage: `url(${this.state.product.image})` }} />
                                </div>
                                <div>
                                    <div className="product-view__tab">
                                        <button className={`product-view__tab-btn ${
                                            this.state.tab === TAB.OPTIONS ?
                                                'product-view__tab-btn--active' : ''
                                        }`} onClick={() => this.changeTab(TAB.OPTIONS)}>Opções</button>
                                        <button className={`product-view__tab-btn ${
                                            this.state.tab === TAB.DETAILS ?
                                                'product-view__tab-btn--active' : ''
                                        }`} onClick={() => this.changeTab(TAB.DETAILS)}>Detalhes</button>
                                    </div>

                                    <div className={`product-view__options ${
                                        this.state.tab === TAB.OPTIONS ?
                                            'product-view__options--active' : ''
                                    }`}>

                                        <div className="product-view__selector">
                                            <Select label="Tamanho"
                                                    options={SIZE_OPTIONS}
                                                    id="size"
                                                    name="size" />
                                            <div className="product-view__selector__price">
                                                R$ {this.state.product.price.toFixed(2).replace('.', ',')}
                                            </div>
                                            <div className="product-view__selector__installments">
                                                ou 4x de R$ {(this.state.product.price / 3).toFixed(2).replace('.', ',')}
                                            </div>
                                        </div>

                                        <div className="product-view__buy-btn-group">
                                            <button className="product-view__buy-btn"
                                                    onClick={this.buy.bind(this)}>
                                                <img src={CART_ICON}
                                                    className="product-view__buy-btn__icon"
                                                    alt="Carrinho de Compras" />
                                                <div>
                                                    ADICIONAR AO CARRINHO
                                                </div>
                                            </button>
                                            <button className="product-view__buy-btn"
                                                    onClick={this.buy.bind(this)}>
                                                <img src={TOUCH_ICON}
                                                    className="product-view__buy-btn__icon"
                                                    alt="Toque" />
                                                <div>
                                                    COMPRAR COM UM CLIQUE
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className={`product-view__details ${
                                        this.state.tab === TAB.DETAILS ?
                                            'product-view__details--active' : ''
                                    }`}>
                                        {this.state.product.details}
                                    </div>

                                    <hr className="product-view__separator" />

                                    <hr className="product-view__separator" />
                                </div>
                            </div>
                        </Container>
                    </div> : null}
            </div>
        )
    }
}

export default ProductView;