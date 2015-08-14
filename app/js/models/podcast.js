import * as ajax from '../plugins/ajax';

const PODCASTS_DATASOURCE_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

class Podcast {

	constructor(rawData) {
		this.id = rawData.id.attributes['im:id'];
		this.name = rawData['im:name'].label;
		this.author = rawData['im:artist'].label;
		this.description = rawData.summary ? rawData.summary.label : '';
		if (rawData['im:releaseDate']) {
			this.releaseDate = rawData['im:releaseDate'].attributes.label; // rawData['im:releaseDate'].label => zulu date
		}
		this.cover = rawData['im:image'].filter((imageData) => {
			return imageData.attributes.height === '170';
		})[0].label;
		
		this.episodes = [];
	}

	static findAll() {
		return new Promise((resolve, reject) => {
			ajax.getJson(PODCASTS_DATASOURCE_URL)
				.then(function onSuccess(data) {
					console.info('PodcastModel::findAll# Raw response:', data);
					resolve(data.feed.entry.map((raw) => {
						return new Podcast(raw);
					}));
				}, reject);
		});
		
	}

}

export default Podcast;