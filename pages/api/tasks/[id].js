import dbConnect from "../../../utils/mongoose";
import Task from "../../../models/Task";

dbConnect();

export default async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id);

        if (!task) return res.status(400).json({ msg: "bad request" });

        res.status(200).json({ task });
      } catch (error) {
        return res.status(400).json({ msg: "Bad Request" });
      }
      break;
    case "PUT":
      try {
        const task = await Task.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!task) return res.status(400).json();

        res.status(201).json({ task });
      } catch (error) {
        res.status(400).json();
      }
      break;
    case "DELETE":
      try {
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) return res.status(400).json();
        res.status(201).json({ deletedTask });
      } catch (error) {
        res.status(400).json();
      }
      break;
    default:
      return res.status(400).json();
  }
};
