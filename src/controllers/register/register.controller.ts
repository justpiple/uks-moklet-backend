import {
  findRegisterById,
  createRegister,
  updateRegister,
  deleteRegister,
} from "@/utils/queries/register/register.query";
import { Request, Response } from "express";
import { BadRequest, CreatedSuccessfully, Success } from "@/utils/apiResponse";
import { uuidv7 } from "uuidv7";
import { registerWithDetail } from "@/types/prismaRelation";
import { Prisma } from "@prisma/client";
import { stringify } from "querystring";

interface RegisterReqProps extends Request {
  body: Prisma.RegisterUncheckedCreateInput;
}

// FIND REGISTER BY ID
export const FindRegisterById = async (req: Request, res: Response) => {
  try {
    const response: registerWithDetail | null = await findRegisterById(
      req.params.id
    );
    if (response == null) {
      return res.status(400).json(BadRequest("Cannot find any register"));
    }
    return res
      .status(200)
      .json(Success("Register loaded successfully", response));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};

// CREATE NEW REGISTER
export const CreateRegister = async (req: RegisterReqProps, res: Response) => {
  try {
    const data: Prisma.RegisterUncheckedCreateInput = {
      ...req.body,
      // tgl_periksa: new Date(), # IN PROGRESS
      id: uuidv7(),
    };
    const response = await createRegister(data);
    if (!response) {
      return res.status(400).json(BadRequest("Failed creating register"));
    }
    return res
      .status(200)
      .json(CreatedSuccessfully("Register created successfully", response));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};

// UPDATE EXISTING REGISTER
export const UpdateRegister = async (req: RegisterReqProps, res: Response) => {
  try {
    const response = await updateRegister(req.params.id, req.body);
    if (!response) {
      return res.status(400).json(BadRequest("Failed updating register"));
    }
    return res
      .status(200)
      .json(Success("Register updated successfully", response));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};

// DELETE REGISTER
export const DeleteRegister = async (req: Request, res: Response) => {
  try {
    const response = await deleteRegister(req.params.id);
    if (!response) {
      return res.status(400).json(BadRequest("Cannot find any register"));
    }

    return res
      .status(200)
      .json(Success("Register deleted successfully", response));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};
