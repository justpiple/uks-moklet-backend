import fileUpload, { UploadedFile } from "express-fileupload";
import { NextFunction, Router } from "express";
import { auth } from "@/middleware/auth";
import { Request, Response } from "express";
import { BadRequest } from "@/utils/apiResponse";
import {
  UploadRombel,
  UploadRombelSiswa,
  UploadSiswa,
} from "@/controllers/bulk-upload/bulk-upload.controller";
import { unlinkSync } from "fs";

const router = Router();

// MAIN ROUTER
router.use(
  auth("ADMIN"),
  fileUpload({
    useTempFiles: false,
    tempFileDir: "bulk_temp_file/",
    limits: { fileSize: 10 * 1024 * 1024 },
  }),
  excelFile
);

router.post("/siswa", UploadSiswa);
router.post("/rombel", UploadRombel);
router.post("/rombel-siswa", UploadRombelSiswa);

function excelFile(req: Request, res: Response, next: NextFunction) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json(BadRequest("File excel is required."));
  }
  if (!req.files.excel) {
    return res.status(400).json(BadRequest("File excel is required."));
  }

  const file = req.files.excel as UploadedFile;

  if (
    file.mimetype !=
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return res.status(400).json(BadRequest("Format file must .xlsx"));
  }

  next();
}
export default router;
