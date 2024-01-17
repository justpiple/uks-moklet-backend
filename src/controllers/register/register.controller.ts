import {
  findRegisterById,
  createRegister,
  updateRegister,
} from "@/utils/queries/register.query";
import { Request, Response } from "express";
import {
  BadRequest,
  CreatedSuccessfully,
  Success,
  Unauthorize,
} from "@/utils/apiResponse";

import jwt from "jsonwebtoken";
import { uuidv7 } from "uuidv7";

interface GetRegisterReqProps extends Request {
  body: {
    id: string;
  };
}

interface PostRegisterReqProps extends Request {
  body: {
    tgl_periksa: string;
  };
}

// find register by register id
export const FindRegister = async (req: GetRegisterReqProps, res: Response) => {
  const register: any = await findRegisterById(req.body.id);
  if (register.length === 0) {
    return res.status(400).json(BadRequest("Cannot find any register"));
  }

  return res
    .status(200)
    .json(Success("Register loaded successfully", register));
};

// find register by siswa id
export const SiswaFindRegister = async (
  req: GetRegisterReqProps,
  res: Response
) => {
  const register: any = await findRegisterById(req.body.id);
  if (register.length === 0) {
    return res.status(400).json(BadRequest("Cannot find any siswa register"));
  }

  return res
    .status(200)
    .json(Success("Register loaded successfully", register));
};

// create new register
export const AddRegister = async (req: PostRegisterReqProps, res: Response) => {
  const decodedToken: any = jwt.verify(
    req.cookies.token,
    process.env.JWT_SECRET
  );

  const data: any = {
    id: uuidv7(),
    siswa_id: decodedToken.id,
    tgl_periksa: req.body.tgl_periksa,
  };

  const register: any = await createRegister(data);

  if (!register) {
    return res.status(400).json(BadRequest("Failed creating register"));
  }

  return res
    .status(200)
    .json(CreatedSuccessfully("Register created successfully", register));
};

// update register
export const UpdateRegister = async (
  req: PostRegisterReqProps,
  res: Response
) => {
  const data: any = {
    id: uuidv7(),
    tgl_periksa: req.body.tgl_periksa,
  };

  const register: any = await updateRegister(req.params.id, data);

  if (!register) {
    return res.status(400).json(BadRequest("Failed updating register"));
  }

  return res
    .status(200)
    .json(CreatedSuccessfully("Register updated successfully", register));
};
