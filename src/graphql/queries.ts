import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($name: String, $status: String, $species: String, $gender: String) {
  characters(filter: { name: $name, status: $status, species: $species, gender: $gender }) {
    results {
      id
      name
      image
      species
      status
      gender
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


