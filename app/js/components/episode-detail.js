import React from 'react';
import { State } from 'react-router';
import PodcastModel from '../models/podcast';
import PodcastsStore from '../stores/podcasts-store';
import PodcastSidebar from './podcast-sidebar';

let EpisodeDetail = React.createClass({

	mixins: [State],

	statics: {
		fetchData(params) {
			return PodcastsStore.findById(params.podcastId);
		}
	},

	getInitialState() {
		// data prop holds a property named with the name of the route
		// configured to use this page component. Its value is the result
		// of invoking statics.fetchData
		let podcast = this.props.data.episode;
		return {
			podcast: podcast,
			episode: podcast.episodes.filter(ep => {
					return ep.id === this.props.params.episodeId;
				})[0]
		};
	},
	
	render() {
		return (
			<div>
				<PodcastSidebar podcast={this.state.podcast} />
				<div className="col-md-8 col-md-offset-1 section">
					<div className="episode-detail">
						<div className="title">{this.state.episode.title}</div>
						<div className="subtitle" dangerouslySetInnerHTML={{__html: this.state.episode.description}}></div>
						<hr/>
						<div className="player">
							<audio src={this.state.episode.mediaUrl} controls></audio>
						</div>
					</div>
				</div>

			</div>
		);
	}
});

export default EpisodeDetail;
