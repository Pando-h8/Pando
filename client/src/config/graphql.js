import ApolloClient from "apollo-boost";

export const client = new ApolloClient({
  uri: "https://pando-orchestrator.herokuapp.com/graphql",
});
