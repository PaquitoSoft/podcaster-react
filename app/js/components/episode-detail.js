import React from 'react';
import { State } from 'react-router';
import PodcastModel from '../models/podcast';
import PodcastsStore from '../stores/podcasts-store';
import PodcastSidebar from './podcast-sidebar';

let EpisodeDetail = React.createClass({

	mixins: [State],

	getInitialState() {
		return {
			podcast: new PodcastModel(),
			episode: {}
		};
	},

	componentDidMount() {
		let routeParams = this.getParams();

		PodcastsStore.findById(routeParams.podcastId)
			.then(podcast => {
				this.setState({
					podcast: podcast,
					episode: podcast.episodes.filter(ep => {
							return ep.id === routeParams.episodeId;
						})[0]
				});
			})
			.catch(err => {
				console.warn('Error fetching podcast data:', this.getParams().podcastId, err);
			});
	},

	render() {
		return (
			<div className="row">
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
