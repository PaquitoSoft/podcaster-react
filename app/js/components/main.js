import React from 'react';
import { RouteHandler, Link } from 'react-router';

let Home = React.createClass({

	getInitialState: function() {
		return {
			loaderClass: 'hidden' 
		};
	},

	showLoader(e) {
		console.log('Must show loader indicator...');
		console.log(e.currentTarget);
		console.log(e.target);
		console.log(typeof e.target);
		console.log(e.target);
		console.dir(e.target);
		// console.log(typeof e.relatedTarget);
		// console.log(e.relatedTarget);
		// console.dir(e.relatedTarget);
		console.log('----------------------------------');
		if (e.target.tagName === 'A') {
			this.setState({
				loaderClass: ''
			});
		}
	},

	hideLoader() {
		console.log('Must hide loader indicator...');
	},

	// props syntax is to be able to pass to inner route handlers 
	// data received by parent Root one
	render() {
		let spinnerClasses = `spinner pull-right ${this.state.loaderClass}`;
		return (
			<div className="container" onClick={this.showLoader}>
				<div className="header clearfix">
					<h3 className="text-muted">
						<Link to="/">
							Podcaster
						</Link>
						<div className={spinnerClasses}>
							<div className="double-bounce1"></div>
							<div className="double-bounce2"></div>
						</div>
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
