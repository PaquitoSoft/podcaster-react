import React from 'react';
import PodcastSummary from './podcast-summary';
import PodcastsStore from '../stores/podcasts-store';

let Home = React.createClass({

	statics: {
		fetchData() {
			return PodcastsStore.findAll();	
		}
	},

	getInitialState() {
		this.originalPodcasts = this.props.data.home.sort((a, b) => {
			return b.lastEpisodeDate - a.lastEpisodeDate;
		});
		return { 
			filter: '',
			filteredPodcasts: this.originalPodcasts,
			order: 'last-updated'
		};
	},
	
	filterPodcasts(e) {
		var regExp = new RegExp(e.target.value, 'i');
		this.setState({
			filteredPodcasts: this.originalPodcasts.filter(podcast => {
				return regExp.test(podcast.name + podcast.author);
			})
		})
	},

	render() {
		let podcasts = this.state.filteredPodcasts.map(function (podcast, index) {
			return <PodcastSummary podcast={podcast} key={index} />;
		}, this);

		return (
			<div className="podcasts-grid">

				<div className="row filter">
					<div className="col-md-5 col-md-offset-7">
						<span className="badge">{this.state.filteredPodcasts.length}</span>
						<input id="filter" type="text" className="form-control input-lg" autoFocus 
							placeholder="Filter podcasts..." onChange={this.filterPodcasts} />
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<div className="row podcasts">
							{podcasts}
						</div>
					</div>
				</div>

			</div>
		);
	}
});

export default Home;