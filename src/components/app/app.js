import React, { Component } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import './app.css';

class App extends Component {
	state = {
		user: null
	}

	login() {
		this.setState({ user: true });
	}

	logout() {
		this.setState({ user: false });
	}

	render() {
		return (
			<div className="app">
				<Header user={this.state.user}
						login={this.login.bind(this)}
						logout={this.logout.bind(this)} />
				<div className="app__content">
					
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
