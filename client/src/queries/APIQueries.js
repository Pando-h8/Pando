import { gql } from "apollo-boost";

export const GET_PLANTS = gql`
  query getTanamans {
    getTanamans {
      id
      nama
      umur
      gambar
      growth_rate
      resistance
    }
  }
`;

export const GET_PLANT_BY_ID = gql`
  query getTanaman($id: ID!) {
    getTanaman(id: $id) {
      id
      nama
      umur
      gambar
      growth_rate
      resistance
    }
  }
`;
