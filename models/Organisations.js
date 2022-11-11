import mongoose from "mongoose";

export const OrgSchema = new mongoose.Schema({
  title: String,
  full_name: String,
  icon: String,
  idfification_number: String,
  kpp: String,
  oked: String,
});

