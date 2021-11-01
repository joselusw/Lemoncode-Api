import axios from 'axios';
import { CharacterEntityApi } from './character-collection.api-model';

export const getCharacterCollection = async (): Promise<
  CharacterEntityApi[]
> => {
  return fetch(`https://rickandmortyapi.com/api/character`).then((response) =>
    response.json().then((json) => json.results)
  );
};
