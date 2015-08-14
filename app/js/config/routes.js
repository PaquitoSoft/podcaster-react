import React from 'react';
import Main from '../components/main';
import Home from '../components/home';
import PodcastDetail from '../components/podcast-detail';
import EpisodeDetail from '../components/episode-detail';

import { Router, Route, DefaultRoute } from 'react-router';

export default (
	<Route name="app" path="/" handler={Main}>
		<Route name="podcast" path="podcast/:podcastId" handler={PodcastDetail} />
		<Route name="episode" path="podcast/:podcastId/episode/:episodeId" handler={EpisodeDetail} />
		<DefaultRoute handler={Home} />
	</Route>
);
