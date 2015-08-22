import React from 'react';
import Link from './custom-link';

let PodcastSummary = React.createClass({

	render() {
		let favButtonClassNames = 'glyphicon ';
		
		if (this.props.podcast.isFavorite) {
			favButtonClassNames += 'glyphicon-star';
		} else {
			favButtonClassNames += 'glyphicon-star-empty';
		}

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
									<span>{this.props.podcast.author}</span>
									<div className="favorite-buttons">
										<span className={favButtonClassNames} aria-hidden="true"></span>
									</div>
								</span>
							</p>
						</div>
					</Link>
				</div>
			</div>
		);
	}
});

export default PodcastSummary;
