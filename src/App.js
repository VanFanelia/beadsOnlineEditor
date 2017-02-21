import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import beadsOnlineEditorApp from './reducers/index';

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

const store = createStore(beadsOnlineEditorApp);

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
