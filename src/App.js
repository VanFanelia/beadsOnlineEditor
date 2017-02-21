import React from 'react';
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

const App = ({ sheet: { classes }, children }) => (
	<div>
		<SimpleNavigation />
		<div className={classes.content}>
			{children}
		</div>
	</div>
);

App.propTypes = {
	children: React.PropTypes.element,
	sheet: jssSheet,
};

export default injectSheet(styles)(App);
