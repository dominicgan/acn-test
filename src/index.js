import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './sass/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
