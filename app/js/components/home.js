import React from 'react';
import classNames from 'classnames';
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

	changeOrder(newOrder) {
		if (newOrder !== this.state.order) {

		}
	},

	getFilterButtonClassNames(buttonType) {
		// https://facebook.github.io/react/docs/class-name-manipulation.html
		// https://github.com/JedWatson/classnames
		return classNames('btn', 'btn-default', 'btn-lg', buttonType, {active: this.state.order === buttonType});
	},

	render() {
		let podcasts = this.state.filteredPodcasts.map(function (podcast, index) {
			return <PodcastSummary podcast={podcast} key={index} />;
		}, this);

		return (
			<div className="podcasts-grid">

				<div className="row filter">
					<div className="col-md-5">
						<button type="button" onClick={this.changeOrder('last-updated')} className={this.getFilterButtonClassNames('last-updated')} >Last updated</button>
						<button type="button" onClick={this.changeOrder('favorites')} className={this.getFilterButtonClassNames('favorites')} >Favorites</button>
					</div>
					<div className="col-md-5 col-md-offset-2">
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