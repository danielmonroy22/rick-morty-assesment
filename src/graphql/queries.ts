import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query {
    characters(page: 3) {
      results {
        id
        name
        species
        image
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query GetCharacter($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        species
        image
      }
    }
  }
`;

