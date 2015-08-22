import lscache from 'lscache';
import * as ajax from '../plugins/ajax';

const PODCASTS_DATASOURCE_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
const PODCAST_ID_DATASOURCE_URL = 'https://itunes.apple.com/lookup?id=';
const PODCAST_CACHE_PREFIX = 'podcast-data_';
const CORS_SERVICE_URL = 'http://crossorigin.me/';
// const CORS_SERVICE_URL = 'http://atcors.herokuapp.com/';
const FAVORITES_SERVICE_URL = 'https://ps-podcaster.firebaseio.com/favorites.json';

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
						date: pubDate ? new Date(pubDate.textContent).toLocaleDateString() : '',
						timestamp: pubDate ? (new Date(pubDate.textContent)).getTime() : 0,
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

function createModels(rawPodcastData) {
	return Promise.resolve(rawPodcastData.feed.entry.map(raw => {
		return new Podcast(raw);
	}));
}

function processFavoritePodcasts(podcasts) {
	return new Promise((resolve, reject) => {
		ajax.getJson(FAVORITES_SERVICE_URL)
			.then((favoritePodcasts) => {
				let _favoritePodcasts = favoritePodcasts || [];
				// TODO Mark favorite podcasts
				return resolve(podcasts.map(podcast => {
					podcast.isFavorite = _favoritePodcasts.indexOf(podcast.id) !== -1;
					return podcast;
				}));
			})
			.catch(reject);
	});
}

function saveFavoritePodcast(podcast) {
	return new Promise((resolve, reject) => {
		ajax.getJson(FAVORITES_SERVICE_URL).
			then((favoritePodcasts) => {
				let _favoritePodcasts = favoritePodcasts || [],
					podcastIndex = _favoritePodcasts.indexOf(podcast.id),
					originalLength = _favoritePodcasts.length;

				if (podcast.isFavorite && podcastIndex === -1) {
					_favoritePodcasts.push(podcast.id);
				} else if (!podcast.isFavorite && podcastIndex !== -1) {
					_favoritePodcasts.splice(podcastIndex, 1);
				}

				if (_favoritePodcasts.length !== originalLength) {
					ajax.putJson(FAVORITES_SERVICE_URL, _favoritePodcasts)
						.then(() => {
							resolve(podcast);
						})
						.catch(reject);
				} else {
					resolve(podcast);	
				}
			})
			.catch(reject);
	});
}


class Podcast {

	constructor(rawData) {
		if (rawData) {
			this.id = rawData.id.attributes['im:id'];
			this.name = rawData['im:name'].label;
			this.author = rawData['im:artist'].label;
			this.description = rawData.summary ? rawData.summary.label : '';
			if (rawData['im:releaseDate']) {
				this.releaseDate = rawData['im:releaseDate'].attributes.label; // rawData['im:releaseDate'].label => zulu date
				this.lastEpisodeDate = (new Date(rawData['im:releaseDate'].label)).getTime();
			}
			this.cover = rawData['im:image'].filter((imageData) => {
				return imageData.attributes.height === '170';
			})[0].label;	
		} else {
			this.id = '';
		}
		
		this.episodes = [];
	}

	toggleFavorite() {
		this.isFavorite = !this.isFavorite;
		return saveFavoritePodcast(this);
	}


	static findAll() {
		// return new Promise((resolve, reject) => {
		// 	ajax.getJson(PODCASTS_DATASOURCE_URL, { ttl: PODCASTS_LIST_CACHE_TTL })
		// 		.then(function onSuccess(data) {
		// 			resolve(data.feed.entry.map(raw => {
		// 				return new PodcastModel(raw);
		// 			}));
		// 		}, reject);
		// });

		return ajax.getJson(PODCASTS_DATASOURCE_URL, { ttl: PODCASTS_LIST_CACHE_TTL })
				.then(createModels)
				.then(processFavoritePodcasts);
	}

	static findById(podcastId) {
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

export default Podcast;