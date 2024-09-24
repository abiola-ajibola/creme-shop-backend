import express_session, { Store } from "express-session";
import connectSqlite3 from "connect-sqlite3";
import { readFileSync } from "fs";
import path from "path";
const SQLiteStore = connectSqlite3(express_session);

const secret = readFileSync(
  path.join(process.cwd(), "session_secret.key")
).toString();

export const session = express_session({
  store: new SQLiteStore({ db: "./sessions.db" }) as Store,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: false,
    httpOnly: false,
    path: "/",
    // sameSite: "none",
  },
  secret: secret.toString(),
  saveUninitialized: true,
  resave: false,
  name: "fghzsdf675rew",
});
