import { connect } from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConected) return;

  const db = await connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Connected to:", db.connection.name);
}

export default dbConnect;
