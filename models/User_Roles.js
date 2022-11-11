import { Schema } from "mongoose";

export const UserRolesSchema = new Schema({
    user_id: String,
    role_id: String,
})