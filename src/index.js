import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer as routing } from 'react-router-redux';

import global from './reducers/global';
import canvas from './reducers/canvas';
import converter from './reducers/converter';

import App from './App';

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		}) : compose;

const enhancer = composeEnhancers(
	applyMiddleware(thunk),
);

const store = createStore(
	combineReducers({
		canvas,
		global,
		converter,
		routing,
	}),
	enhancer,
);
/* eslint-enable */

render(
	<Provider store={store}>
		<App store={store} />
	</Provider>,
	document.getElementById('root'),
);
