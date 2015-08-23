import React from 'react';
import { RouteHandler } from 'react-router';
import Link from './custom-link';

let Home = React.createClass({

	getInitialState: function() {
		return {
			loaderClass: 'hidden' 
		};
	},

	clickHandler(e) {
		if (e.nativeEvent.isNavigationEvent) {
			this.loaderTo = setTimeout(() => {
				this.setState({
					loaderClass: ''
				});	
			}, 75);
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
		let spinnerClasses = `spinner ${this.state.loaderClass}`;
		return (
			<div onClick={this.clickHandler}>
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

				<div className="main-content">
					<RouteHandler {...this.props} />
				</div>
			</div>
		);
	}
});

export default Home;
