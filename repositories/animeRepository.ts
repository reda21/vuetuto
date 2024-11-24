// repositories/UserRepository.js
import BaseRepository from './baseRepository';
import type { Kitsu, kitsuList } from '@/types/kitsu';

type FetchContentsParams = {
  "page[number]"?: number;
  "page[size]"?: number;
  "page[offset]"?: string;
  "filter[text]"?: string;
};

export class AnimeRepository extends BaseRepository<Kitsu> {
  constructor() {
    super('https://kitsu.io/api/edge/anime');
  }

  async fetchContents(params: FetchContentsParams = {
    "page[number]": 1,
    "page[size]": 20,
    "page[offset]": "-average_rating",
  }){
    return await $fetch<kitsuList>(this.resource, { params });
  }

 /* async getActiveUsers(): Promise<Kitsu[]> {
    return await $fetch<Kitsu[]>(`${this.resource}/active`);
  } */
}