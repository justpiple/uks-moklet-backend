import { Prisma } from "@prisma/client";

export type siswaWithRegister = Prisma.SiswaGetPayload<{
  include: { register: true };
}>;

export type registerWithSiswa = Prisma.RegisterGetPayload<{
  include: { siswa: true };
}>;

export type registerWithDetail = Prisma.RegisterGetPayload<{
  include: { siswa: true; detail_register: { include: { guru: true } } };
}>;
