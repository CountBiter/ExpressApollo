import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./graphql/schema.graphql.js";
import { resolvers } from "./graphql/resolves.graphql.js";
import { User, UserRoles } from "./database/dbConnector.js"; 
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import { JWT_SECRET, PORT } from "./config/config.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const context = ({ req }) => {
  const token = req.cookies["jwt"] || "";
  try {
    return ({ id, email } = jwt.verify(token, SECRET_KEY));
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
  cors: true,
});

server.start().then(() => {
  server.applyMiddleware({ app, cors: true });
});

app.post("/login", async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await User.findOne({ login: login });
    if (user) {
      const userPassword = compareSync(password, user.hashed_password);
      if (userPassword) {
        const id = user._id.toString();
        const { role_id, user_id } = await UserRoles.findOne({
          role_id: id,
        });
        const token = jwt.sign({ role_id, user_id }, process.env.JWT_SECRET);

        res.cookie("jwt", token, {
          httpOnly: true,
        });

        res.send({
          success: true,
        });

        return { token: token, user: user };
      }
      return "Password does not match";
    }
    return "This user is not found";
  } catch (err) {
    return new Error(err);
  }
});

const port = process.env.PORT | 3000

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Server is running at http://localhost:666${server.graphqlPath}`);
});
