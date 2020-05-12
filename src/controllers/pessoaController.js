const { v4: uuidv4 } = require('uuid');
const pessoaDB = require('../data/PessoasDB.json')
const {createPatch, applyPatch} = require('array-patch');

exports.get = (req, res) => {
    res.status(200).json(pessoaDB)
}

exports.post = (req, res) => {
    pessoaDB.Pessoas.dados.push({
        ID: uuidv4(),
        Nome: req.body.Nome,
        Idade: req.body.Idade
    });
    res.status(201).json(pessoaDB);
}

exports.delete = (req, res) => {
    const { pessoaID } = req.params;

    const getById = pessoaDB.Pessoas.dados.findIndex(p => p.ID == pessoaID);
    if (pessoaID === -1) {
        res.status(404).json({
            message: "Pessoa não encontrada!",
            success: false,
            pessoas: pessoaDB.Pessoas
        })
    } else {
        pessoaDB.Pessoas.dados.splice(getById, 1);
        res.status(200).json(pessoaDB)
    }
}

exports.put = (req, res) => {
    const {pessoaID} = req.params;

    const getById = pessoaDB.Pessoas.dados.findIndex(p => p.ID == pessoaID);
    if (pessoaID === -1) {
        res.status(404).json({
            message: "Pessoa não encontrada!",
            success: false,
            pessoas: pessoaDB.Pessoas
        })
    } else {
        const newPessoa = {
            ID: pessoaID,
            Nome: req.body.Nome,
            Idade: req.body.Idade
        }
        pessoaDB.Pessoas.dados.splice(getById, 1, newPessoa);

        res.status(200).json(pessoaDB);

    }
}

exports.patch = (req, res) => {
    const array = pessoaDB.Pessoas.dados;
    const newArray = req.body;
    var patch = createPatch(array, newArray);
    console.log(patch)

}