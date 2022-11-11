import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from './graphql/schema.graphql.js';
import { resolvers } from './graphql/resolves.graphql.js';
import { PORT } from "./config/config.js";

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: PORT }, () => {
    console.log(`Server is running at http://localhost:666${server.graphqlPath}`);
  });
});
