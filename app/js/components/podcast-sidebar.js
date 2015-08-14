import React from 'react';

let PodcastSidebar = React.createClass({

	render() {
		return (
			<div className="col-md-3 section">
				<div className="podcast-cover text-center">
					<img src={this.props.podcast.cover} alt={this.props.podcast.name} />
				</div>
				<hr/>

				<div className="podcast-title">
					<div className="title">{this.props.podcast.name}</div>
					<div className="author"><span>by&nbsp;</span>{this.props.podcast.author}</div>	
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
