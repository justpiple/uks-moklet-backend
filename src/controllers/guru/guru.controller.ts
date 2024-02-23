import {
  findGuruById,
  createGuru,
  updateGuru,
  deleteGuru,
} from "@/utils/queries/guru.query";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { Success, BadRequest, CreatedSuccessfully } from "@/utils/apiResponse";
import { uuidv7 } from "uuidv7";

interface guruReqProps extends Request {
  body: Prisma.GuruUncheckedCreateInput;
}

// FIND GURU BY ID
export const FindGuruById = async (req: Request, res: Response) => {
  try {
    const response = await findGuruById(req.params.id);
    if (response == null) {
      return res.status(400).json(BadRequest("Cannot find any guru"));
    }
    return res.status(200).json(Success("Guru loaded successfully", response));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};

// CREATE NEW GURU
export const CreateGuru = async (req: guruReqProps, res: Response) => {
  try {
    const data: Prisma.GuruUncheckedCreateInput = {
      ...req.body,
      id: uuidv7(),
    };
    const response = await createGuru(data);
    if (!response) {
      return res.status(400).json(BadRequest("Failed creating guru"));
    }
    return res
      .status(200)
      .json(CreatedSuccessfully("Guru created successfully", response));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};

// UPDATE EXISTING GURU
export const UpdateGuru = async (req: guruReqProps, res: Response) => {
  try {
    const response = await updateGuru(req.params.id, req.body);
    if (!response) {
      return res.status(400).json(BadRequest("Failed updating guru"));
    }
    return res.status(200).json(Success("Guru updated successfully", response));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};

// DELETE GURU
export const DeleteGuru = async (req: Request, res: Response) => {
  try {
    const response = await deleteGuru(req.params.id);
    if (!response) {
      return res.status(400).json(BadRequest("Cannot find any guru"));
    }
    return res.status(200).json(Success("Guru deleted successfully", response));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};
