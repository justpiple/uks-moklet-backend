import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getAllSiswa() {
  const user = await prisma.siswa.findMany({
    select: {
      name: true,
      id: true,
      email: true,
      gender: true,
      rombel: {
        select: {
          rombel: {
            select: { kelas: { select: { nama_kelas: true, tingkat: true } } },
          },
        },
      },
    },
  });
  return user;
}

export async function searchSiswa(query: string) {
  const user = await prisma.siswa.findMany({
    where: { name: { contains: query } },
    select: {
      name: true,
      id: true,
      email: true,
      rombel: {
        select: {
          rombel: {
            select: { kelas: { select: { nama_kelas: true, tingkat: true } } },
          },
        },
      },
    },
  });
  return user;
}

export async function findSiswaByEmail(email: string) {
  const user = await prisma.siswa.findUnique({ where: { email } });
  return user;
}

export async function findSiswaById(id: string) {
  const user = await prisma.siswa.findUnique({ where: { id: id } });
  return user;
}

export async function createSiswa(data: Prisma.SiswaCreateInput) {
  const create = await prisma.siswa.create({ data });
  return create;
}

export async function updateSiswa(id: string, data: Prisma.SiswaUpdateInput) {
  const update = await prisma.siswa.update({ where: { id }, data });
  return update;
}

export async function deleteSiswa(id: string) {
  const deleteUser = await prisma.siswa.delete({ where: { id } });
  return deleteUser;
}
