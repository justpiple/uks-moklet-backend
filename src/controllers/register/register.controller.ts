import {
  findRegisterById,
  createRegister,
  updateRegister,
  findRegisterByIdSiswa,
  deleteRegister,
} from "@/utils/queries/register/register.query";
import { Request, Response } from "express";
import {
  BadRequest,
  CreatedSuccessfully,
  Success,
  Unauthorize,
} from "@/utils/apiResponse";

import jwt from "jsonwebtoken";
import { uuidv7 } from "uuidv7";
import { registerWithDetail } from "@/types/prismaRelation";
import { Token } from "@/types/middleware";
import { Prisma } from "@prisma/client";

interface GetRegisterReqProps extends Request {
  params: {
    id: string;
  };
}

interface PostRegisterReqProps extends Request {
  body: Prisma.RegisterUncheckedCreateInput;
}

// find register by register id
export const FindRegister = async (req: GetRegisterReqProps, res: Response) => {
  const register: registerWithDetail | null = await findRegisterById(
    req.params.id
  );
  if (register == null) {
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
  const register: any = await findRegisterByIdSiswa(req.body.id);
  if (register.length === 0) {
    return res.status(400).json(BadRequest("Cannot find any siswa register"));
  }

  return res
    .status(200)
    .json(Success("Register loaded successfully", register));
};

// create new register
export const AddRegister = async (req: PostRegisterReqProps, res: Response) => {
  const data: Prisma.RegisterUncheckedCreateInput = {
    ...req.body,
    id: uuidv7(),
  };

  const register = await createRegister(data);

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
  const register = await updateRegister(req.params.id, req.body);

  if (!register) {
    return res.status(400).json(BadRequest("Failed updating register"));
  }

  return res
    .status(200)
    .json(Success("Register updated successfully", register));
};

export const DeleteRegister = async (req: Request, res: Response) => {
  const register = await deleteRegister(req.params.id);
  if (!register) {
    return res.status(400).json(BadRequest("Cannot find any register"));
  }

  return res
    .status(200)
    .json(Success("Register deleted successfully", register));
};
