import React, { Component } from 'react';
import PropTypes from 'proptypes';
import Container from '../container/container';
import IMAGE_LOGO from './images/logo.png';
import IMAGE_CART from './images/cart.svg';
import './header.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-wrapper">
                    <Container>
                        <div className="header__content">
                            <img src={IMAGE_LOGO}
                                className="header__logo"
                                alt="PWA Store" />
                            <div className="header__separator" />
                            <button className="header__btn"
                                    title="Seu carrinho tem 0 ítems"
                                    aria-label="Carrinho">
                                <img src={IMAGE_CART}
                                     className="header__btn-icon"
                                     aria-hidden
                                     alt="Carrinho" />0
                            </button>
                            <button className="header__btn header__btn--underline"
                                    onClick={() => this.props.user ?
                                        this.props.logout() : this.props.login()}>
                                {this.props.user ? 'Sair' : 'Entrar'}
                            </button>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    user: PropTypes.any,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
}

export default Header;