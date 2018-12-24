const express = require('express');
const router = express.Router();
const rentalController = require('../controller/rental');


router.get('' , rentalController.findAll);
router.get('/:id' , rentalController.findById);

module.exports = router;