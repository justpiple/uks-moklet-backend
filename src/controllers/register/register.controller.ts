import { findRegisterById } from "@/utils/queries/register.query";
import { Request, Response } from "express";
import { BadRequest, Success, Unauthorize } from "@/utils/apiResponse";

interface RegisterReqProps extends Request {
  body: {
    id: string;
  };
}

export const GetRegisterById = async (req: RegisterReqProps, res: Response) => {
  const register = await findRegisterById(req.body.id);
  if (register.length===0) {
    return res.status(400).json(BadRequest("Cannot find any register"));
  }
  return res
    .status(200)
    .json(Success("Register loaded successfully", register));
};
