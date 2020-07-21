import { gql } from "apollo-boost";

export const GET_USERS_PLANTS = gql`
  query getTanamanUser($access_token: String!) {
    getTanamanUser(access_token: $access_token) {
      id
      nama
      umur_sekarang
      terakhir_disiram
      form
      gambar
      resistance
    }
  }
`;

export const GET_USERS_PLANT_BY_ID = gql`
  query getTanamanUserById($id: ID!, $access_token: String!) {
    getTanamanUserById(id: $id, access_token: $access_token) {
      id
      nama
      umur_sekarang
      terakhir_disiram
      form
      resistance
      createdAt
    }
  }
`;

export const POST_USERS_PLANT = gql`
  mutation postTanamanUser(
    $access_token: String!
    $nama: String
    $umur_sekarang: Int
    $form: String
    $resistance: Int
    $gambar: String
  ) {
    postTanamanUser(
      tanamanUser: {
        access_token: $access_token
        data: {
          nama: $nama
          umur_sekarang: $umur_sekarang
          form: $form
          resistance: $resistance
          gambar: $gambar
        }
      }
    ) {
      id
      nama
      umur_sekarang
      terakhir_disiram
      resistance
      form
    }
  }
`;

export const PUT_USERS_PLANT = gql`
  mutation putTanamanUser(
    $id: ID!
    $access_token: String!
    $terakhir_disiram: String
    $umur_sekarang: Int
    $form: String
  ) {
    putTanamanUser(
      tanamanUser: {
        id: $id
        access_token: $access_token
        terakhir_disiram: $terakhir_disiram
        umur_sekarang: $umur_sekarang
        form: $form
      }
    ) {
      successCode
    }
  }
`;

export const DELETE_USERS_PLANT = gql`
  mutation deleteTanamanUser($id: ID!, $access_token: String!) {
    deleteTanamanUser(id: $id, access_token: $access_token) {
      successCode
    }
  }
`;
