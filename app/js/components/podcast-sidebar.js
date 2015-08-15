import React from 'react';
import { Link } from 'react-router';

let PodcastSidebar = React.createClass({

	render() {
		return (
			<div className="col-md-3 section">
				<div className="podcast-cover text-center">
					<Link to="podcast" params={{podcastId: this.props.podcast.id}} >
						<img src={this.props.podcast.cover} alt={this.props.podcast.name} />
					</Link>
				</div>
				<hr/>

				<div className="podcast-title">
					<Link to="podcast" params={{podcastId: this.props.podcast.id}} >
						<div className="title">{this.props.podcast.name}</div>
						<div className="author"><span>by&nbsp;</span>{this.props.podcast.author}</div>	
					</Link>
				</div>
				<hr/>

				<div className="podcast-description">
					<div>Description:</div>
					<p>{this.props.podcast.description}</p>
				</div>
			</div>
		);
	}

});

export default PodcastSidebar;
