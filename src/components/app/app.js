import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import './app.css';

class App extends Component {
	state = {
		user: null,
		catalogueView: null
	}

	async componentDidMount() {
		const catalogueView = (
			await import('../catalogue-view/catalogue-view')
		).default;
		
		this.setState({ catalogueView })
	}

	login() {
		this.setState({ user: true });
	}

	logout() {
		this.setState({ user: false });
	}

	render() {
		return (
			<BrowserRouter>
				<div className="app">
					<Header user={this.state.user}
							login={this.login.bind(this)}
							logout={this.logout.bind(this)} />
					<div className="app__content">
						<Route path="/" component={this.state.catalogueView} />
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
