import Ractive from 'ractive';
import Template from '../../views/partials/podcast-sidebar.html';

let PodcastSidebar = Ractive.extend({
	isolated: true,
	template: Template
});

export default PodcastSidebar;
