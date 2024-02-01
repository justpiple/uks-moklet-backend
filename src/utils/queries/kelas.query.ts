import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// FIND KELAS BY ID
export const findKelasById = async (id: string) => {
  const response = await prisma.kelas.findUnique({ where: { id } });
  return response;
};

// CREATE NEW KELAS
export const createKelas = async (
  data: Prisma.KelasUncheckedCreateInput
) => {
  const response = await prisma.kelas.create({ data });
  return response;
};

// UPDATE EXISTING KELAS
export const updateKelas = async (
  id: string,
  data: Prisma.KelasUpdateInput
) => {
  const response = await prisma.kelas.update({ where: { id }, data });
  return response;
};

// DELETE KELSS
export const deleteKelas = async (id: string) => {
  const response = await prisma.kelas.delete({ where: { id } });
  return response;
};
