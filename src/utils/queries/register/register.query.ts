import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// FIND REGISTER BY ID
export async function findRegisterById(id: string) {
  const response = await prisma.register.findUnique({
    where: { id },
    include: { detail_register: { include: { guru: true } }, siswa: true },
  });
  return response;
}

// CREATE NEW REGISTER
export async function createRegister(
  data: Prisma.RegisterUncheckedCreateInput
) {
  const response = await prisma.register.create({ data });
  return response;
}

// UPDATE EXISTING REGISTER
export async function updateRegister(
  id: string,
  data: Prisma.RegisterUpdateInput
) {
  const response = await prisma.register.update({ where: { id }, data });
  return response;
}

// DELETE REGISTER
export async function deleteRegister(id: string) {
  const response = await prisma.register.delete({ where: { id } });
  return response;
}
