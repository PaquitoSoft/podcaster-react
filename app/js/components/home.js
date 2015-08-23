import React from 'react';
import lscache from 'lscache';
import PodcastSummary from './podcast-summary';
import PodcastModel from '../models/podcast';

let Home = React.createClass({

	statics: {
		fetchData() {
			return PodcastModel.findAll();	
		}
	},

	getInitialState() {
		this.originalPodcasts = this.props.data.home.sort((a, b) => {
			return b.lastEpisodeDate - a.lastEpisodeDate;
		});
		return { 
			filter: '',
			filteredPodcasts: this.originalPodcasts,
			order: lscache.get('podcast-order') || 'last-updated'
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

	changeOrder(newOrder, forceChange) {
		let property = (newOrder === 'last-updated') ? 'lastEpisodeDate' : 'isFavorite';

		if (newOrder !== this.state.order || forceChange) {
			this.setState({
				order: newOrder,
				filteredPodcasts: this.state.filteredPodcasts.sort((a, b) => {
					return (+b[property]) - (+a[property]);
				})
			});
			lscache.set('podcast-order', newOrder);
		}
	},

	orderByLastUpdatedchangeOrder() {
		this.changeOrder('last-updated');
	},

	orderByFavorites() {
		this.changeOrder('favorites');
	},

	getFilterButtonClassNames(buttonType) {
		return `btn btn-lg ${buttonType} ${(this.state.order === buttonType ? 'btn-primary' : 'btn-default')}`;
	},

	componentWillMount() {
		this.changeOrder(this.state.order, true);
	},

	render() {
		let podcasts = this.state.filteredPodcasts.map(function (podcast, index) {
			return <PodcastSummary podcast={podcast} key={index} />;
		}, this);

		return (
			<div className="podcasts-grid">

				<div className="row filter">
					<div className="col-md-5">
						<button type="button" onClick={this.orderByLastUpdatedchangeOrder} className={this.getFilterButtonClassNames('last-updated')} >Last updated</button>
						<button type="button" onClick={this.orderByFavorites} className={this.getFilterButtonClassNames('favorites')} >Favorites</button>
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