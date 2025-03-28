import { test, describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAnimeStore } from "../../stores/animes";
import type { Kitsu } from "../../types/kitsuStore.ts";
import data from "./data.json";

interface Anime extends Kitsu {}

function parseAnime(data: any[]): Anime[] {
	return data.map((item) => ({
		...item,
		attributes: {
			...item.attributes,
			createdAt: new Date(item.attributes.createdAt),
			updatedAt: new Date(item.attributes.updatedAt),
		},
	}));
}

const animes: Anime[] = parseAnime(data);

describe("Counter Store", () => {
	let animeStore: ReturnType<typeof useAnimeStore>;

	beforeEach(() => {
		// Crée une nouvelle instance de Pinia avant chaque test
		setActivePinia(createPinia());
		animeStore = useAnimeStore();
	});

	it("initializes with a count list items of 0", () => {
		expect(animeStore.items.length).toBe(0);
	});

	it("adds an anime to the store", () => {
		animeStore.addAnime(animes[0]);
		expect(animeStore.items.length).toBe(1);
		expect(animeStore.items[0]).toEqual(animes[0]);
	});

	it("removes an anime from the store", () => {
		animeStore.addAnime(animes[0]);
		animeStore.removeAnime(animes[0].id);
		expect(animeStore.items.length).toBe(0);
	});

	it("checks if an anime is in the store", () => {
		animeStore.addAnime(animes[0]);
		expect(animeStore.isAnimeInStore(animes[0].id)).toBe(true);
		expect(animeStore.isAnimeInStore(animes[1].id)).toBe(false);
	});

	it("clears the store", () => {
		animeStore.addAnime(animes[0]);
		animeStore.clearStore();
		expect(animeStore.items.length).toBe(0);
	});

	it("returns the correct count of animes in the store", () => {
		animeStore.addAnime(animes[0]);
		animeStore.addAnime(animes[1]);
		expect(animeStore.count).toBe(2);
	});

	it("returns the correct anime by ID", () => {
		animeStore.addAnime(animes[0]);
		expect(animeStore.getAnimeById(animes[0].id)).toEqual(animes[0]);
		expect(animeStore.getAnimeById(animes[1].id)).toBeUndefined();
	});

	it("returns the correct anime by slug", () => {
		animeStore.addAnime(animes[0]);
		expect(animeStore.getAnimeBySlug(animes[0].attributes.slug)).toEqual(
			animes[0],
		);
		expect(
			animeStore.getAnimeBySlug(animes[1].attributes.slug),
		).toBeUndefined();
	});

	it("returns the correct anime by title", () => {
		animeStore.addAnime(animes[0]);
		expect(animeStore.getAnimeByTitle(animes[0].attributes.titles.en)).toEqual(
			animes[0],
		);
		expect(
			animeStore.getAnimeByTitle(animes[1].attributes.titles.en),
		).toBeUndefined();
		expect(true).toBe(true);
	});
});
