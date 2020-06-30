const { gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  input RegisterUser {
    name: String
    email: String
    password: String
  }

  input LoginUser {
    email: String
    password: String
  }

  type User {
    id: ID!
    name: String
    email: String
    password: String
    access_token: String
    errorCode: String
    message: String
  }

  extend type Mutation {
    register(user: RegisterUser): User
    login(user: LoginUser): User
  }
`;

const resolvers = {
  Mutation: {
    register: async (_, args) => {
      console.log(args.user);
      try {
        const response = await axios.post(
          "http://localhost:3001/register",
          args.user
        );
        return { access_token: response.data.access_token };
      } catch (err) {
        return err.response.data;
      }
    },
    login: async (_, args, context) => {
      console.log(args.user, "<<<<");
      try {
        const response = await axios.post(
          `http://localhost:3001/login`,
          args.user
        );
        console.log(response.data.access_token, ">>>>>>>");
        return response.data;
      } catch (err) {
        return err.response.data;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
