-- DropForeignKey
ALTER TABLE `filial` DROP FOREIGN KEY `Filial_enderecoId_fkey`;

-- AddForeignKey
ALTER TABLE `Filial` ADD CONSTRAINT `Filial_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `Endereco`(`enderecoId`) ON DELETE CASCADE ON UPDATE CASCADE;
