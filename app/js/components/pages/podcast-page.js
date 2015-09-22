import { BasePage, RouterManager } from 'ps-ractive-router';
import Template from '../../views/pages/podcast-page.html';
import PodcastSidebar from '../partials/podcast-sidebar';

let PodcastPage = BasePage.extend({
	name: 'PodcastPage',
	template: Template,
	components: {
		PodcastSidebar: PodcastSidebar
	},
	onRequestDone: function(request) {
		this.set('podcast', request.locals.podcast);
	},
	events: {
		navToEpisode: function(event) {
			event.original.preventDefault();
			RouterManager.navTo(event.node.getAttribute('href'), {
				podcast: this.get('podcast'),
				episode: event.context
			});
		}
	}
});

export default PodcastPage;
