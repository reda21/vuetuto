import { Data } from './data';
import type { Kitsu } from '~/types/kitsu';

/* User is a class that extends Data and has a method called pluckUsername that returns an array of
strings. */
export class Anime extends Data<Kitsu> {
  /**
   * Méthode pour récupérer tous les titres principaux (canonicalTitle) des animes.
   * @returns Un tableau contenant tous les titres principaux des animes.
   */
  getAllTitles(): string[] {
    return this._items.map((item) => item.attributes.canonicalTitle);
  }

  /**
   * Méthode pour rechercher des animes par type.
   * @param {string} type - Le type d'anime à rechercher (ex. "tv", "movie").
   * @returns Une liste des animes correspondant au type.
   */
  findByType(type: string): Kitsu[] {
    return this._items.filter((item) => item.type === type);
  }

  /**
   * Méthode pour récupérer les posters d'anime.
   * @returns Un tableau des URLs des posters.
   */
  getPosterImages(): string[] {
    return this._items.map((item) => item.attributes.posterImage.original);
  }
}

//export type { UserType }
