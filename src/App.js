import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import canvas from './reducers/canvas';
import converter from './reducers/converter';

import injectSheet from './utils/injectSheet';
import globalStyles from './style/globalStyle';
import SimpleNavigation from './components/Navigation';
import { jssSheet } from './utils/propTypes';

const styles = {
	...globalStyles,
	content: {
		textAlign: 'center',
	},
};

/* eslint-disable no-underscore-dangle */
const store = createStore(
	combineReducers({
		canvas,
		converter,
	}),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

const App = ({ sheet: { classes }, children }) => (
	<Provider store={store}>
		<div>
			<SimpleNavigation />
			<div className={classes.content}>
				{children}
			</div>
		</div>
	</Provider>
);

App.propTypes = {
	children: React.PropTypes.element,
	sheet: jssSheet,
};

export default injectSheet(styles)(App);
