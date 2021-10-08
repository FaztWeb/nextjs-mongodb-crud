import { dbConnect } from "utils/mongoose";
import Task from "models/Task";

dbConnect();

export default async (req, res) => {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ msg: "Task does not exists" });
        return res.status(200).json(task);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case "PUT":
      try {
        const task = await Task.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });
        if (!task) return res.status(404).json({ msg: "Task does not exists" });
        return res.status(200).json(task);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case "DELETE":
      try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask)
          return res.status(404).json({ msg: "Task does not exists" });
        return res.status(204).json();
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};
