/*
  Warnings:

  - You are about to alter the column `siswa_id` on the `register` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.
  - The primary key for the `rombelsiswa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `siswa_id` on the `rombelsiswa` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.
  - The primary key for the `siswa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `siswa_id` on the `siswa` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `register` DROP FOREIGN KEY `Register_siswa_id_fkey`;

-- DropForeignKey
ALTER TABLE `rombelsiswa` DROP FOREIGN KEY `RombelSiswa_siswa_id_fkey`;

-- AlterTable
ALTER TABLE `register` MODIFY `siswa_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rombelsiswa` DROP PRIMARY KEY,
    MODIFY `siswa_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`rombel_id`, `siswa_id`);

-- AlterTable
ALTER TABLE `siswa` DROP PRIMARY KEY,
    MODIFY `siswa_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`siswa_id`);

-- AddForeignKey
ALTER TABLE `Register` ADD CONSTRAINT `Register_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `Siswa`(`siswa_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RombelSiswa` ADD CONSTRAINT `RombelSiswa_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `Siswa`(`siswa_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
