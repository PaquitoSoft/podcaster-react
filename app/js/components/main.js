import React from 'react';
import { RouteHandler, Link } from 'react-router';

let Home = React.createClass({

	getInitialState: function() {
		return {
			loaderClass: 'hidden' 
		};
	},

	clickHandler(e) {
		if (e.isNavigationEvent) {
			this.loaderTo = setTimeout(() => {
				this.setState({
					loaderClass: ''
				});	
			}, 150);
		}
	},

	componentWillReceiveProps(newProps) {
		clearTimeout(this.loaderTo);
		this.setState({
			loaderClass: 'hidden'
		});
	},

	// props syntax is to be able to pass to inner route handlers 
	// data received by parent Root one
	render() {
		let spinnerClasses = `spinner pull-right ${this.state.loaderClass}`;
		return (
			<div className="container" onClick={this.clickHandler}>
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
