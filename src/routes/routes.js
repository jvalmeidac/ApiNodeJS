const express = require('express');
const pessoaDB = require('../data/PessoasDB.json')
const controller = require('../controllers/pessoaController')

const router = (app) => {
    app.get('/', controller.get);
    app.post('/', controller.post);
    app.delete('/:pessoaID', controller.delete);
    app.put('/:pessoaID', controller.put);
}
module.exports = router;