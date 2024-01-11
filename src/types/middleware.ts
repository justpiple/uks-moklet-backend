import { Request } from "express";

export interface RequestWithSession extends Request {
  token: {
    id: string;
    email: string;
    name: string;
    role: "ADMIN" | "WALAS" | "SISWA";
  };
}
