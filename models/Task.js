import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  title: {
    type: String,
    required: [true, "The Task title is required "],
    unique: true,
    trim: true,
    maxLength: [40, "title cannot be grater than 40 characters"],
  },
  description: {
    type: String,
    required: true,
    maxLength: [200, "title cannot be grater than 200 characters"],
  },
});

export default models.Task || model("Task", TaskSchema);
