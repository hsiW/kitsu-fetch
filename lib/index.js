const axios = require('axios'),
	Anime = require('./Anime'),
	Character = require('./Character'),
	Drama = require('./Drama'),
	Manga = require('./Manga'),
	User = require('./User');

class Kitsu {
	constructor() {
		this.axios = axios.create({
			baseURL: 'https://kitsu.io/api/edge/',
			method: 'get',
			headers: {
				'Accept': 'application/vnd.api+json',
				'Content-Type': ' application/vnd.api+json',
			},
		});
	}

	searchAnime(searchArgs, pageOffset = 0) {
		return new Promise((resolve, reject) => {
			this.axios({
				url: '/anime',
				params: {
					'filter[text]': searchArgs,
					'page[offset]': (pageOffset.toString() ? pageOffset : '0'),
				},
			}).then(response => {
				const formatedAnime = response.data.data.map(anime => new Anime(anime.id, anime.attributes));
				resolve(formatedAnime);
			}).catch(error => reject(error));
		})
	}

	getAnime(animeID) {
		return new Promise((resolve, reject) => {
			this.axios({
					url: `/anime/${animeID}`,
				})
				.then(response => {
					const anime = response.data.data,
						formatedAnime = new Anime(anime.id, anime.attributes);
					resolve(formatedAnime);
				})
				.catch(error => reject(error));
		})
	}
}

module.exports = Kitsu;