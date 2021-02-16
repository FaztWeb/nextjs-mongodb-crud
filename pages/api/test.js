import dbConnect from "../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
  res.json({ test: "Test" });
};
