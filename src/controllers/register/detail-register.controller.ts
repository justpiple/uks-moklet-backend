import {
  findDetailRegisterById,
  createDetailRegister,
  updateDetailRegister,
  deleteDetailRegister,
} from "@/utils/queries/register/detail-register.query";
import { Request, Response } from "express";
import {
  BadRequest,
  CreatedSuccessfully,
  InternalServerError,
  Success,
} from "@/utils/apiResponse";
import { uuidv7 } from "uuidv7";
import { Prisma } from "@prisma/client";

interface DetailRegisterReqProps extends Request {
  body: Prisma.DetailRegisterUncheckedCreateInput;
}

// FIND DETAIL REGISTER
export const FindDetailRegisterById = async (
  req: DetailRegisterReqProps,
  res: Response
) => {
  try {
    const response = await findDetailRegisterById(req.params.id);
    if (response == null) {
      return res
        .status(400)
        .json(BadRequest("Cannot find any detail register"));
    }
    return res
      .status(200)
      .json(Success("Detail register loaded successfully", response));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// CREATE NEW DETAIL REGISTER
export const CreateDetailRegister = async (
  req: DetailRegisterReqProps,
  res: Response
) => {
  try {
    const data: Prisma.DetailRegisterUncheckedCreateInput = {
      ...req.body,
      id: uuidv7(),
    };
    const response = await createDetailRegister(data);
    if (!response) {
      return res
        .status(400)
        .json(BadRequest("Failed creating detail register"));
    }
    return res
      .status(200)
      .json(
        CreatedSuccessfully("Detail register created successfully", response)
      );
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// UPDATE EXISTING DETAIL REGISTER
export const UpdateDetailRegister = async (
  req: DetailRegisterReqProps,
  res: Response
) => {
  try {
    const data: Prisma.DetailRegisterUpdateInput = {
      ...req.body,
    };
    const detailRegister = await updateDetailRegister(req.params.id, data);
    if (!detailRegister) {
      return res
        .status(500)
        .json(BadRequest("Failed updating detail register"));
    }
    return res
      .status(200)
      .json(Success("Detail register updated successfully", detailRegister));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// DELETE DETAIL REGISTER
export const DeleteDetailRegister = async (req: Request, res: Response) => {
  try {
    const detailRegister = await deleteDetailRegister(req.params.id);
    if (!detailRegister) {
      return res
        .status(400)
        .json(BadRequest("Cannot find any detail register"));
    }
    return res
      .status(200)
      .json(Success("Detail register deleted successfully", detailRegister));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};
