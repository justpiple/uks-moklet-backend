import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findRegisterById(id: string) {
  const register = await prisma.register.findMany({
    where: { id },
    include: { detail_register: true },
  });
  return register;
}

export async function findRegisterByIdSiswa(id: string) {
  const register = await prisma.register.findMany({
    where: { siswa_id: id },
    include: { detail_register: true },
  });
  return register;
}

export async function createRegister(data: Prisma.RegisterCreateInput) {
  const create = await prisma.register.create({
    data: { ...data, detail_register: { ...data.detail_register } },
  });
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
