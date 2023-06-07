import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function verifyToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

  req.userId = decoded.id;

  next();
}
