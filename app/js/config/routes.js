/*
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
		<DefaultRoute name="home" handler={Home} />
	</Route>
);
*/

import HomePage from '../components/pages/home-page';
import PodcastPage from '../components/pages/podcast-page';
import EpisodePage from '../components/pages/episode-page';

import PodcastModel from '../models/podcast';

var routes = {
	'/': function homeController(context, next) {
		PodcastModel.findAll()
			.then(data => {
				next(null, HomePage, {
					podcasts: data
				});
			})
			.catch(err => {
				// err.displayMessage = 'Could not load podcasts.';
				next(err);
			});
	},
	'/podcast/:podcastId': function podcastController(context, next) {
		PodcastModel.findById(context.params.podcastId)
			.then(data => {
				next(null, PodcastPage, {
					podcast: data
				});
			})
			.catch(err => {
				next(err);
			});
	},
	'/podcast/:podcastId/episode/:episodeId': function episodeController(context, next) {
		console.log('Contexto para el acceso al detalle de un episodio:', context);
		// When loading the page in this route we need to fetch the data
		if (!context.state.episode) {
			PodcastModel.findById(context.params.podcastId)
				.then(podcast => {
					next(null, EpisodePage, {
						podcast: podcast,
						episode: podcast.episodes.filter(ep => {
							return ep.id === context.params.episodeId;
						})[0]
					});
				})
				.catch(err => next(err));
		} else {
			next(null, EpisodePage);
		}
	}
};

export default routes;
