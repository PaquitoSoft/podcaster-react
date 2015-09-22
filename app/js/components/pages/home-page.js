import { BasePage } from 'ps-ractive-router';
import lscache from 'lscache';
import PodcastSummaryComponent from '../partials/podcast-summary';
import Template from '../../views/pages/home-page.html';

let HomePage = BasePage.extend({
	name: 'HomePage',
	template: Template,
	components: {
		PodcastSummary: PodcastSummaryComponent
	},
	onRequestDone: function(request) {
		this.originalPodcasts = request.locals.podcasts.sort((a, b) => {
			return b.lastEpisodeDate - a.lastEpisodeDate;
		});
		this.set({
			filter: '',
			podcasts: this.originalPodcasts,
			order: lscache.get('podcast-order') || 'last-updated'
		});
	}
});

export default HomePage;
