import { gql } from "apollo-boost";

export const REGISTER = gql`
  mutation register($name: String, $email: String, $password: String) {
    register(user: { name: $name, email: $email, password: $password }) {
      access_token
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String, $password: String) {
    login(user: { email: $email, password: $password }) {
      access_token
    }
  }
`;
