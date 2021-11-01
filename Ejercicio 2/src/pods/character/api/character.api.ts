import Axios from 'axios';
import { Character } from './character.api-model';

const characterListUrl = '/api/characters';
const cityListUrl = '/api/cities';

export const getCharacter = async (id: string): Promise<Character> => {
  const { data } = await Axios.get<Character>(`${characterListUrl}/${id}`);

  return data;
};

export const saveCharacter = async (character: Character): Promise<boolean> => {
  if (character.id) {
    await Axios.put<Character>(
      `${characterListUrl}/${character.id}`,
      character
    );
  } else {
    await Axios.post<Character>(characterListUrl, character);
  }
  return true;
};
