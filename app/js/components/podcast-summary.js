import React from 'react';
import { Link } from 'react-router';

let PodcastSummary = React.createClass({

	render() {
		return (
			<div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 podcast-summary">
				<div className="box">
					<Link to="podcast" params={{podcastId: this.props.podcast.id}} >
						<div className="box-icon">
							<img src={this.props.podcast.cover} alt={this.props.podcast.name} />
						</div>
						<div className="info">
							<h4 className="text-center">{this.props.podcast.name}</h4>
							<p>
								<span className="text-center">
									<span>Author: </span>
									<span>{this.props.podcast.author}</span></span>
							</p>
						</div>
					</Link>
				</div>
			</div>
		);
	}
});

export default PodcastSummary;
