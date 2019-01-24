const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const Anime = require('./Anime');
const Character = require('./Character');
const Manga = require('./Manga');
const User = require('./User');

module.exports = class Kitsu {
	constructor() {
		this.baseURL = 'https://kitsu.io/api/edge';

		this.options = {
			method: 'GET',
			headers: {
				'Accept': 'application/vnd.api+json',
				'Content-Type': 'application/vnd.api+json',
			},
		};
	}

	async searchAnime(searchArgs, pageOffset = 0) {
		const params = new URLSearchParams({ 'filter[text]': searchArgs, 'page[offset]': pageOffset });

		return (await (await fetch(`${this.baseURL}/anime?${params.toString()}`,
			this.options
		)).json()).data.map(anime => new Anime(anime.id, anime.attributes));
	}

	async getAnime(animeID) {
		const anime = (await (await fetch(`${this.baseURL}/anime/${animeID}`)).json()).data;

		return new Anime(anime.id, anime.attributes);
	}

	async searchManga(searchArgs, pageOffset = 0) {
		const params = new URLSearchParams({ 'filter[text]': searchArgs, 'page[offset]': pageOffset });

		return (await (await fetch(`${this.baseURL}/manga?${params.toString()}`,
			this.options
		)).json()).data.map(manga => new Manga(manga.id, manga.attributes));
	}

	async getManga(mangaID) {
		const manga = (await (await fetch(`${this.baseURL}/manga/${mangaID}`)).json()).data;

		return new Manga(manga.id, manga.attributes);
	}

	async searchCharacters(searchArgs, pageOffset = 0) {
		const params = new URLSearchParams({ 'filter[name]': searchArgs, 'page[offset]': pageOffset });

		return (await (await fetch(`${this.baseURL}/characters?${params.toString()}`,
			this.options
		)).json()).data.map(character => new Character(character.id, character.attributes));
	}

	async getCharacter(characterID) {
		const character = (await (await fetch(`${this.baseURL}/characters/${characterID}`)).json()).data;

		return new Character(character.id, character.attributes);
	}

	async searchUsers(searchArgs) {
		const params = new URLSearchParams({ 'filter[name]': searchArgs });

		return (await (await fetch(`${this.baseURL}/users?${params.toString()}`,
			this.options
		)).json()).data.map(user => new User(user.id, user.attributes));
	}

	async getUser(userID) {
		const user = (await (await fetch(`${this.baseURL}/users/${userID}`)).json()).data;

		return new User(user.id, user.attributes);
	}
}
