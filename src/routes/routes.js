require("dotenv-safe").config();
const express = require("express");
const pessoa = require("../controllers/pessoaController");
const auth = require("../controllers/authController");
const token = require("../services/verifyTokenService");

const router = express.Router();

//Requisições
router.get("/", token.verifyToken, pessoa.get);
router.post("/", token.verifyToken, pessoa.post);
router.get("/:pessoaID", token.verifyToken, pessoa.getID);
router.delete("/:pessoaID", token.verifyToken, pessoa.delete);
router.put("/:pessoaID", token.verifyToken, pessoa.put);

//Autenticação
router.post("/login", auth.login);
// router.get("/logout", auth.logout);

module.exports = router;
