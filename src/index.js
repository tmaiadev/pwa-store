import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/app/app';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// import font asyncronally
const $link = document.createElement('link');
$link.rel = 'stylesheet';
$link.href = 'https://fonts.googleapis.com/css?family=EB+Garamond';
document.head.appendChild($link);