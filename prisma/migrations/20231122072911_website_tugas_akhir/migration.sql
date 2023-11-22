-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `detak_jantung` VARCHAR(20) NOT NULL,
    `kelembapan_kulit` VARCHAR(20) NOT NULL,
    `status` VARCHAR(100) NULL,
    `tanggal` DATE NOT NULL,
    `token` VARCHAR(200) NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sensors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal` DATETIME NOT NULL,
    `detak_jantung` VARCHAR(20) NOT NULL DEFAULT '0',
    `kelembapan_kulit` VARCHAR(20) NOT NULL DEFAULT '0',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
