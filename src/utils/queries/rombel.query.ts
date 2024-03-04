import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// FIND ROMBEL BY ID
export const findRombelById = async (id: string) => {
  const response = await prisma.rombel.findUnique({ where: { id } });
  return response;
};

// CREATE NEW ROMBEL
export const getAllRombel = async () => {
  const response = await prisma.rombel.findMany({
    include: {
      _count: { select: { siswa: true } },
      guru: { select: { name: true, id: true } },
      semester: { select: { tahun_ajaran: true, semester: true } },
      kelas: { select: { tingkat: true, nama_kelas: true } },
    },
  });
  return response;
};

export const createRombel = async (data: Prisma.RombelUncheckedCreateInput) => {
  const response = await prisma.rombel.create({ data });
  return response;
};

// UPDATE EXISTING DATA
export const updateRombel = async (
  id: string,
  data: Prisma.RombelUpdateInput
) => {
  const response = await prisma.rombel.update({ where: { id }, data });
  return response;
};

// DELETE ROMBEL
export const deleteRombel = async (id: string) => {
  const response = await prisma.rombel.delete({ where: { id } });
  return response;
};
