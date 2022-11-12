import dotenv from "dotenv";
dotenv.config();

import { hash } from "bcrypt";
import { User, Roles, UserRoles, Organisations } from "../database/dbConnector";
const { SALT } = process.env;

export const Migration = async () => {
  const org = new Organisations({
    title: "a",
    full_name: "a",
    icon: "a",
    idfification_number: "a",
    kpp: "a",
    oked: "a",
  });
  await org.save();
  const hashPassword = hash("a", SALT);
  const user = new User({
    first_name: "a",
    last_name: "a",
    middle_name: "a",
    full_name: "a",
    post: "a",
    organisation_id: `${org._id}`,
    login: "a",
    hashed_password: hashPassword,
  });
  await user.save();
  const roles = new Roles({
    title: "a",
    icon: "a",
    description: "a",
    permmission: {
      title: false,
      description: false,
      implementer: false,
      state: false,
      priority: false,
      files: false,
      comments: false,
      admin: true,
    },
  });
  await roles.save();
  const userRole = new UserRoles({
    user_id: user._id,
    role_id: roles._id,
  });
  await userRole.save();
};
