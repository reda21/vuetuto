// repositories/UserRepository.js
import BaseRepository from './baseRepository';
import type { Kitsu } from '@/types/kitsu';

export class AnimeRepository extends BaseRepository<Kitsu> {
  constructor() {
    super('https://kitsu.io/api/edge/anime');
  }

 /* async getActiveUsers(): Promise<Kitsu[]> {
    return await $fetch<Kitsu[]>(`${this.resource}/active`);
  } */
}