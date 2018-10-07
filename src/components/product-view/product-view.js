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
import RETURN_ICON from './icon-return.svg';
import FACEBOOK_ICON from './icon-facebook.svg';
import TWITTER_ICON from './icon-twitter.svg';
import WHATSAPP_ICON from './icon-whatsapp.svg';
import GOOGLEPLUS_ICON from './icon-googleplus.svg';
import './product-view.css';

class ProductView extends Component {
    state = {
        product: null
    }
    
    componentDidMount() {
        const { id } = this.props.match.params;
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
            </div>
        )
    }
}

export default ProductView;