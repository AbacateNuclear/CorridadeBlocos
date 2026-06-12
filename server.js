const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"corrida_blocos"
});

app.post("/corrida",(req,res)=>
{
    const vencedor = req.body.vencedor;

    conexao.query(
        "INSERT INTO corridas(vencedor) VALUES(?)",
        [vencedor]
    );

    res.send("OK");
});

app.listen(3000);