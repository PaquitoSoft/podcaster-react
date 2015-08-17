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
	// console.log('URL changed!!! This is the state:', state);
	
	let promises = state.routes.filter(route => {
		return route.handler.fetchData;
	}).reduce((prev, route) => {
		prev.names.push(route.name);
		prev.fns.push(route.handler.fetchData(state.params));
		return prev;
	}, {names: [], fns: []});
	
	Promise.all(promises.fns)
		.then(data => {
			let props = data.reduce((prev, result, index) => {
				prev[promises.names[index]] = result;
				return prev;
			}, {});

			React.render(<Root data={props} />, appMainEl);
		});
});
