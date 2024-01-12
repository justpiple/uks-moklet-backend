import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { createAdmin } from "@/utils/queries/admin.query";

interface CreateAdminReqProps extends Request {
  body: {
    email: string;
    name: string;
    password?: string;
  };
}

export const CreateAdmin = async (req: CreateAdminReqProps, res: Response) => {
  try {
    const { email, name, password } = req.body;

    const data: Prisma.GuruCreateInput = {
      id: "123",
      email,
      name,
      akses: "ADMIN",
      password,
    };

    const createdAdmin = await createAdmin(data);

    res.status(201).json(createdAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
