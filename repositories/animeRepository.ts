// repositories/UserRepository.js
import BaseRepository from './baseRepository';
import type { Kitsu, kitsuList } from '@/types/kitsu';

type FetchContentsParams = {
  number?: number;
  size?: number;
  filter?: string | null;
  sort?: string;
};

export class AnimeRepository extends BaseRepository<Kitsu> {
  constructor() {
    super('https://kitsu.io/api/edge/anime');
  }

  async fetchContents({
    number = 1,
    size = 20,
    sort = '-episodeCount',
    filter,
  }: FetchContentsParams = {}) {
    const queryParams = {
      'page[number]': number,
      'page[size]': size,
      sort,
      'filter[text]': filter,
    };

    return await $fetch<kitsuList>(this.resource, { params: queryParams });
  }
}
