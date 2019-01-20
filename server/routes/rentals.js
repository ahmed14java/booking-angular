const express = require('express');
const router = express.Router();
const rentalController = require('../controller/rental');
const userController  = require('../controller/users');

router.get('/secret' ,userController.authMiddlware , function(req,res){
    res.send({'secret': true})
});

router.get('/manage' , userController.authMiddlware , rentalController.manageRental);
router.get('/:id' , rentalController.findById);
router.get('' , rentalController.findAll);
router.post('' , userController.authMiddlware , rentalController.createRental);
router.delete('/:id' , userController.authMiddlware , rentalController.deleteRental);


module.exports = router;