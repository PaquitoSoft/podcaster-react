import lscache from 'lscache';

let _xmlParser = new DOMParser();

function checkResponseStatus(res) {
	if (res.status < 400) {
		return res;
	} else {
		let error = new Error(res.statusText);
		error.statusCode = res.status;
		error.response = res;
		throw error;
	}
}

function xmlParser(res) {
	return new Promise((resolve) => {
		res.text().then(text => {
			resolve({
				result: _xmlParser.parseFromString(text, 'application/xml'),
				url: res.url
			});
		});
	});
}

function parseJson(res) {
	return new Promise((resolve) => {
		res.json().then(data => {
			resolve({
				result: data,
				url: res.url
			});
		});
	});
}

function cacheResponse(shouldCache, ttl, key) {
	return (data) => {
		if (shouldCache) {
			console.log('Ajax::cacheResponse# Caching response with key:', key, 'for', ttl, 'minutes.');
			lscache.set(data.url, data.result, ttl); // Last parameter is TTL in minutes
		}
		return data.result;
	}
}

function getData(url, responseParser, options = {cache: false}) {
	let data = lscache.get(url);
	if (data) {
		return Promise.resolve(data);
	} else {
		return fetch(url)
			.then(checkResponseStatus)
			.then(responseParser)
			.then(cacheResponse(options.cache, options.ttl, url));
	}
}

export function getJson(url, options = {cache: false}) {
	return getData(url, parseJson, options);
}

export function getXml(url, options = {cache: false}) {
	return getData(url, xmlParser, options);
}
