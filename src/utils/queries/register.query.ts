import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findRegisterById(id: string) {
  const register = await prisma.register.findFirst({ where: { id } });
  return register;
}

export async function findRegisterByIdSiswa(id: string) {
  const register = await prisma.register.findMany({ where: { siswa_id: id } });
  return register;
}

export async function createRegister(data: Prisma.RegisterCreateInput) {
  const create = await prisma.register.create({ data });
  return create;
}

export async function updateRegister(
  id: string,
  data: Prisma.RegisterUpdateInput
) {
  const update = await prisma.register.update({ where: { id }, data });
  return update;
}

export async function deleteRegister(id: string) {
  const deleteRegister = await prisma.register.delete({ where: { id } });
  return deleteRegister;
}
