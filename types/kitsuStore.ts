import type { Kitsu , kitsuList } from "./kitsu";

export interface KitsuState {
  items: Kitsu[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  limiteParPage: number;
  searchQuery: string;
  sortBy: "popularity" | "rating";
}

export type { Kitsu, kitsuList }
