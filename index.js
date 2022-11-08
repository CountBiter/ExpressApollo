import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolves } from './graphql/resolves.graphql.js';
import { typeDefs } from './graphql/schema.graphql.js';
import { PORT } from './config/config.js';

const server =  new ApolloServer({ typeDefs, resolves });


const app = express();
server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: PORT }, () => {
    console.log(
      `Server is running at http://localhost:${PORT}`
    );
  });
});