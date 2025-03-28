import type { Kitsu, kitsuList } from './kitsu';

export interface KitsuState {
  items: Kitsu[];
  countAllItem: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  limiteParPage: number;
  searchQuery: string;
  sortBy:
    | '-averageRating'
    | '-popularity'
    | '-rating'
    | '-ratingRank'
    | '-startDate'
    | '-endDate'
    | '-episodeCount';
}

export type { Kitsu, kitsuList };
