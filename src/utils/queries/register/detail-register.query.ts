import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function createDetailRegister(
  data: Prisma.DetailRegisterCreateInput
) {
  const create = await prisma.detailRegister.create({ data });
  return create;
}

export async function updateDetailRegister(
  id: string,
  data: Prisma.DetailRegisterUpdateInput
) {
  const update = await prisma.detailRegister.update({
    where: { id },
    data,
  });
  return update;
}

export async function deleteDetailRegister(id: string) {
  const deleteRegister = await prisma.detailRegister.delete({ where: { id } });
  return deleteRegister;
}
