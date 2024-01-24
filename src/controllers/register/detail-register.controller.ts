import {
  createDetailRegister,
  updateDetailRegister,
  deleteDetailRegister,
} from "@/utils/queries/register/detail-register.query";
import { Request, Response } from "express";
import {
  BadRequest,
  CreatedSuccessfully,
  Success,
  Unauthorize,
} from "@/utils/apiResponse";

import { uuidv7 } from "uuidv7";

interface PostDetailRegisterReqProps extends Request {
  body: {
    register_id?: string;
    hasil_periksa?: string;
    analisa?: string;
    tindakan?: string;
    evaluasi?: string;
    lanjutan?: string;
    guru_id?: string;
  };
}

// create new detail register
export const AddDetailRegister = async (
  req: PostDetailRegisterReqProps,
  res: Response
) => {
  const data: any = {
    id: uuidv7(),
    register_id: req.body.register_id,
    hasil_periksa: req.body.hasil_periksa,
    analisa: req.body.analisa,
    tindakan: req.body.tindakan,
    evaluasi: req.body.evaluasi,
    lanjutan: req.body.lanjutan,
    guru_id: req.body.guru_id,
  };

  const detailRegister: any = await createDetailRegister(data);

  if (!detailRegister) {
    return res.status(400).json(BadRequest("Failed creating detail register"));
  }

  return res
    .status(200)
    .json(
      CreatedSuccessfully(
        "Detail register created successfully",
        detailRegister
      )
    );
};

// update register
export const UpdateDetailRegister = async (
  req: PostDetailRegisterReqProps,
  res: Response
) => {
  const data: any = {
    register_id: req.body.register_id,
    hasil_periksa: req.body.hasil_periksa,
    analisa: req.body.analisa,
    tindakan: req.body.tindakan,
    evaluasi: req.body.evaluasi,
    lanjutan: req.body.lanjutan,
    guru_id: req.body.guru_id,
  };

  const detailRegister: any = await updateDetailRegister(req.params.id, data);

  if (!detailRegister) {
    return res.status(400).json(BadRequest("Failed updating detail register"));
  }

  return res
    .status(200)
    .json(Success("Detail register updated successfully", detailRegister));
};

// delete detail register
export const DeleteDetailRegister = async (req: Request, res: Response) => {
  const detailRegister = await deleteDetailRegister(req.params.id);
  if (!detailRegister) {
    return res.status(400).json(BadRequest("Cannot find any detail register"));
  }

  return res
    .status(200)
    .json(Success("Detail register deleted successfully", detailRegister));
};
