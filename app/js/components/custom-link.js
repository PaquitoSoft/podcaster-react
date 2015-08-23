import { Link } from 'react-router';

class CustomLink extends Link {

	handleClick(event) {
		// If I attach the property to the React event object,
		// then this property appears in events that don't go
		// over this function and I don't know why
		// This causes the loader to be shown when it shouldn't
		event.nativeEvent.isNavigationEvent = true;
		super.handleClick(event);
	}
	
}

export default CustomLink;
