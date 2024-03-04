import express from "express";

const app = express();

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "projeto_integrador1"
})

//testando a conexão
connection.connect(function(err: any)
{
    if(err) throw err
    {
        console.log("A conexão foi bem-sucedida");
    }
})



// app.use(express.json());
app.listen(5000);