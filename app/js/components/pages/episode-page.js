import { BasePage } from 'ps-ractive-router';
import Template from '../../views/pages/episode-page.html';
import PodcastSidebar from '../partials/podcast-sidebar';

let EpisodePage = BasePage.extend({
	name: 'EpisodePage',
	template: Template,
	components: {
		PodcastSidebar: PodcastSidebar
	},
	onRequestDone: function(request) {
		this.set({
			podcast: request.locals.podcast,
			episode: request.locals.episode
		})
	},
});

export default EpisodePage;
