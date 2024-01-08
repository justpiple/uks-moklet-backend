-- CreateTable
CREATE TABLE `Siswa` (
    `siswa_id` CHAR(36) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `gender` ENUM('L', 'P') NOT NULL,
    `password` CHAR(32) NULL,

    UNIQUE INDEX `Siswa_email_key`(`email`),
    PRIMARY KEY (`siswa_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guru` (
    `guru_id` CHAR(36) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `akses` ENUM('ADMIN', 'WALAS') NOT NULL,
    `password` CHAR(32) NULL,

    UNIQUE INDEX `Guru_email_key`(`email`),
    PRIMARY KEY (`guru_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kelas` (
    `kelas_id` CHAR(6) NOT NULL,
    `nama_kelas` VARCHAR(191) NOT NULL,
    `tingkat` ENUM('X', 'XI', 'XII') NOT NULL,

    PRIMARY KEY (`kelas_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Semester` (
    `semester_id` CHAR(11) NOT NULL,
    `tahun_ajaran` VARCHAR(191) NOT NULL,
    `semester` ENUM('GANJIL', 'GENAP') NOT NULL,
    `tgl_awal` DATE NOT NULL,
    `tgl_akhir` DATE NOT NULL,

    PRIMARY KEY (`semester_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rombel` (
    `rombel_id` CHAR(11) NOT NULL,
    `kelas_id` CHAR(6) NOT NULL,
    `semester_id` CHAR(11) NOT NULL,
    `guru_id` CHAR(36) NOT NULL,

    PRIMARY KEY (`rombel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Register` (
    `register_id` CHAR(36) NOT NULL,
    `siswa_id` CHAR(36) NOT NULL,
    `tgl_periksa` DATE NOT NULL,

    PRIMARY KEY (`register_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailRegister` (
    `detail_register_id` CHAR(36) NOT NULL,
    `register_id` CHAR(36) NOT NULL,
    `hasil_periksa` LONGTEXT NOT NULL,
    `analisa` LONGTEXT NOT NULL,
    `tindakan` LONGTEXT NOT NULL,
    `evaluasi` LONGTEXT NOT NULL,
    `lanjutan` ENUM('mengikuti_kbm', 'rujukan', 'pulang') NOT NULL,
    `guru_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `DetailRegister_register_id_key`(`register_id`),
    PRIMARY KEY (`detail_register_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rujukan` (
    `rujukan_id` CHAR(36) NOT NULL,
    `detail_register_id` CHAR(36) NOT NULL,
    `analisa_dokter` LONGTEXT NOT NULL,
    `nama_dokter` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Rujukan_detail_register_id_key`(`detail_register_id`),
    PRIMARY KEY (`rujukan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RombelSiswa` (
    `rombel_id` CHAR(11) NOT NULL,
    `siswa_id` CHAR(36) NOT NULL,

    PRIMARY KEY (`rombel_id`, `siswa_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rombel` ADD CONSTRAINT `Rombel_kelas_id_fkey` FOREIGN KEY (`kelas_id`) REFERENCES `Kelas`(`kelas_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rombel` ADD CONSTRAINT `Rombel_semester_id_fkey` FOREIGN KEY (`semester_id`) REFERENCES `Semester`(`semester_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rombel` ADD CONSTRAINT `Rombel_guru_id_fkey` FOREIGN KEY (`guru_id`) REFERENCES `Guru`(`guru_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Register` ADD CONSTRAINT `Register_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `Siswa`(`siswa_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailRegister` ADD CONSTRAINT `DetailRegister_register_id_fkey` FOREIGN KEY (`register_id`) REFERENCES `Register`(`register_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailRegister` ADD CONSTRAINT `DetailRegister_guru_id_fkey` FOREIGN KEY (`guru_id`) REFERENCES `Guru`(`guru_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rujukan` ADD CONSTRAINT `Rujukan_detail_register_id_fkey` FOREIGN KEY (`detail_register_id`) REFERENCES `DetailRegister`(`detail_register_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RombelSiswa` ADD CONSTRAINT `RombelSiswa_rombel_id_fkey` FOREIGN KEY (`rombel_id`) REFERENCES `Rombel`(`rombel_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RombelSiswa` ADD CONSTRAINT `RombelSiswa_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `Siswa`(`siswa_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
