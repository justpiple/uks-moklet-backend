import { RequestWithSession } from "@/types/middleware";
import { Success } from "@/utils/apiResponse";
import { Request, Response } from "express";

export const Logout = (req: Request, res: Response) => {
  res.clearCookie("token").end();
};

export const CurrentSession = (req: RequestWithSession, res: Response) => {
  res.json(Success("Success load current user", { data: req.token }));
};
