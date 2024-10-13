/*
  Warnings:

  - Added the required column `filialId` to the `Atendimento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `atendimento` ADD COLUMN `filialId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Filial` (
    `filialId` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `enderecoId` INTEGER NOT NULL,

    UNIQUE INDEX `Filial_filialId_key`(`filialId`),
    UNIQUE INDEX `Filial_nome_key`(`nome`),
    PRIMARY KEY (`filialId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `enderecoId` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `complemento` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Endereco_enderecoId_key`(`enderecoId`),
    PRIMARY KEY (`enderecoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Filial` ADD CONSTRAINT `Filial_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `Endereco`(`enderecoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atendimento` ADD CONSTRAINT `Atendimento_filialId_fkey` FOREIGN KEY (`filialId`) REFERENCES `Filial`(`filialId`) ON DELETE RESTRICT ON UPDATE CASCADE;
