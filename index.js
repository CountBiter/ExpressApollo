import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schema.graphql.js";
import { resolvers } from "./graphql/resolves.graphql.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import * as path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { auth } from "./router/auth.js";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(graphqlUploadExpress());
app.use("/public", express.static(path.join(__dirname, "./upload")));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: true,
  },
});

app.use(auth);

const port = process.env.PORT | 3000;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.listen({ port: port }, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(
    `Server is running at http://localhost:3000${server.graphqlPath}`
  );
});

server.start().then(() => {
  server.applyMiddleware({ app });
});

// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import { ApolloServer } from "apollo-server-express";
// import { typeDefs } from "./graphql/schema.graphql.js";
// import { resolvers } from "./graphql/resolves.graphql.js";
// import cors from "cors";
// import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";

// import * as path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
// import { auth } from "./router/auth.js";

// const app = express();

// app.use(cors());
// app.use(cookieParser());
// app.use(graphqlUploadExpress());
// app.use(express.static(path.join(__dirname, "./upload")));

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   cors: {
//     origin: true,
//   },
// });

// app.use(auth);

// const port = process.env.PORT | 3000;
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
// app.listen({ port: port }, () => {
//   console.log(`Server is running at http://192.168.31.207:${port}`);
//   console.log(
//     `Server is running at http://192.168.31.207:3000${server.graphqlPath}`
//   );
// });

// server.start().then(() => {
//   server.applyMiddleware({ app });
// });
