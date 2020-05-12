const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3333;

routes(app);

// const swaggerOptions = {
//     swaggerDefinition: {
//         info:{
//             title: "Api de Pessoas",
//             description: "Documentação da API",
//             contact: {
//                 name: "João Victor Almeida Costa"
//             },
//             apis: ["./src/controllers/*.js"]
//         },
//     },
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`app running on port ${port}`);
});

module.exports = app;
