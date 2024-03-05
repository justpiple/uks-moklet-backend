import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getAllGuru() {
  const user = await prisma.guru.findMany({
    select: { id: true, name: true, akses: true, email: true },
  });
  return user;
}

export async function findGuruByEmail(email: string) {
  const user = await prisma.guru.findUnique({
    where: { email },
  });
  return user;
}

export async function findGuruById(id: string) {
  const user = await prisma.guru.findUnique({
    where: { id: id },
    select: { id: true, email: true, name: true, akses: true },
  });
  return user;
}

export async function createGuru(data: Prisma.GuruUncheckedCreateInput) {
  const create = await prisma.guru.create({ data });
  return create;
}

export async function updateGuru(
  id: string,
  data: Prisma.GuruUncheckedUpdateInput
) {
  const update = await prisma.guru.update({
    where: { id },
    data,
  });
  return update;
}

export async function deleteGuru(id: string) {
  const deleteUser = await prisma.guru.delete({
    where: { id },
  });
  return deleteUser;
}
