import {
  findSiswaById,
  createSiswa,
  updateSiswa,
  deleteSiswa,
  getAllSiswa,
  searchSiswa,
  getAllSiswaPagination,
} from "@/utils/queries/siswa.query";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import {
  Success,
  BadRequest,
  CreatedSuccessfully,
  InternalServerError,
} from "@/utils/apiResponse";
import { uuidv7 } from "uuidv7";

interface siswaReqProps extends Request {
  body: Prisma.SiswaUncheckedCreateInput;
}

// FIND SISWA BY ID
export const GetAllSiswa = async (req: Request, res: Response) => {
  try {
    const response = await getAllSiswa();

    return res
      .status(200)
      .json(Success("Siswa loaded successfully", { data: response }));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

export const GetAllSiswaPagination = async (req: Request, res: Response) => {
  try {
    const response = await getAllSiswaPagination(
      parseInt(req.query.page?.toString()!)
    );

    return res.status(200).json(Success("Siswa loaded successfully", response));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

export const SearchSiswa = async (req: Request, res: Response) => {
  try {
    if (!req.query.name)
      return res.status(400).json(BadRequest("Name is required"));
    const response = await searchSiswa(req.query.name.toString());

    return res
      .status(200)
      .json(Success("Siswa loaded successfully", { data: response }));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

export const FindSiswaById = async (req: Request, res: Response) => {
  try {
    const response = await findSiswaById(req.params.id);
    if (response == null) {
      return res.status(400).json(BadRequest("Cannot find any siswa"));
    }
    return res.status(200).json(
      Success("Siswa loaded successfully", {
        data: { ...response, password: undefined },
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
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
      return res.status(500).json(InternalServerError("Failed creating siswa"));
    }
    return res
      .status(200)
      .json(
        CreatedSuccessfully("Siswa created successfully", { data: response })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
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
    res.status(500).json(InternalServerError());
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
    res.status(500).json(InternalServerError());
  }
};
