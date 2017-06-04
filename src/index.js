import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer as routing } from 'react-router-redux';

import global from './reducers/global';
import canvas from './reducers/canvas';
import converter from './reducers/converter';

import App from './App';

/* eslint-disable no-underscore-dangle */
const store = createStore(
	combineReducers({
		canvas,
		global,
		converter,
		routing,
	}),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);
