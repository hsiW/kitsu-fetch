const axios = require('axios');
const Anime = require('./Anime');
const Character = require('./Character');
const Drama = require('./Drama');
const Manga = require('./Manga');
const User = require('./User');

module.exports = class Kitsu {
	constructor() {
		this.axios = axios.create({
			baseURL: 'https://kitsu.io/api/edge/',
			method: 'get',
			headers: {
				'Accept': 'application/vnd.api+json',
				'Content-Type': 'application/vnd.api+json',
			},
		});
	}

	async searchAnime(searchArgs, pageOffset = 0) {
		return (await this.axios({
			url: '/anime',
			params: {
				'filter[text]': searchArgs,
				'page[offset]': pageOffset,
			},
		})).data.data.map(anime => new Anime(anime.id, anime.attributes));
	}

	async getAnime(animeID) {
		const anime = await this.axios({ url: `/anime/${animeID}` }).data.data;

		return new Anime(anime.id, anime.attributes);
	}

	async searchManga(searchArgs, pageOffset = 0) {
		return (await this.axios({
			url: '/manga',
			params: {
				'filter[text]': searchArgs,
				'page[offset]': pageOffset,
			},
		})).data.data.map(manga => new Manga(manga.id, manga.attributes));
	}

	async getManga(mangaID) {
		const manga = await this.axios({ url: `/manga/${mangaID}` }).data.data;

		return new Manga(manga.id, manga.attributes);
	}

	async searchDrama(searchArgs, pageOffset = 0) {
		return (await this.axios({
			url: '/dramas',
			params: {
				'filter[text]': searchArgs,
				'page[offset]': pageOffset,
			},
		})).data.data.map(drama => new Drama(drama.id, drama.attributes));
	}

	async getDrama(dramaID) {
		const drama = await this.axios({ url: `/drama/${dramaID}` }).data.data;

		return new Drama(drama.id, drama.attributes);
	}

	async searchCharacters(searchArgs, pageOffset = 0) {
		return (await this.axios({
			url: '/characters',
			params: {
				'filter[name]': searchArgs,
				'page[offset]': pageOffset,
			},
		})).data.data.map(character => new Character(character.id, character.attributes));
	}

	async getCharacter(characterID) {
		const character = await this.axios({ url: `/characters/${characterID}` }).data.data;

		return new Character(character.id, character.attributes);
	}

	async searchUsers(searchArgs) {
		return (await this.axios({
			url: '/users',
			params: {
				'filter[name]': searchArgs,
			},
		})).data.data.map(user => new User(user.id, user.attributes));
	}

	async getUser(userID) {
		const character = await this.axios({ url: `/users/${userID}` }).data.data;

		return new User(user.id, use.attributes);
	}
}
