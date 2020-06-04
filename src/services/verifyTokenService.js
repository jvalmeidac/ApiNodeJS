const jwt = require("jsonwebtoken");

const token = {}


//Verificando se o token é válido
token.verifyToken = (req, res, next) => {
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
  })
};

module.exports = token;