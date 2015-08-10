// import React from 'react';

// let Main = React.createClass({
// 	render() {
// 		var podcastsCount = 25;
// 		return (
// 			<div className="container">
// 				<h2>Here will be the podcasts grid ({podcastsCount})</h2>
// 			</div>
// 		);
// 	}
// });

// export default Main;


import React from 'react';
import { RouteHandler } from 'react-router';

let Home = React.createClass({
	render() {
		return (
			<div className="container">
				<div className="header clearfix">
					<h3 className="text-muted">Podcaster</h3>
				</div>

				<div>
					<RouteHandler />
				</div>
			</div>
		);
	}
});

export default Home;