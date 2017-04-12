class Manga {
	constructor(id, data) {
		this.id = id;

		this.type = data.mangaType;

		this.titles = {
			english: data.titles.en || null,
			romanji: data.titles.en_jp || null,
			canonical: data.canonicalTitle || null,
			abbrivated: data.abbrivatedTitles || [],
		}

		this.synopsis = data.synopsis || null;

		this.startDate = data.startDate || null;
		this.endDate = data.endDate || null;

		this.rating = parseFloat(data.averageRating) || null;

		this.images = {
			posterImage: data.posterImage || null,
			coverImage: data.coverImage || null,
		}
	}

	get url() {
		return `https://kitsu.io/anime/${this.id}/`
	}
}

module.exports = Manga;