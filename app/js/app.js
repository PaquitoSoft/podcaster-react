import { BaseApp } from 'ps-ractive-router';
import Template from './views/app.html';
import routesConfiguration from './config/routes';

import * as Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import * as AppStyles from '../styles/app.css';

let App = BaseApp.extend({
	el: '#app',
	template: Template,
	routesConfiguration: routesConfiguration,
	onBeforeNavigation: function() {
		console.info('Navigation start...');
		this.set('loading', true);
	},
	onNavigationDone: function() {
		console.info('...navigation end!');
		window.scrollTo(0, 0);
		this.set('loading', false);
	},
	showError: function(message) {
		this.set('errorMsg', message);
		setTimeout(function() {
			this.set('errorMsg', null);
		}.bind(this), 2500);
	},
	data: {
		loading: false
	}
});

export default App;
