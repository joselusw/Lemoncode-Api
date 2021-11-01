import { Character } from './character.api-model';

export const getCharacter = async (id: string): Promise<Character> => {
  const axios = require('axios').default;
  return axios
    .get(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => {
      return response.data;
    });
};

export const saveCharacter = async (character: Character): Promise<boolean> => {
  return true;
};
