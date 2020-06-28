const express = require("express");
const {
  ApolloServer,
  gql,
  makeExecutableSchema,
} = require("apollo-server-express");
const APISchema = require("./schemas/apiSchema");
const userSchema = require("./schemas/userSchema");
const tanamanSchema = require("./schemas/tanamanSchema");

const typeDefs = gql`
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    APISchema.typeDefs,
    userSchema.typeDefs,
    tanamanSchema.typeDefs,
  ],
  resolvers: [
    APISchema.resolvers,
    userSchema.resolvers,
    tanamanSchema.resolvers,
  ],
});

const server = new ApolloServer({
  schema
});

// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log("Now browse to http://localhost:4000" + server.graphqlPath)
);
