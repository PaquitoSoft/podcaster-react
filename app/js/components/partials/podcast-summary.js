import Ractive from 'ractive';
import Template from '../../views/partials/podcast-summary.html';

let PodcastSummary = Ractive.extend({
	isolated: true,
	template: Template
});

export default PodcastSummary;
