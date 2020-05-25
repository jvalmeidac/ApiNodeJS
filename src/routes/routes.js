require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const pessoa = require("../controllers/pessoaController");
const auth = require("../controllers/authController");

const router = express.Router();

//Verificar Token
function verifyJwt(req, res, next) {
  let token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided!" });
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to autenticate token!" });
    req.userId = decoded.id;
    next();
  });
}

//Requisições
router.get("/", verifyJwt, pessoa.get);
router.post("/", verifyJwt, pessoa.post);
router.get("/:pessoaID", verifyJwt, pessoa.getID);
router.delete("/:pessoaID", verifyJwt, pessoa.delete);
router.put("/:pessoaID", verifyJwt, pessoa.put);

//Autenticação
router.post("/login", auth.login);
// router.get("/logout", auth.logout);

module.exports = router;
