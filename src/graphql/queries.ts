import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query {
    characters(page: 1) {
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

export const GET_CHARACTER_BY_ID = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      origin {
        name
      }
      location {
        name
      }
    }
  }
`;


