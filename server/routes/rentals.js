const express = require('express');
const router = express.Router();
const rentalController = require('../controller/rental');
const userController  = require('../controller/users');

router.get('/secret' ,userController.authMiddlware , function(req,res){
    res.send({'secret': true})
});

router.get('/:id' , rentalController.findById);
router.get('' , rentalController.findAll);
router.post('' , userController.authMiddlware , rentalController.createRental);

module.exports = router;