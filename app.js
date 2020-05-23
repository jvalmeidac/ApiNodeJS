const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/routes/routes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3333;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API de Pessoas",
      description: "Documentação da API",
      contact: {
        name: "João Victor Almeida Costa",
      },
      servers: ["http://localhost:3333"],
    },
  },
  // ['.routes/*.js']
  apis: ["./src/controllers/pessoaController.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/", routes);

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

module.exports = app;
