import React from 'react';
import { RouteHandler, Link } from 'react-router';

let Home = React.createClass({
	render() {
		return (
			<div className="container">
				<div className="header clearfix">
					<h3 className="text-muted">
						<Link to="/">
							Podcaster
						</Link>
					</h3>
				</div>

				<div>
					<RouteHandler />
				</div>
			</div>
		);
	}
});

export default Home;
