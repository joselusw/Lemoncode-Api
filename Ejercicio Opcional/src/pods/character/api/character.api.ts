import { gql } from '@apollo/client';
import { gqlClient } from 'core/graphql';
import { Character } from './character.api-model';

export const saveCharacter = async (character: Character): Promise<boolean> => {
  return true;
};

const repoQuery = gql`
  query ($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      created
    }
  }
`;

export const getCharacter = async (id: string): Promise<Character> => {
  return gqlClient
    .query({
      query: repoQuery,
      variables: { id },
    })
    .then((response) => {
      return response.data.character;
    });
};
