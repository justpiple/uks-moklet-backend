import {
  findKelasById,
  createKelas,
  updateKelas,
  deleteKelas,
  getAllKelas,
} from "@/utils/queries/kelas.query";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import {
  Success,
  BadRequest,
  CreatedSuccessfully,
  InternalServerError,
} from "@/utils/apiResponse";
import { uuidv7 } from "uuidv7";

interface KelasReqProps extends Request {
  body: Prisma.KelasUncheckedCreateInput;
}

// FIND KELAS BY ID
export const GetAllKelas = async (req: Request, res: Response) => {
  try {
    const response = await getAllKelas();
    if (response == null) {
      return res.status(400).json(BadRequest("Cannot find any kelas"));
    }
    return res
      .status(200)
      .json(Success("Kelas loaded successfully", { data: response }));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

export const FindKelasById = async (req: Request, res: Response) => {
  try {
    const response = await findKelasById(req.params.id);
    if (response == null) {
      return res.status(400).json(BadRequest("Cannot find any kelas"));
    }
    return res
      .status(200)
      .json(Success("Kelas loaded successfully", { data: response }));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// CREATE NEW KELAS
export const CreateKelas = async (req: KelasReqProps, res: Response) => {
  try {
    const data: Prisma.KelasUncheckedCreateInput = {
      ...req.body,
      id: uuidv7(),
    };
    const response = await createKelas(data);
    if (!response) {
      return res.status(400).json(BadRequest("Failed creating kelas"));
    }
    return res
      .status(200)
      .json(
        CreatedSuccessfully("Kelas created successfully", { data: response })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// UPDATE EXISTING KELAS
export const UpdateKelas = async (req: KelasReqProps, res: Response) => {
  try {
    const response = await updateKelas(req.params.id, req.body);
    if (!response) {
      return res.status(400).json(BadRequest("Failed updating kelas"));
    }
    return res.status(200).json(Success("Kelas updated successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// DELETE KELAS
export const DeleteKelas = async (req: Request, res: Response) => {
  try {
    const response = await deleteKelas(req.params.id);
    if (!response) {
      return res.status(400).json(BadRequest("Cannot find any kelas"));
    }
    return res.status(200).json(Success("Kelas deleted successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};
