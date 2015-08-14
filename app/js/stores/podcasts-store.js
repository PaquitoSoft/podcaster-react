import * as ajax from '../plugins/ajax';
import PodcastModel from '../models/podcast';

const PODCASTS_DATASOURCE_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=10/genre=1310/json';
const PODCAST_ID_DATASOURCE_URL = 'https://itunes.apple.com/lookup?id=';

var _podcasts = [];

function fetchPodcastFeedUrl(podcastId) {
	return new Promise((resolve, reject) => {
		ajax.getJson(`${PODCAST_ID_DATASOURCE_URL}${podcastId}`)
			then(data => {
				if (data.resultsCount) {
					resolve(data.results[0].feedUrl);
				} else {
					reject(new Error('No feed Url found for podcast: ' + podcastId));
				}
			})
			.catch(reject);
	});
}

function findPodcastEpisodes(podcastFeedUrl) {
	return new Promise((resolve, reject) => {
		ajax.getXml(podcastFeedUrl)
			.then(data => {
				// TODO Parse feed
				resolve(data);
			})
			.catch(reject);
	});
}

let PodcastsStore = {

	findAll() {
		if (_podcasts.length) {
			return Promise.resolve(_podcasts);
		} else {
			return new Promise((resolve, reject) => {
				ajax.getJson(PODCASTS_DATASOURCE_URL)
					.then(function onSuccess(data) {
						console.info('PodcastModel::findAll# Raw response:', data);
						resolve(data.feed.entry.map((raw) => {
							return new PodcastModel(raw);
						}));
					}, reject);
			});	
		}
	},

	findById(podcastId) {
		return new Promise((resolve, reject) => {
			this.findAll()
				.then(podcasts => {
					let podcast = podcasts.filter(pod => {
						return podcastId === pod.id;
					});
					if (podcast.length) {
						resolve(podcast[0]);
					} else {
						reject(new Error('Podcast not found: ' + podcastId));
					}
				})
				.catch(reject);
		});
	}

}

export default PodcastsStore;
