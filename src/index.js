import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from 'components/App';
import store from 'store';

import './reset.css'

const rootReactElement = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

const target = document.getElementById('root');

render(rootReactElement, target);
