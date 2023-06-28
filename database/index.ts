import { config } from "dotenv";
import mongoose, { Mongoose } from "mongoose";

config();

const { DATABASE_URI, DB_NAME } = process.env;
console.log({ DATABASE_URI, DB_NAME });
let connection: Mongoose | null;
export const connectDb = async () => {
  try {
    connection = await mongoose.connect(DATABASE_URI as string, {
      dbName: DB_NAME,
    });
  } catch (e) {
    console.log({ e });
    connection = null;
  }
};

process.on("exit", (num) => {
  console.log(`Exiting... ${num}`);
  connection?.disconnect().then((ex) => console.log({ ex }));
});

// setTimeout(() => process.exit(0), 20 * 1000);

export { connection };
