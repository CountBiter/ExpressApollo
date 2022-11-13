import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./graphql/schema.graphql.js";
import { resolvers } from "./graphql/resolves.graphql.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { auth } from "./router/auth.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const context = ({ req }) => {
  const token = req.cookies["jwt"] || "";
  try {
    const { user_id, role_id } = jwt.decode(token, process.env.JWT_SECRET);
    return user_id, role_id;
  } catch (e) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  cors: {
    origin: true,
  },
});

app.use(auth);

const port = process.env.PORT | 3000;

app.listen({ port: port }, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(
    `Server is running at http://localhost:3000${server.graphqlPath}`
  );
});

server.start().then(() => {
  server.applyMiddleware({ app, cors: true });
});
