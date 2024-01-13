import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findAdminByEmail(email: string) {
  const user = await prisma.guru.findUnique({
    where: { email },
  });
  return user;
}

export async function findAdminById(id: string) {
  const user = await prisma.guru.findUnique({
    where: { id: id },
  });
  return user;
}

export async function createAdmin(data: Prisma.GuruCreateInput) {
  const create = await prisma.guru.create({ data });
  return create;
}

export async function updateAdmin(id: string, data: Prisma.GuruUpdateInput) {
  const update = await prisma.guru.update({
    where: { id },
    data,
  });
  return update;
}

export async function deleteAdmin(id: string) {
  const deleteUser = await prisma.guru.delete({
    where: { id },
  });
  return deleteUser;
}
