import { Schema } from "mongoose";

const TaskFileSchema = new Schema({
  name: String,
  author_id: String,
  create_date: String,
  file_url: String,
});

export const TaskTypeSchema = new Schema({
  title: String,
  sla: Number,
});

export const TaskStateSchema = new Schema({
  title: String,
  sla: Number,
});

export const TaskCommentsSchema = new Schema({
  comments: String,
  task_id: { type: Schema.Types.ObjectId, ref: "tasks" },
  author_id: String,
});

export const TasksSchema = new Schema({
  task_type_id: {type: Schema.Types.ObjectId, ref: "tasks"},
  title: String,
  description: String,
  create_date: String,
  acceptence_date: String,
  finished_date: String,
  author_id: String,
  implementer_id: String,
  state_id: String,
  priority: String,
  mata_tags: [String],
  files: [TaskFileSchema],
});
