-- CreateTable
CREATE TABLE `Agenda` (
    `agendaId` INTEGER NOT NULL AUTO_INCREMENT,
    `dataHoraInicial` DATETIME(3) NOT NULL,
    `dataHoraFinal` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Agenda_agendaId_key`(`agendaId`),
    PRIMARY KEY (`agendaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servico` (
    `servicoId` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeServico` VARCHAR(191) NOT NULL,
    `valorServico` DECIMAL(65, 30) NOT NULL,

    UNIQUE INDEX `Servico_servicoId_key`(`servicoId`),
    PRIMARY KEY (`servicoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `clienteId` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeCliente` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cliente_clienteId_key`(`clienteId`),
    PRIMARY KEY (`clienteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Login` (
    `loginId` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Login_loginId_key`(`loginId`),
    UNIQUE INDEX `Login_usuario_key`(`usuario`),
    UNIQUE INDEX `Login_email_key`(`email`),
    PRIMARY KEY (`loginId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Atendimento` (
    `atendimentoId` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `agendaId` INTEGER NOT NULL,
    `valorTotal` DECIMAL(65, 30) NOT NULL,

    UNIQUE INDEX `Atendimento_atendimentoId_key`(`atendimentoId`),
    PRIMARY KEY (`atendimentoId`, `clienteId`, `agendaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AtendimentoHasServico` (
    `atendimentoHasServicoId` INTEGER NOT NULL AUTO_INCREMENT,
    `atendimentoId` INTEGER NOT NULL,
    `servicoId` INTEGER NOT NULL,
    `itemServico` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AtendimentoHasServico_atendimentoHasServicoId_key`(`atendimentoHasServicoId`),
    PRIMARY KEY (`atendimentoHasServicoId`, `atendimentoId`, `servicoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Atendimento` ADD CONSTRAINT `Atendimento_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`clienteId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atendimento` ADD CONSTRAINT `Atendimento_agendaId_fkey` FOREIGN KEY (`agendaId`) REFERENCES `Agenda`(`agendaId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AtendimentoHasServico` ADD CONSTRAINT `AtendimentoHasServico_atendimentoId_fkey` FOREIGN KEY (`atendimentoId`) REFERENCES `Atendimento`(`atendimentoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AtendimentoHasServico` ADD CONSTRAINT `AtendimentoHasServico_servicoId_fkey` FOREIGN KEY (`servicoId`) REFERENCES `Servico`(`servicoId`) ON DELETE RESTRICT ON UPDATE CASCADE;
