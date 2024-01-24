import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// FIND DETAIL REGISTER BY ID
export async function findDetailRegisterById(id: string) {
  const response = await prisma.detailRegister.findUnique({
    where: { id },
    include: { rujukan: true },
  });
  return response
}

// CREATE NEW DETAIL REGISTER
export async function createDetailRegister(
  data: Prisma.DetailRegisterUncheckedCreateInput
) {
  const response = await prisma.detailRegister.create({ data });
  return response;
}

// UPDATE EXISTING DETAIL REGISTER
export async function updateDetailRegister(
  id: string,
  data: Prisma.DetailRegisterUpdateInput
) {
  const response = await prisma.detailRegister.update({
    where: { id },
    data,
  });
  return response;
}

// DELETE DETAIL REGISTER
export async function deleteDetailRegister(id: string) {
  const response = await prisma.detailRegister.delete({ where: { id } });
  return response;
}
