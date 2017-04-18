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
					'page[offset]': pageOffset,
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
					'page[offset]': pageOffset,
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

	searchCharacters(searchArgs, pageOffset = 0) {
		return new Promise((resolve, reject) => {
			this.axios({
				url: '/characters',
				params: {
					'filter[name]': searchArgs,
					'page[offset]': pageOffset,
				},
			}).then(response =>
				resolve(response.data.data.map(character => new Character(character.id, character.attributes)))
			).catch(error => reject(error));
		})
	}

	getCharacter(characterID) {
		return new Promise((resolve, reject) => {
			this.axios({
				url: `/characters/${characterID}`,
			}).then(response => {
				const character = response.data.data;
				resolve(new Character(character.id, character.attributes));
			}).catch(error => reject(error));
		})
	}

	searchUsers(searchArgs, pageLimit = 0) {
		return new Promise((resolve, reject) => {
			this.axios({
				url: '/users',
				params: {
					'filter[query]': searchArgs,
					'page[limit]': pageLimit,
				},
			}).then(response => {
				resolve(response.data.data.map(user => new User(user.id, user.attributes)))
			}).catch(error => reject(error));
		})
	}

	getUser(userID) {
		return new Promise((resolve, reject) => {
			this.axios({
				url: `/users/${userID}`,
			}).then(response => {
				const user = response.data.data;
				resolve(new User(user.id, user.attributes));
			}).catch(error => reject(error));
		})
	}
}

module.exports = Kitsu;