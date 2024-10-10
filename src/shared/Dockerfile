# Use official MySQL image from Docker Hub
FROM mysql:latest

# Environment variables
ENV MYSQL_ROOT_PASSWORD=admin
ENV MYSQL_DATABASE=projeto_integrador1
ENV MYSQL_USER=myuser
ENV MYSQL_PASSWORD=mypassword

# Copy SQL script to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/

# Expose port
EXPOSE 3306
