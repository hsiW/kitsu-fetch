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
					'page[offset]': pageOffset ? pageOffset : '0',
				},
			}).then(response =>
				resolve(response.data.data.map(anime => new Anime(anime.id, anime.attributes)))
			).catch(error => reject(error));
		})
	}

	getAnime(animeID) {
		return new Promise((resolve, reject) => {
			this.axios({
				url: `/anime/${animeID}`,
			}).then(response => {
				const anime = response.data.data;
				resolve(new Anime(anime.id, anime.attributes));
			}).catch(error => reject(error));
		})
	}

	searchManga(searchArgs, pageOffset = 0) {
		return new Promise((resolve, reject) => {
			this.axios({
				url: '/manga',
				params: {
					'filter[text]': searchArgs,
					'page[offset]': pageOffset ? pageOffset : '0',
				},
			}).then(response =>
				resolve(response.data.data.map(manga => new Manga(manga.id, manga.attributes)))
			).catch(error => reject(error));
		})
	}

	getManga(mangaID) {
		return new Promise((resolve, reject) => {
			this.axios({
				url: `/manga/${mangaID}`,
			}).then(response => {
				const manga = response.data.data;
				resolve(new Manga(manga.id, manga.attributes));
			}).catch(error => reject(error));
		})
	}
}

module.exports = Kitsu;