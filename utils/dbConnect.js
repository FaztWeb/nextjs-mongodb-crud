import { connect } from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConected) return;

  const db = await connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  connection.isConected = db.connections[0].readyState;

  console.log(connection.isConected)
}

export default dbConnect;
