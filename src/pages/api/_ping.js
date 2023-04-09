import { dbConnect, runMiddleware } from "utils";
import Morgan from "morgan";

dbConnect();

// define the morgan middleware
const morgan = Morgan("dev");

export default async (req, res, next) => {
  // run morgan before the return response
  await runMiddleware(req, res, morgan);

  // return response to the client
  return res.json({ msg: "Pong!" });
};
