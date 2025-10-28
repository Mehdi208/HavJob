import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "havjob-jwt-secret-change-in-production";
const JWT_ACCESS_EXPIRY = "1h"; // 1 hour
const JWT_REFRESH_EXPIRY = "7d"; // 7 days

export interface JwtPayload {
  userId: string;
  authMethod: "phone";
  tokenType: "access" | "refresh";
}

export function generateAccessToken(userId: string): string {
  const payload: JwtPayload = {
    userId,
    authMethod: "phone",
    tokenType: "access",
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRY });
}

export function generateRefreshToken(userId: string): string {
  const payload: JwtPayload = {
    userId,
    authMethod: "phone",
    tokenType: "refresh",
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRY });
}

export function verifyToken(token: string, expectedType?: "access" | "refresh"): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    // If expectedType is specified, verify token type matches
    if (expectedType && decoded.tokenType !== expectedType) {
      return null;
    }
    
    return decoded;
  } catch (error) {
    return null;
  }
}

export const requireJwtAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = authHeader.substring(7); // Remove "Bearer " prefix
  
  // Verify token and ensure it's an access token (not refresh token)
  const decoded = verifyToken(token, "access");

  if (!decoded) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }

  // Attach user ID to request for use in route handlers
  (req as any).jwtUserId = decoded.userId;
  next();
};
