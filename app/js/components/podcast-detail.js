import React from 'react';
import { State } from 'react-router';
import PodcastModel from '../models/podcast';
import Link from './custom-link';
import PodcastSidebar from './podcast-sidebar';

let PodcastDetail = React.createClass({

	mixins: [State],

	statics: {
		fetchData(params) {
			return PodcastModel.findById(params.podcastId);
		}
	},

	getInitialState() {
		let podcast = this.props.data.podcast;
		podcast.episodes = podcast.episodes.sort((a, b) => {
			return b.timestamp - a.timestamp;
		});
		return {
			podcast: this.props.data.podcast // Use the name of the route which uses this page component
		};
	},

	render() {
		var episodes = this.state.podcast.episodes.map((episode, index) => {
			return (
				<tr className="podcast-episode-summary" key={index}>
					<td>
						<Link to="episode" params={{podcastId: this.state.podcast.id, episodeId: episode.id}}>
							{episode.title}
						</Link>
					</td>
					<td>{episode.date}</td>
					<td className="duration">{episode.duration}</td>
				</tr>
			);
		}, this);

		return (
			<div>
				<PodcastSidebar podcast={this.state.podcast} />
				
				<div className="col-md-8 col-md-offset-1 section podcast-episodes-count">
					<span>
						Episodes: {this.state.podcast.episodes.length}
					</span>
				</div>

				<div className="col-md-8 col-md-offset-1 section">
					<div className="podcast-episodes">
						<table className="table table-hover table-striped">
							<thead>
								<tr>
									<th>Title</th>
									<th>Date</th>
									<th>Duration</th>
								</tr>
							</thead>
							<tbody>
								{episodes}
							</tbody>
						</table>
					</div>
				</div>

			</div>
		);
	}

});

export default PodcastDetail;
