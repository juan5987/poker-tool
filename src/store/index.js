import { createStore, applyMiddleware, compose } from 'redux';

import reducer from 'reducers';
import authMiddleware from 'middlewares/auth.js';
import chipMiddleware from 'middlewares/chips';
import tournamentsMiddleware from 'middlewares/tournaments';
import distributorMiddleware from 'middlewares/distributor';
import timerMiddleware from 'middlewares/timer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    authMiddleware, 
    distributorMiddleware, 
    tournamentsMiddleware, 
    timerMiddleware,
    chipMiddleware)
);

const store = createStore(reducer, enhancers);

export default store;
