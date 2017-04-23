import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import global from './reducers/global';
import canvas from './reducers/canvas';
import converter from './reducers/converter';

import injectSheet from './utils/injectSheet';
import globalStyles from './style/globalStyle';
import SimpleNavigation from './components/Navigation';
import { jssSheet, jssClasses } from './utils/propTypes';

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
		global,
		converter,
	}),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

class App extends React.Component {

	constructor(props) {
		super(props);
		this.sheet = props.sheet;
		this.classes = props.classes;
		this.children = props.children;
	}

	componentDidMount() {
		store.dispatch({ type: 'INIT' });
	}

	render() {
		return (
			<Provider store={store}>
				<div>
					<SimpleNavigation />
					<div className={this.classes.content}>
						{this.children}
					</div>
				</div>
			</Provider>
		);
	}
}

App.propTypes = {
	children: React.PropTypes.element,
	sheet: jssSheet,
	classes: jssClasses,
};

export default injectSheet(styles)(App);
