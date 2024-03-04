import {
  findRujukanById,
  createRujukan,
  deleteRujukan,
  updateRujukan,
  getAllRujukan,
} from "@/utils/queries/rujukan.query";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import {
  Success,
  BadRequest,
  CreatedSuccessfully,
  InternalServerError,
  NotFound,
} from "@/utils/apiResponse";
import { uuidv7 } from "uuidv7";

interface RujukanReqProps extends Request {
  body: Prisma.RujukanUncheckedCreateInput;
}

export const GetAllRujukan = async (req: Request, res: Response) => {
  try {
    const response = await getAllRujukan();
    if (response == null) {
      return res.status(404).json(NotFound("Cannot find any register"));
    }
    return res
      .status(200)
      .json(Success("Register loaded successfully", { data: response }));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};
// FIND RUJUKAN BY ID
export const FindRujukanById = async (req: Request, res: Response) => {
  try {
    const response = await findRujukanById(req.params.id);
    if (response == null) {
      return res.status(404).json(NotFound("Cannot find any register"));
    }
    return res
      .status(200)
      .json(Success("Register loaded successfully", { data: response }));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
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
      .json(
        CreatedSuccessfully("Rujukan created successfully", { data: response })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// UPDATE EXISTING RUJUKAN
export const UpdateRujukan = async (req: RujukanReqProps, res: Response) => {
  try {
    const response = await updateRujukan(req.params.id, req.body);
    if (!response) {
      return res.status(400).json(BadRequest("Failed updating rujukan"));
    }
    return res.status(200).json(Success("Rujukan updated successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// DELETE RUJUKAN
export const DeleteRujukan = async (req: Request, res: Response) => {
  try {
    const response = await deleteRujukan(req.params.id);
    if (!response) {
      return res.status(404).json(NotFound("Cannot find any rujukan"));
    }
    return res.status(200).json(Success("Rujukan deleted successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};
