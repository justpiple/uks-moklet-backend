import {
  findSemesterById,
  createSemester,
  updateSemester,
  deleteSemester,
  getAllSemester,
} from "@/utils/queries/semester.query";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { Success, BadRequest, CreatedSuccessfully } from "@/utils/apiResponse";
import { uuidv7 } from "uuidv7";

interface SemesterReqProps extends Request {
  body: Prisma.SemesterUncheckedCreateInput;
}

export const GetAllSemester = async (req: Request, res: Response) => {
  try {
    const response = await getAllSemester();
    if (response == null) {
      return res.status(400).json(BadRequest("Cannot find any semester"));
    }
    return res
      .status(200)
      .json(Success("Semester loaded successfully", { data: response }));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};
// FIND SEMESTER BY ID
export const FindSemesterById = async (req: Request, res: Response) => {
  try {
    const response = await findSemesterById(req.params.id);
    if (response == null) {
      return res.status(400).json(BadRequest("Cannot find any semester"));
    }
    return res
      .status(200)
      .json(Success("Semester loaded successfully", { data: response }));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};

// CREATE NEW SEMESTER
export const CreateSemester = async (req: SemesterReqProps, res: Response) => {
  try {
    const data: Prisma.SemesterUncheckedCreateInput = {
      ...req.body,
      id: uuidv7(),
    };
    const response = await createSemester(data);
    if (!response) {
      return res.status(400).json(BadRequest("Failed creating semester"));
    }
    return res
      .status(200)
      .json(
        CreatedSuccessfully("Semester created successfully", { data: response })
      );
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};

// UPDATE EXISTING SEMESTER
export const UpdateSemester = async (req: SemesterReqProps, res: Response) => {
  try {
    const response = await updateSemester(req.params.id, req.body);
    if (!response) {
      return res.status(400).json(BadRequest("Failed updating semester"));
    }
    return res.status(200).json(Success("Semester updated successfully"));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};

// DELETE SEMESTER
export const DeleteSemester = async (req: Request, res: Response) => {
  try {
    const response = await deleteSemester(req.params.id);
    if (!response) {
      return res.status(400).json(BadRequest("Cannot find any semester"));
    }
    return res.status(200).json(Success("Semester deleted successfully"));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};
