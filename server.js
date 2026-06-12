const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/Scripts", express.static(path.join(__dirname, "Scripts")));
app.use("/Styles", express.static(path.join(__dirname, "Styles")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ===== BANCO =====

const conexao = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "corrida_blocos"
});

// ===== API =====

app.post("/corrida", (req, res) => {

    const vencedor = req.body.vencedor;

    conexao.query(
        "INSERT INTO corridas(vencedor) VALUES(?)",
        [vencedor],
        (erro) => {

            if (erro) {
                console.error(erro);
                return res.status(500).send("Erro");
            }

            res.send("OK");
        }
    );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
