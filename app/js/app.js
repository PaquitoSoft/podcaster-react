import React from 'react';
import Router from 'react-router';
import routes from './config/routes';

import * as Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import * as AppStyles from '../styles/app.css';

// Enhance dom collections with array functions
// (https://gist.github.com/DavidBruant/1016007)
NodeList.prototype.forEach = Array.prototype.forEach;
NodeList.prototype.map = Array.prototype.map;

let appMainEl = document.getElementById('app');

Router.run(routes, function (Root, state) {
	console.log('URL changed!!! This is the state:', state);
	// React.render(<Root />, document.getElementById('app'));

	// TODO Show loader indicator

	let promises = state.routes.filter(route => {
		return route.handler.fetchData;
	// }).reduce((prev, route) => {
	// 	prev[route.name] = route.fetchData(state.params);
	// }, {});
	}).map(route => {
		return route.handler.fetchData(state.params);
	});

	Promise.all(promises)
		.then(data => {
			// TODO Hide loader indicator
			
			React.render(<Root data={data} />, appMainEl);
		});
});
