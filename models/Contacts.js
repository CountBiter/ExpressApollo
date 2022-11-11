import { Schema } from "mongoose";

const TypeCISchema = new Schema({
    title: String,
    icon: String
})

export const ContactsSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: "Users"},
    type_ci: TypeCISchema
})