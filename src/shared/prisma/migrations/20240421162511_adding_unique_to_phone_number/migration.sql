/*
  Warnings:

  - A unique constraint covering the columns `[numeroTelefone]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `numeroTelefone` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `numeroTelefone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Cliente_numeroTelefone_key` ON `Cliente`(`numeroTelefone`);
