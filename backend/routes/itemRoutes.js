const express = require('express');
const ctrl = require('../controllers/itemController');
const router = express.Router();

router.get('/', ctrl.getItems);
router.post('/', ctrl.createItem);
// TODO 4: register GET /:id, PUT /:id and DELETE /:id
router.get('/:id', ctrl.getItemById);
router.put('/:id', ctrl.updateItem);
router.delete('/:id', ctrl.deleteItem);

module.exports = router;
