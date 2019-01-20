const express = require('express');
const router = express.Router();
const userController  = require('../controller/users');
const bookingController = require('../controller/booking');

router.post('' , userController.authMiddlware , bookingController.createBooking);
router.get('/manage' , userController.authMiddlware , bookingController.manageBooking);

module.exports = router;