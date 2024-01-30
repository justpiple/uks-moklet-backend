import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// FIND TUJUKAN BY ID
export const findRujukanById = async (id: string) => {
  const response = await prisma.rujukan.findUnique({ where: { id } });
  return response;
};

// CREATE NEW RUJUKAN
export const createRujukan = async (
  data: Prisma.RujukanUncheckedCreateInput
) => {
  const response = await prisma.rujukan.create({ data });
  return response;
};

// UPDATE EXISTING RUJUKAN
export const updateRujukan = async (
  id: string,
  data: Prisma.RujukanUpdateInput
) => {
  const response = await prisma.rujukan.update({ where: { id }, data });
  return response;
};

// DELETE RUJUKAN
export const deleteRujukan = async (id: string) => {
  const response = await prisma.rujukan.delete({ where: { id } });
  return response;
};
