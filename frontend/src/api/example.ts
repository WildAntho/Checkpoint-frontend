// put your GraphQL requests here (in one file or different ones)
import { gql } from "@apollo/client";

export const COUNTRY_QUERY = gql`
  query GetCountries {
    countries {
      id
      code
      name
      emoji
      continent {
        id
        name
      }
    }
  }
`;

export const CREATE_COUNTRY = gql`
  mutation CreateCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      id
    }
  }
`;

export const CONTINENT_QUERY = gql`
  query GetContinent {
    continents {
      id
      name
    }
  }
`;
