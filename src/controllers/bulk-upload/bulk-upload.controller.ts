import fileUpload, { FileArray, UploadedFile } from "express-fileupload";
import readXlsxFile from "read-excel-file/node";
import { Request, Response } from "express";
import { BadRequest, InternalServerError, Success } from "@/utils/apiResponse";
import md5 from "md5";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const UploadSiswa = async (req: Request, res: Response) => {
  const file = req.files!.excel as UploadedFile;
  const schema = {
    Email: {
      prop: "email",
      type: String,
      required: true,
    },
    "Nama Lengkap": {
      prop: "name",
      type: String,
      required: true,
    },
    Gender: {
      prop: "gender",
      type: String,
      oneOf: ["L", "P"],
      required: true,
    },
    Password: {
      prop: "password",
      type: (value?: string) => {
        return value ? md5(value) : null;
      },
    },
  };

  const { rows, errors } = await readXlsxFile(file.data, { schema });
  if (errors.length > 0)
    return res.status(400).json({ ...BadRequest("File excel error"), errors });

  const create = await prisma.siswa.createMany({
    data: rows as Prisma.SiswaCreateManyInput[],
  });

  if (!create)
    return res.status(500).json(InternalServerError("Internal server error"));
  return res.json(
    Success("Success create " + rows.length + " data", { data: create })
  );
};
