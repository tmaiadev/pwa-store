import React, { Component } from 'react';
import PropTypes from 'proptypes';
import './comment-form.css';
import Button from '../button/button';

class CommentForm extends Component {
    async componentDidMount() {
        const firebase = await import('../../firebase');
        this.db = firebase.app.firestore();
    }

    async submit(evt) {
        evt.preventDefault();

        if ( ! this.props.user || this.sending) return;

        if ( ! this.db) {
            alert("Sua conexão está lenta. Aguarde um pouco e tente novamente.");
            return;
        }

        const message = this.$textarea.value.trim();

        if (message.length === 0) {
            alert("O corpo da mensagem está vazio!");
            return;
        }

        try {
            this.sending = true;

            const {
                displayName,
                photoURL,
                uid
            } = this.props.user;

            const user = {
                displayName,
                photoURL,
                uid
            };

            await this.db
                .collection('comments')
                .doc()
                .set({
                    productId: this.props.productId,
                    message,
                    user
                });

            this.$textarea.value = "";
            this.sending = false;

        } catch (e) {
            console.log(e);
            alert("Ocorreu um erro ao salvar o comentário. Tente novamente.");
        }
    }

    render() {
        return (
            <form className="comment-form"
                  onSubmit={this.submit.bind(this)}>
                <h2 className="comment-form__title">Comentar</h2>
                <div className="comment-form__textarea-wrapper">
                    <textarea className="comment-form__textarea"
                              disabled={ ! this.props.user}
                              ref={$el => this.$textarea = $el}></textarea>
                    {this.props.user ? null : <div className="comment-form__login-required">
                        Você precisa logar para poder comentar<br />
                        <Button type="button"
                                onClick={this.props.login}
                                style={{ marginTop: 8 }}>Entrar</Button>
                    </div>}
                </div>
                <div style={{ textAlign: 'right', marginTop: 8 }}>
                    <Button type="button"
                            onClick={this.submit.bind(this)}
                            style={{ marginLeft: 'auto' }}
                            disabled={! this.props.user}>
                        Enviar        
                    </Button>
                </div>
            </form>
        )
    }
}

CommentForm.porpTypes = {
    login: PropTypes.func.isRequired,
    productId: PropTypes.string.isRequired,
    user: PropTypes.any
}

export default CommentForm;