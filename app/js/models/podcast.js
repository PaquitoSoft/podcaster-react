class Podcast {

	constructor(rawData) {
		if (rawData) {
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
		} else {
			this.id = '';
		}
		
		this.episodes = [];
	}

}

export default Podcast;