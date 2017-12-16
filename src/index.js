import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase';
// import Polling from './Polling';
import Rout from './Routes';
import registerServiceWorker from './registerServiceWorker';

// Initialize Firebase


ReactDOM.render(<Rout />, document.getElementById('root'));
registerServiceWorker();
