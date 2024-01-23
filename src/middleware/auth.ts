import { Response, NextFunction } from "express";
import { RequestWithSession } from "@/types/middleware";
import { Unauthorize } from "@/utils/apiResponse";

// Middleware to verify JWT and check if the user has admin role
export const isAdmin = (
  req: RequestWithSession,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.token.role != "ADMIN")
      return res.status(401).json(Unauthorize("Unauthorized: Not admin"));

    next();
  } catch (error) {
    return res.status(401).json(Unauthorize("Unauthorized: Invalid token"));
  }
};

export const isWalas = (
  req: RequestWithSession,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.token.role != "WALAS")
      res.status(401).json(Unauthorize("Unauthorized: Not walas"));

    next();
  } catch (error) {
    return res.status(401).json(Unauthorize("Unauthorized: Invalid token"));
  }
};

export const isSiswa = (
  req: RequestWithSession,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.token.role != "SISWA")
      return res.status(401).json(Unauthorize("Unauthorized: Not siswa"));

    next();
  } catch (error) {
    return res.status(401).json(Unauthorize("Unauthorized: Invalid token"));
  }
};
