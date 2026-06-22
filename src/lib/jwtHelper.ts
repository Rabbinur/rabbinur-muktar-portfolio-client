import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES_IN || "7d";

class JwtHelper {
  static createToken(payload: object, expireTime: string = ACCESS_TOKEN_EXPIRES): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: expireTime as any,
    });
  }

  static verifyToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}

export default JwtHelper;
