import { Prisma } from "@prisma/client";

export type siswaWithRegister = Prisma.SiswaGetPayload<{
  include: { register: true };
}>;

export type registerWithSiswa = Prisma.RegisterGetPayload<{
  include: { siswa: true };
}>;

export type registerWithDetail = Prisma.RegisterGetPayload<{
  include: {
    detail_register: { include: { guru: true } };
    siswa: {
      select: {
        rombel: {
          select: {
            rombel: {
              select: {
                semester: true;
                kelas: { select: { nama_kelas: true; tingkat: true } };
              };
            };
          };
        };
      };
    };
  };
}>;
