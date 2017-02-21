import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './pages/Home';
import BeadsEditor from './pages/BeadsEditor';
import OtherPage from './pages/OtherPage';
import LogoColorPalette from './pages/LogoColorPalette';

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="/beads-editor" component={BeadsEditor} />
		<Route path="/about" component={OtherPage} />
		<Route path="/logo" component={LogoColorPalette} />
	</Route>
);

export default routes;
