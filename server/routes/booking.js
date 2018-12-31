const express = require('express');
const router = express.Router();
const userController  = require('../controller/users');
const bookingController = require('../controller/booking');

router.post('' , userController.authMiddlware , bookingController.createBooking);

module.exports = router;