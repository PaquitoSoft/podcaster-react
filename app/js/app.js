import React from 'react';
import Router from 'react-router';
import routes from './config/routes';

// Enhance dom collections with array functions
// (https://gist.github.com/DavidBruant/1016007)
NodeList.prototype.forEach = Array.prototype.forEach;
NodeList.prototype.map = Array.prototype.map;

Router.run(routes, function (Root) {
	React.render(<Root />, document.getElementById('app'));
});
