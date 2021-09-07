import dbConnect from "../../utils/mongoose";

dbConnect();

export default async (req, res) => {
  res.json({ msg: "Pong!" });
};
