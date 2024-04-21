/*
  Warnings:

  - Added the required column `dataNasc` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `dataNasc` DATETIME(3) NOT NULL;
