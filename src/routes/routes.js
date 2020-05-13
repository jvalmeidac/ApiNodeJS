const express = require('express');
const controller = require('../controllers/pessoaController')

const router = express.Router();

router.get('/', controller.get);
router.post('/', controller.post);
router.get('/:pessoaID', controller.getID);
router.delete('/:pessoaID', controller.delete);
router.put('/:pessoaID', controller.put);

module.exports = router;