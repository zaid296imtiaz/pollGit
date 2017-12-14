import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase';
// import Polling from './Polling';
import Rout from './Routes';
import registerServiceWorker from './registerServiceWorker';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAMAcVxOPvQSVsAtUNOCYhTNSkCS1Hruro",
    authDomain: "annopoll343.firebaseapp.com",
    databaseURL: "https://annopoll343.firebaseio.com",
    projectId: "annopoll343",
    storageBucket: "",
    messagingSenderId: "358115671613"
  };
  firebase.initializeApp(config);

ReactDOM.render(<Rout />, document.getElementById('root'));
registerServiceWorker();
