import React from 'react';
import { Route, IndexRoute } from 'react-router';

import DesignContainer from './components/GlobalContainer/DesignContainer';
import App from './components/App/App'
import Home from './components/App/Home';
import Settings from './components/App/Settings';
import Login from './components/Login';

export default (
	<Route path="/" component={DesignContainer}>
		<Route path="app" component={App}>
			<IndexRoute component={Home}/>
			<Route path="settings" component={Settings} />
		</Route>
		<Route path="login" component={Login}/>
	</Route>
);