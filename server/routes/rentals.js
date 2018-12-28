const express = require('express');
const router = express.Router();
const rentalController = require('../controller/rental');
const userController  = require('../controller/users');

router.get('/secret' ,userController.authMiddlware , function(req,res){
    res.send({'secret': true})
});

router.get('' , rentalController.findAll);
router.get('/:id' , rentalController.findById);

module.exports = router;