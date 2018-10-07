import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AsyncComponent from '../async-component/async-component';
import localforage from 'localforage';
import Header from '../header/header';
import Footer from '../footer/footer';
import './app.css';
import AuthModal from '../auth-modal/auth-modal';

class App extends Component {
	state = {
		user: null,
		authModal: false
	}

	async componentDidMount() {
		this.firebase = await import('../../firebase');
		this.FIREBASE_GOOGLE_PROVIDER = new this.firebase.lib.auth.GoogleAuthProvider();
		this.FIREBASE_FACEBOOK_PROVIDER = new this.firebase.lib.auth.FacebookAuthProvider();

		try {

			let user = await localforage.getItem('user');

			if ( ! user) {
				const authResult = await this.firebase.app.auth().getRedirectResult();
				user = authResult.user ?
					authResult.user.providerData[0] : false;

				await localforage.setItem('user', user);
			}

			this.setState({ user });

		} catch (e) {
			switch (e.code) {
				case 'auth/network-request-failed':
					alert("Sua internet falhou. Tente novamente.")
					break;

				case 'auth/account-exists-with-different-credential':
					alert('Esse e-mail está sendo usado por outra conta. Tente novamente com outro provedor.');
					break;

				case 'auth/invalid-user-token':
					alert('Suas credenciais não são mais válidas. Tente novamente.');
					break;

				default:
					alert('Ocorreu um erro desconhecido. Tente novamente');
					break;
			}
		}
	}

	openAuthModal() {
		this.setState({ authModal: true });
	}

	closeAuthModal() {
		this.setState({ authModal: false });
	}

	login(type) {
		let provider;

		if (type === 'facebook') {
			provider = this.FIREBASE_FACEBOOK_PROVIDER;
		} else if (type === 'google') {
			provider = this.FIREBASE_GOOGLE_PROVIDER;
		} else {
			throw new Error('Unknwon provider');
		}

		this.firebase.app.auth().signInWithRedirect(provider);
	}

	logout() {
		localforage.removeItem('user');
		this.setState({ user: false });

		// Request logout from firebase.
		// Since user might have been logged with using
		// the database, we ignore errors.
		this.firebase.app.auth().signOut().catch(() => {});
	}

	render() {
		return (
			<BrowserRouter>
				<div className="app">
					<Header user={this.state.user}
							login={this.openAuthModal.bind(this)}
							logout={this.logout.bind(this)} />
					<div className="app__content">
						<Route path="/"
							   exact
							   component={AsyncComponent(() => import('../catalogue-view/catalogue-view'))} />
						<Route path="/:id"
							   exact
							   component={AsyncComponent(() => import('../product-view/product-view'), { user: this.state.user })} />
					</div>
					<Footer />
					<AuthModal active={this.state.authModal}
							   login={this.login.bind(this)}
							   onClose={this.closeAuthModal.bind(this)} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
