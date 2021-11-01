import { gql } from '@apollo/client';
import { CharacterEntityApi } from './character-collection.api-model';
import { gqlClient } from 'core/graphql';

const repoQuery = gql`
  query {
    characters(page: 1) {
      results {
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
  }
`;

export const getCharacterCollection = async (): Promise<
  CharacterEntityApi[]
> => {
  return gqlClient
    .query({
      query: repoQuery,
    })
    .then((response) => {
      return response.data.characters.results;
    });
};
