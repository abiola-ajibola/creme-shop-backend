import { config } from "dotenv";
import mongoose, { Mongoose, Schema } from "mongoose";

config();
declare module "mongoose" {
  interface Document {
    asPlainObject: () => Document;
  }
}

function asPlainObjectPlugin(schema: Schema) {
  // schema.virtual("asPlainObject").get(function () {
  //   return this.this.toObject({ useProjection: false });
  // });
  schema.methods.asPlainObject = function () {
    return this.toObject({ useProjection: true });
  };
}

mongoose.plugin(asPlainObjectPlugin);

const { DATABASE_URI, DB_NAME } = process.env;

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
