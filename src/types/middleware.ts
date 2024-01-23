import { Request } from "express";

export interface Token {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "WALAS" | "SISWA";
}
export interface RequestWithSession extends Request {
  token: Token;
}
