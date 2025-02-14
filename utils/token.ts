import type { user } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Blacklist } from "./blacklist";

interface JwtPayload {
  userId: number;
  iat?: number;
  exp?: number;
}

export class Token {
  static async generateToken(user: user): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { userId: user.id },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" },
        (err, token) => {
          if (err || !token) {
            reject(new Error("Could not generate token"));
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  static async verifyToken(token: string): Promise<JwtPayload> {
    const jwtKey = process.env.JWT_KEY as string;
    if (!jwtKey) throw new Error("JWT_KEY is not set in environment variables");

    if (Blacklist.hasTokenBlacklist(token)) {
      throw new Error("Token is revoked.");
    }

    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtKey, (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            reject(new Error("Token has expired."));
          } else if (err.name === "JsonWebTokenError") {
            reject(new Error("Invalid token."));
          } else {
            reject(new Error("Could not verify token."));
          }
        } else {
          resolve(decoded as JwtPayload);
        }
      });
    });
  }
}
