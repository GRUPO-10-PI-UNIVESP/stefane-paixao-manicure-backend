# Container Docker do MySQL

Este repositório contém arquivos para configurar um container Docker do MySQL. Inclui um Dockerfile para construir a imagem do container e um script init.sql para inicializar um banco de dados MySQL.

## Construindo e Executando o Container

### Pré-requisitos

Antes de executar o container do MySQL, você precisa ter o Docker instalado em sua máquina. Você pode baixar e instalar o Docker no site oficial: [https://www.docker.com/get-started](https://www.docker.com/get-started)

### Construindo a Imagem Docker

1. Faça o build da imagem do container mysql:

   ```bash
    docker build -t mysql-container .
   ```

2. Rode o container, expondo a porta 3306:

   ```bash
   docker run -d --name mysql-container -p 3306:3306 mysql-container
   ```
