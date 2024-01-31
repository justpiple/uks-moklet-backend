import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// FIND SEMESTER BY ID
export const findSemesterById = async (id: string) => {
  const response = await prisma.semester.findUnique({ where: { id } });
  return response;
};

// CREATE NEW SEMESTER
export const createSemester = async (
  data: Prisma.SemesterUncheckedCreateInput
) => {
  const response = await prisma.semester.create({ data });
  return response;
};

// UPDATE EXISTING SEMESTER
export const updateSemester = async (
  id: string,
  data: Prisma.SemesterUpdateInput
) => {
  const response = await prisma.semester.update({ where: { id }, data });
  return response;
};

// DELETE SEMESTER
export const deleteSemester = async (id: string) => {
  const response = await prisma.semester.delete({ where: { id } });
  return response;
};
