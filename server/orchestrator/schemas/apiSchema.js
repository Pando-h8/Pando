const { gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  input Tanaman {
    nama: String
    umur: Int
    gambar: String
    growth_rate: Int
    resistance: Int
  }

  input updateTanaman {
    id: ID!
    data: Tanaman
  }

  type TanamanAPI {
    id: ID!
    nama: String
    umur: Int
    gambar: String
    growth_rate: Int
    resistance: Int
  }

  extend type Query {
    getTanamans: [TanamanAPI]
    getTanaman(id: ID!): TanamanAPI
  }

  extend type Mutation {
    postTanaman(tanaman: Tanaman): TanamanAPI
    putTanaman(tanaman: updateTanaman): TanamanAPI
  }
`;

const resolvers = {
  Query: {
    getTanamans: async () => {
      try {
        const response = await axios.get("http://localhost:3002/tanaman");
        return response.data.tanaman;
      } catch (err) {
        return err;
      }
    },
    getTanaman: async (_, args) => {
      const { id } = args;
      try {
        const response = await axios.get(`http://localhost:3002/tanaman/${id}`);
        console.log(response.data);
        return response.data.tanaman;
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    postTanaman: async (_, args) => {
      try {
        const response = await axios.post(
          "http://localhost:3002/tanaman",
          args.tanaman
        );
        return response.data.tanaman;
      } catch (err) {
        return err;
      }
    },
    putTanaman: async (_, args) => {
      const { id } = args.tanaman;
      try {
        const response = await axios.put(
          `http://localhost:3002/tanaman/${id}`,
          args.tanaman.data
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
