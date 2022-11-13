import dotenv from "dotenv";
dotenv.config();

import { Router } from "express";

import { User, UserRoles } from "../database/dbConnector.js";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";

const router = Router();

export const auth = router.post("/login", async (req, res) => {
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
          token: token,
        });
      }
      return res.send("Password does not match");
    }
    return res.send("This user is not found");
  } catch (err) {
    return new Error(err);
  }
});
