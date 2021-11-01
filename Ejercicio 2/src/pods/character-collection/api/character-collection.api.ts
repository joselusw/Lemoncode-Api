import Axios from 'axios';
import { CharacterEntityApi } from './character-collection.api-model';

const url = '/api/characters';

export const getCharacterCollection = async (): Promise<
  CharacterEntityApi[]
> => {
  const { data } = await Axios.get<CharacterEntityApi[]>(url);

  return data;
};

// json-server delete issue: It deletes all collection instead of single one.
// https://github.com/typicode/json-server/issues/760
export const deleteCharacter = async (id: string): Promise<boolean> => {
  await Axios.delete(`${url}/${id}`);
  return true;
};
