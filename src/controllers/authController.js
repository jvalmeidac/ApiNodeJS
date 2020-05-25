require("dotenv-safe").config();
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

const api = {};

api.login = (req, res) => {
  if (req.body.user == "apiowner" && req.body.pwd === "123") {
    //Authorization
    const id = uuid();

    let token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 60, //Seconds
    });
    res.status(200).send({ auth: true, token: token });
  }

  res.status(500).send("Invalid Login!");
};

// api.logout = (req, res) => {
//   res.status(200).send({ auth: false, token: null });
// };

module.exports = api;
