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
	onRequestDone(request) {
		let podcastsOrder = lscache.get('podcast-order') || 'last-updated';
		this.originalPodcasts = request.locals.podcasts;
		this.originalPodcasts = this.updatePodcastsOrder(podcastsOrder, request.locals.podcasts);
		this.set({
			filter: '',
			podcasts: this.originalPodcasts,
			order: podcastsOrder
		});
	},
	updatePodcastsOrder(orderKey, podcasts) {
		let property = (orderKey === 'last-updated') ? 'lastEpisodeDate' : 'isFavorite';

		return podcasts.sort((a, b) => {
			return (+b[property]) - (+a[property]);
		});
	},
	events: {
		filterPodcasts(event) {
			let regExp = new RegExp(event.context.filter, 'i'),
				podcasts = this.updatePodcastsOrder(this.get('order'), this.originalPodcasts);
			
			this.set('podcasts',
				podcasts.filter(podcast => {
					return regExp.test(podcast.name + podcast.author);
				})
			);
		},
		changeOrder(event, newOrder, forceChange) {
			if (newOrder !== this.get('order') || forceChange) {
				this.set({
					order: newOrder,
					filteredPodcasts: this.updatePodcastsOrder(newOrder, this.get('podcasts'))
				});
				lscache.set('podcast-order', newOrder);
			}
		}
	}
});

export default HomePage;
