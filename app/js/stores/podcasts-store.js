import lscache from 'lscache';
import * as ajax from '../plugins/ajax';
import PodcastModel from '../models/podcast';

const PODCASTS_DATASOURCE_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
const PODCAST_ID_DATASOURCE_URL = 'https://itunes.apple.com/lookup?id=';
const PODCAST_CACHE_PREFIX = 'podcast-data_';
const CORS_SERVICE_URL = 'http://crossorigin.me/';
// const CORS_SERVICE_URL = 'http://atcors.herokuapp.com/';

const PODCASTS_LIST_CACHE_TTL = 1440; // minutes (one day)
const PODCAST_DETAIL_CACHE_TTL = 2880; // (two days)

function getPodcastLite(podcastId) {
	return new Promise((resolve, reject) => {
		PodcastsStore.findAll()
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

function fetchPodcastFeedUrl(podcast) {
	return new Promise((resolve, reject) => {
		ajax.getJsonp(`${PODCAST_ID_DATASOURCE_URL}${podcast.id}`)
			.then(data => {
				if (data.results.length) {
					podcast.feedUrl = data.results[0].feedUrl;
					resolve(podcast);
				} else {
					reject(new Error('No feed Url found for podcast: ' + podcast.id));
				}
			})
			.catch(reject);
	});
}

function fetchPodcastEpisodes(podcast) {
	return new Promise((resolve, reject) => {
		ajax.getXml(`${CORS_SERVICE_URL}${podcast.feedUrl}`)
			.then(podcastDoc => {
				// We need to get iTunes XML namespace for accessing episodes duration
				let itunesNS = podcastDoc.querySelector('rss').getAttribute('xmlns:itunes'),
					episodeIds = 0;

				// https://developer.mozilla.org/en/docs/Web/API/NodeList
				// [...podcastDoc.querySelectorAll('rss channel item')].forEach(p => {
				// 	console.log(p);
				// });
				// NodeList has been enhaced in app.js file
				podcast.episodes = podcastDoc.querySelectorAll('rss channel item').map(p => {
					let desc = p.querySelector('description'),
						pubDate = p.querySelector('pubDate'),
						duration = p.getElementsByTagNameNS(itunesNS, 'duration')[0],
						enclosure = p.querySelector('enclosure');
					
					return {
						id: `${podcast.id}_${episodeIds++}`,
						title: p.querySelector('title').textContent,
						description: desc ? desc.textContent : '',
						date: p.querySelector('pubDate') ? new Date(pubDate.textContent).toLocaleDateString() : '',
						// http://stackoverflow.com/questions/4288232/javascript-xml-parser-how-to-get-nodes-that-have-in-the-name
						duration: duration ? duration.textContent : '--',
						mediaUrl: enclosure ? enclosure.getAttribute('url') : ''
					};
				});

				resolve(podcast);
			})
			.catch(reject);
	});
}

let PodcastsStore = {

	findAll() {
		return new Promise((resolve, reject) => {
			ajax.getJson(PODCASTS_DATASOURCE_URL, { ttl: PODCASTS_LIST_CACHE_TTL })
				.then(function onSuccess(data) {
					resolve(data.feed.entry.map(raw => {
						return new PodcastModel(raw);
					}));
				}, reject);
		});
	},

	findById(podcastId) {
		let cacheKey = `${PODCAST_CACHE_PREFIX}${podcastId}`,
			podcast = lscache.get(cacheKey);

		if (podcast) {
			return Promise.resolve(podcast);
		} else {
			return new Promise((resolve, reject) => {
				getPodcastLite(podcastId)
					.then(fetchPodcastFeedUrl)
					.then(fetchPodcastEpisodes)
					.then(data => {
						lscache.set(cacheKey, data, PODCAST_DETAIL_CACHE_TTL);
						resolve(data);
					})
					.catch(reject);
			});
		}
	}

}

export default PodcastsStore;
