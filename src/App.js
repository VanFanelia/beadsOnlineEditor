import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

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

class App extends React.Component {

	constructor(props) {
		super(props);
		this.sheet = props.sheet;
		this.classes = props.classes;
		this.children = props.children;
		this.customHistory = createBrowserHistory();
		this.store = props.store;
	}

	componentDidMount() {
		this.store.dispatch({ type: 'INIT' });
	}

	render() {
		return (
			<BrowserRouter history={this.customHistory} >
				<div>
					<Navigation currentPath={''} />
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
	store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	sheet: jssSheet.isRequired,
	classes: jssClasses.isRequired,
};

App.defaultProps = {
	children: null,
};

export default injectSheet(styles)(App);
