import React from 'react';
import PodcastSummary from './podcast-summary';
import PodcastModel from '../models/podcast';

let Home = React.createClass({

	getInitialState() {
		console.info('Home initial state...');
	    // return {
	    //     podcasts: [
	    //     	{
	    //     		name: 'Clublife by Tiësto',
	    //     		author: 'Tiësto',
	    //     		cover: '//is1.mzstatic.com/image/pf/us/r30/Podcasts7/v4/35/9b/3c/359b3c22-c998-1d0b-8992-5039d4df2745/mza_8771822632600780533.170x170-75.jpg',
	    //     		episodes: [1,2,3,4,5]
	    //     	}
	    //     ]  
	    // };

	    PodcastModel.findAll().
			then((podcasts) => {
				this.setState({
					podcasts: podcasts
				});
			},
			(err) => {
				console.warn('Error fetching podcasts:', err);
			});
		return { podcasts: [] };
	},

	init() {
		console.info('Home init...');
		PodcastModel.findAll().
			then((podcasts) => {
				this.setState({
					podcasts: podcasts
				});
			},
			(err) => {
				console.warn('Error fetching podcasts:', err);
			});
	},

	render() {
		console.info('Home render...');
		let podcasts = this.state.podcasts.map(function (podcast) {
			return <PodcastSummary podcast={podcast} />;
		});
		return (
			<div className="podcasts-grid">

				<div className="row filter">
					<div className="col-md-5 col-md-offset-7">						
						<input id="filter" type="text" className="form-control input-lg" placeholder="Filter podcasts..." />
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