import { Schema } from "mongoose"

export const UsersSchema = new Schema({
    first_name: String,
    last_name: String,
    middle_name: String,
    full_name: String,
    post: String,
    depaptament: String,
    organisation_id: {type: Schema.Types.ObjectId, ref: "organosations"}
})