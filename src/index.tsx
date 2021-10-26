import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './components/app/app';
import {Provider} from 'react-redux';
import store from './store/index';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root'));


