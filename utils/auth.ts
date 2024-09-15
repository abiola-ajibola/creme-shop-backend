import jwt, { JwtPayload } from "jsonwebtoken";
import { readFileSync } from "fs";
import path from "path";

const privateKey = readFileSync(
  path.resolve(process.cwd(), "./rsa_private.pem")
);
const publicKey = readFileSync(path.resolve(process.cwd(), "./rsa_public.pem"));

export async function generateToken(
  email: string
): Promise<string | undefined> {
  return await new Promise((resolve, reject) =>
    jwt.sign(
      { email },
      privateKey,
      { algorithm: "RS512" },
      function (err, token) {
        if (err) {
          console.log({ err });
          reject(err);
        }
        resolve(token);
      }
    )
  );
}

export async function verifyToken(
  token: string
): Promise<string | undefined | JwtPayload> {
  return await new Promise((resolve, reject) => {
    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        console.log({ err });
        reject(err);
      }
      resolve(decoded);
    });
  });
}
