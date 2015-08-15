import React from 'react';
import { RouteHandler, Link } from 'react-router';

let Home = React.createClass({
	// props syntax is to be able to pass to inner route handlers 
	// data received by parent Root one
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
					<RouteHandler {...this.props} />
				</div>
			</div>
		);
	}
});

export default Home;
