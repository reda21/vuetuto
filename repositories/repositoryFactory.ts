// repositories/RepositoryFactory.ts
import { AnimeRepository } from "./animeRepository";

export const repositories = {
  anime: new AnimeRepository(),
};

export const RepositoryFactory = {
  get: <T>(name: keyof typeof repositories): T => repositories[name] as T,
};


export {AnimeRepository}