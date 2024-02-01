import {
  findRujukanById,
  createRujukan,
  deleteRujukan,
  updateRujukan,
} from "@/utils/queries/rujukan.query";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { Success, BadRequest, CreatedSuccessfully } from "@/utils/apiResponse";
import { uuidv7 } from "uuidv7";

interface RujukanReqProps extends Request {
  body: Prisma.RujukanUncheckedCreateInput;
}

// FIND RUJUKAN BY ID
export const FindRujukanById = async (req: Request, res: Response) => {
  try {
    const response = await findRujukanById(req.params.id);
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

// CREATE NEW RUJUKAN
export const CreateRujukan = async (req: RujukanReqProps, res: Response) => {
  try {
    const data: Prisma.RujukanUncheckedCreateInput = {
      ...req.body,
      id: uuidv7(),
    };
    const response = await createRujukan(data);
    if (!response) {
      return res.status(400).json(BadRequest("Failed creating rujukan"));
    }
    return res
      .status(200)
      .json(CreatedSuccessfully("Rujukan created successfully", response));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};

// UPDATE EXISTING RUJUKAN
export const UpdateRujukan = async (req: RujukanReqProps, res: Response) => {
  try {
    const response = await updateRujukan(req.params.id, req.body);
    if (!response) {
      return res.status(400).json(BadRequest("Failed updating rujukan"));
    }
    return res
      .status(200)
      .json(Success("Rujukan updated successfully", response));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};

// DELETE RUJUKAN
export const DeleteRujukan = async (req: Request, res: Response) => {
  try {
    const response = await deleteRujukan(req.params.id);
    if (!response) {
      return res.status(400).json(BadRequest("Cannot find any rujukan"));
    }
    return res
      .status(200)
      .json(Success("Rujukan deleted successfully", response));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};