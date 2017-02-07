import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import reducers from './reducers';
import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(
	routerMiddleware(browserHistory)
)(createStore);

const store = createStoreWithMiddleware(reducers)
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>
	,document.querySelector('.main')
);
