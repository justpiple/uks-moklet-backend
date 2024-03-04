import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import {
  Success,
  BadRequest,
  CreatedSuccessfully,
  InternalServerError,
  NotFound,
} from "@/utils/apiResponse";
import { randomString } from "@/utils/func";
import {
  createRombel,
  deleteRombel,
  findRombelById,
  getAllRombel,
  updateRombel,
} from "@/utils/queries/rombel.query";

interface RombelReqProps extends Request {
  body: Prisma.RombelUncheckedCreateInput;
}

// FIND ROMBEL BY ID
export const GetAllRombel = async (req: Request, res: Response) => {
  try {
    const response = await getAllRombel();
    if (response == null) {
      return res.status(404).json(NotFound("Cannot find any rombel"));
    }
    return res
      .status(200)
      .json(Success("Rombel loaded successfully", { data: response }));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

export const FindRombelById = async (req: Request, res: Response) => {
  try {
    const response = await findRombelById(req.params.id);
    if (response == null) {
      return res.status(400).json(BadRequest("Cannot find any kelas"));
    }
    return res
      .status(200)
      .json(Success("Rombel loaded successfully", { data: response }));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// CREATE NEW ROMBEL
export const CreateRombel = async (req: RombelReqProps, res: Response) => {
  try {
    const data: Prisma.RombelUncheckedCreateInput = {
      ...req.body,
      id: randomString(11),
    };
    const response = await createRombel(data);
    if (!response) {
      return res.status(400).json(BadRequest("Failed creating rombel"));
    }
    return res
      .status(200)
      .json(
        CreatedSuccessfully("Rombel created successfully", { data: response })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// UPDATE EXISTING ROMBEL
export const UpdateRombel = async (req: RombelReqProps, res: Response) => {
  try {
    const response = await updateRombel(req.params.id, req.body);
    if (!response) {
      return res.status(400).json(BadRequest("Failed updating rombel"));
    }
    return res.status(200).json(Success("Rombel updated successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// DELETE ROMBEL
export const DeleteRombel = async (req: Request, res: Response) => {
  try {
    const response = await deleteRombel(req.params.id);
    if (!response) {
      return res.status(400).json(BadRequest("Cannot find any rombel"));
    }
    return res.status(200).json(Success("Rombel deleted successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};
