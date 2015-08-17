import { Link } from 'react-router';

class CustomLink extends Link {

	handleClick(event) {
		event.isNavigationEvent = true;
		super.handleClick(event);
	}
	
}

export default CustomLink;
