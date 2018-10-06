import React, { Component } from 'react';
import PropTypes from 'proptypes';
import Button from '../button/button';
import './auth-modal.css';
import ICON_USER from './icon-user.svg';
import ICON_FACEBOOK from './icon-facebook.svg';
import ICON_GOOGLE from './icon-google.svg';

class AuthModal extends Component {
    constructor(props) {
        super(props);

        this.onEscape = this.onEscape.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onEscape);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onEscape);
    }

    onOutsideClick(evt) {
        const { target } = evt;
        
        if (target === this.$outside) {
            this.props.onClose()
        }
    }

    onEscape(evt) {
        if (evt.key !== "Escape" || this.props.active === false)
            return;
        
        this.props.onClose();
    }

    render() {
        return (
            <div className={`auth-modal ${this.props.active ? 'auth-modal--active' : ''}`}
                role="dialog"
                tabIndex={this.props.active ? "0" : "-1"}
                ref={$el => this.$outside = $el}
                onClick={this.onOutsideClick.bind(this)}>
                <div className="auth-modal__dialog"
                     role="document">
                    <h2 className="auth-modal__title">Entrar com sua conta</h2>
                    <img src={ICON_USER}
                         className="auth-modal__icon"
                         alt="Ícone de Usuário" />
                    <Button icon={ICON_FACEBOOK}
                            style={{ marginBottom: 8, backgroundColor: '#3b5998' }}
                            onClick={() => this.props.login('facebook')}>
                        Entrar com Facebook        
                    </Button>
                    <Button icon={ICON_GOOGLE}
                            style={{ backgroundColor: '#c71610' }}
                            onClick={() => this.props.login('google')}>
                        Entrar com Google        
                    </Button>
                    <button className="auth-modal__close-btn"
                            aria-label="Fechar"
                            onClick={() => this.props.onClose()}>
                        &times;
                    </button>
                </div>
            </div>
        )
    }
}

AuthModal.propTypes = {
    active: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}

export default AuthModal;