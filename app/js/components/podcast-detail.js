import React from 'react';
import { State, Link } from 'react-router';
import PodcastsStore from '../stores/podcasts-store';
import PodcastModel from '../models/podcast';
import PodcastSidebar from './podcast-sidebar';

let PodcastDetail = React.createClass({

	mixins: [State],

	statics: {
		fetchData(params) {
			return PodcastsStore.findById(params.podcastId);
		}
	},

	getInitialState() {
		return {
			podcast: this.props.data[0]
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
			<div className="row">
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
