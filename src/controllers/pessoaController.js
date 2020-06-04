const { v4: uuidv4 } = require("uuid");
const pessoaDB = require("../data/PessoasDB.json");

const controller = {};
// Routes
/**
 * @swagger
 * /:
 *  get:
 *    description: Retorna uma lista de pessoas
 *    responses:
 *      '200':
 *        description: A successful response
 */
controller.get = (req, res) => {
  res.status(200).json(pessoaDB);
};

/**
 * @swagger
 * /{id}:
 *  get:
 *    description: Retorna uma pessoa da lista
 *    responses:
 *      '200':
 *        description: A successful response
 */
controller.getID = (req, res) => {
  const { pessoaID } = req.params;
  const pessoa = pessoaDB.Pessoas.dados.find((p) => p.ID == pessoaID);
  res.status(200).json(pessoa);
};

/**
 * @swagger
 * /:
 *  post:
 *    description: Adiciona uma nova pessoa a lista
 *    responses:
 *      '201':
 *        description: A successful response
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 */
controller.post = (req, res) => {
  pessoaDB.Pessoas.dados.push({
    ID: uuidv4(),
    Nome: req.body.Nome,
    Idade: req.body.Idade,
  });
  res.status(201).json(pessoaDB);
};

/**
 * @swagger
 * /{id}:
 *    delete:
 *      description: Remove uma pessoa da lista
 *    responses:
 *      '204':
 *        description: A successful response
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 */
controller.delete = (req, res) => {
  const { pessoaID } = req.params;

  const getById = pessoaDB.Pessoas.dados.findIndex((p) => p.ID == pessoaID);
  if (pessoaID === -1) {
    res.status(404).json({
      message: "Pessoa não encontrada!",
      success: false,
      pessoas: pessoaDB.Pessoas,
    });
  } else {
    pessoaDB.Pessoas.dados.splice(getById, 1);
    res.status(200).json(pessoaDB);
  }
};

/**
 * @swagger
 * /{id}:
 *    put:
 *      description: Atualiza uma pessoa da lista
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *          description: A success response
 *
 */
controller.put = (req, res) => {
  const { pessoaID } = req.params;

  const getById = pessoaDB.Pessoas.dados.findIndex((p) => p.ID == pessoaID);
  if (pessoaID === -1) {
    res.status(404).json({
      message: "Pessoa não encontrada!",
      success: false,
      pessoas: pessoaDB.Pessoas,
    });
  } else {
    const newPessoa = {
      ID: pessoaID,
      Nome: req.body.Nome,
      Idade: req.body.Idade,
    };
    pessoaDB.Pessoas.dados.splice(getById, 1, newPessoa);

    res.status(200).json(pessoaDB);
  }
};

module.exports = controller;
