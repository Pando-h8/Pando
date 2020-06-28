const { gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  input inputUser {
    name: String
    email: String
    password: String
  }

  type User {
    id: ID!
    name: String
    email: String
    password: String
    access_token: String
  }

  extend type Mutation {
    register(user: inputUser): User 
    login(user: inputUser): User 
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
        return { access_token : response.data.access_token};
      } catch (err) {
        return err;
      }
    },
    login: async (_, args, context) => {
      console.log(args.user);
      try {
        const response = await axios.post(
          `http://localhost:3001/login`,
          args.user
        );
        console.log(response.data.access_token);
        return response.data;
      } catch (err) {
        return err;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
