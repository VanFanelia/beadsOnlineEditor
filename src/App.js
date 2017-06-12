import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';

import global from './reducers/global';
import canvas from './reducers/canvas';
import converter from './reducers/converter';

import injectSheet from './utils/injectSheet';
import globalStyles from './style/globalStyle';
import Navigation from './components/Navigation';
import { jssSheet, jssClasses } from './utils/propTypes';

import Home from './pages/Home';
import BeadsEditor from './pages/BeadsEditor';
import OtherPage from './pages/OtherPage';
import LogoColorPalette from './pages/LogoColorPalette';

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
		routing,
	}),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

const customHistory = createBrowserHistory();

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
			<BrowserRouter history={customHistory} >
				<div>
					<Navigation currentPath={""} />
					<div className={this.classes.content}>
						{this.children}
					</div>
					<Route exact path="/" component={Home} />
					<Route path="/beads-editor" component={BeadsEditor} />
					<Route path="/about" component={OtherPage} />
					<Route path="/logo" component={LogoColorPalette} />
				</div>
			</BrowserRouter>
		);
	}
}

App.propTypes = {
	children: PropTypes.element,
	sheet: jssSheet.isRequired,
	classes: jssClasses.isRequired,
};

App.defaultProps = {
	children: null,
};

export default injectSheet(styles)(App);
