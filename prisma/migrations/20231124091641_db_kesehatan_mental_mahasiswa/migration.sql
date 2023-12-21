/*
  Warnings:

  - You are about to alter the column `tanggal` on the `sensors` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `sensors` MODIFY `tanggal` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `saves` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal` DATETIME NOT NULL,
    `detak_jantung` VARCHAR(20) NOT NULL DEFAULT '0',
    `kelembapan_kulit` VARCHAR(20) NOT NULL DEFAULT '0',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
