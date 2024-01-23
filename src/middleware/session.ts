import { Request, Response, NextFunction } from "express";
import { RequestWithSession, Token } from "@/types/middleware";
import jwt from "jsonwebtoken";
import { Unauthorize } from "@/utils/apiResponse";

export const verifyToken = (
  req: RequestWithSession,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json(Unauthorize("Invalid session"));
  }
  const JWTSecret = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, JWTSecret) as unknown as Token;

  req.token = decoded;
  next();
};
