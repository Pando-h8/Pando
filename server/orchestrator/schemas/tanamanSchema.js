const { gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  input inputTanaman {
    nama: String
    umur_sekarang: Int
    form: String
  }

  input updateTanamanUser {
    id: ID!
    access_token: String
    data: inputTanaman
  }

  type TanamanUser {
    id: ID!
    nama: String
    umur_sekarang: Int
    terakhir_disiram: String
    form: String
  }

  type TanamanUserUD {
      successCode: String
  }

  input TanamanUserInput {
    access_token: String
    data: inputTanaman
  }

  extend type Query {
    getTanamanUser(access_token: String!): [TanamanUser]
    getTanamanUserById(id: ID!, access_token: String!): TanamanUser
  }

  extend type Mutation {
    postTanamanUser(tanamanUser: TanamanUserInput): TanamanUser
    putTanamanUser(tanamanUser: updateTanamanUser): TanamanUserUD
    deleteTanamanUser(id: ID!, access_token: String!): TanamanUserUD
  }
`;

const resolvers = {
  Query: {
    getTanamanUser: async (_, args) => {
        const { access_token } = args
      try {
        const response = await axios.get("http://localhost:3001/tanamanUser", 
        {headers: {access_token}});
        console.log(response);
        return response.data;
      } catch (err) {
        return err;
      }
    },
    getTanamanUserById: async (_, args) => {
      const { id, access_token } = args;
      try {
        const response = await axios.get(`http://localhost:3001/tanamanUser/${id}`,
        {headers: {access_token}});
        console.log(response.data);
        return response.data;
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    postTanamanUser: async (_, args, context) => {
      console.log(context);
      const { access_token } = args.tanamanUser
      try {
        const response = await axios.post("http://localhost:3001/tanamanUser/", args.tanamanUser.data, {headers: {access_token}}
        );
        return response.data.tanaman;
      } catch (err) {
        return err;
      }
    },
    putTanamanUser: async (_, args) => {
      const { id, access_token } = args.tanamanUser;
      try {
        const response = await axios.put(
          `http://localhost:3001/tanamanUser/${id}`,
          args.tanamanUser.data, {headers: {access_token}}
        );
        console.log(response.data);
        return response.data;
      } catch (err) {
        return err;
      }
    },
    deleteTanamanUser: async (_, args) => {
      const { id, access_token } = args;
      try {
        const response = await axios.delete(
          `http://localhost:3001/tanamanUser/${id}`, {headers: {access_token}}
        );
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
