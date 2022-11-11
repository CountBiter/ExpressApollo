import { Schema } from "mongoose";

const KnowledgeBaseFilesSchema = new Schema({
    name: String,
    author_id: String,
    create_date: Date,
    file_url: String
})

export const KnowledgeBaseSchema = new Schema({
    title: String,
    task_id: {type: Schema.Types.ObjectId, ref: "Tasks"},
    author_id: String,
    create_date: Date,
    description: String,
    files: [KnowledgeBaseFilesSchema]
})