import {
  findSiswaById,
  createSiswa,
  updateSiswa,
  deleteSiswa,
} from "@/utils/queries/siswa.query";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { Success, BadRequest, CreatedSuccessfully } from "@/utils/apiResponse";
import { uuidv7 } from "uuidv7";

interface siswaReqProps extends Request {
  body: Prisma.SiswaUncheckedCreateInput;
}

// FIND SISWA BY ID
export const FindSiswaById = async (req: Request, res: Response) => {
  try {
    const response = await findSiswaById(req.params.id);
    if (response == null) {
      return res.status(400).json(BadRequest("Cannot find any siswa"));
    }
    return res
      .status(200)
      .json(Success("Siswa loaded successfully", { data: response }));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};

// CREATE NEW SISWA
export const CreateSiswa = async (req: siswaReqProps, res: Response) => {
  try {
    const data: Prisma.SiswaUncheckedCreateInput = {
      ...req.body,
      id: uuidv7(),
    };
    const response = await createSiswa(data);
    if (!response) {
      return res.status(400).json(BadRequest("Failed creating siswa"));
    }
    return res
      .status(200)
      .json(
        CreatedSuccessfully("Siswa created successfully", { data: response })
      );
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};

// UPDATE EXISTING SISWA
export const UpdateSiswa = async (req: siswaReqProps, res: Response) => {
  try {
    const response = await updateSiswa(req.params.id, req.body);
    if (!response) {
      return res.status(400).json(BadRequest("Failed updating siswa"));
    }
    return res.status(200).json(Success("Siswa updated successfully"));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};

// DELETE SISWA
export const DeleteSiswa = async (req: Request, res: Response) => {
  try {
    const response = await deleteSiswa(req.params.id);
    if (!response) {
      return res.status(400).json(BadRequest("Cannot find any siswa"));
    }
    return res.status(200).json(Success("Siswa deleted successfully"));
  } catch (error) {
    console.log(error);
    res.status(400).json(BadRequest(JSON.stringify(error)));
  }
};
