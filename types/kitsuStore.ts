import type { kitsu, kitsuList } from "./kitsu";

export interface KitsuState {
  items: kitsu[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  limiteParPage: number;
  searchQuery: string;
  sortBy: "popularity" | "rating";
}

export type { kitsu, kitsuList }
