import React from 'react';
import { State } from 'react-router';
import PodcastsStore from '../stores/podcasts-store';
import PodcastSidebar from './podcast-sidebar';

let PodcastDetail = React.createClass({

	mixins: [State],

	getInitialState() {
		return {
			podcast: {},
			episodes: []
		};
	},

	componentDidMount() {
		console.log('URL params:', this.getParams());
		console.log(arguments);
		PodcastsStore.findById(this.getParams().podcastId)
			.then(podcast => {
				this.setState({ podcast: podcast });
				console.log(podcast);
			})
			.catch(err => {
				console.warn('Error fetching podcast data:', this.getParams().podcastId, err);
			});
	},

	navToEpisode(argument) {
		console.log('TODO: Navigate to episode');
	},

	render() {
		var episodes = this.state.episodes.map(episode => {
			return (
				<tr>
					<td>
						<a href="#" onClick={this.navToEpisode}>{episode.title}</a>
					</td>
					<td>{episode.publishedDate}</td>
				</tr>
			);
		});

		return (
			<div className="row">
				<PodcastSidebar podcast={this.state.podcast} />
				
				<div className="col-md-8 col-md-offset-1 section">
					<div className="podcast-episodes">
						<table className="table table-hover table-striped">
							<thead>
								<tr>
									<th>Title</th>
									<th>Date</th>
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
