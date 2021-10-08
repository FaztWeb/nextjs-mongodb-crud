import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export async function dbConnect() {
  if (conn.isConected) return;

  const db = await connect(process.env.MONGODB_URI);

  conn.isConnected = db.connections[0].readyState;

  // console.log(conn.isConnected);
}

connection.on("connected", () => {
  console.log("Mongodb connected to db");
});

connection.on("error", (err) => {
  console.error("Mongodb connected to", err.message);
});
