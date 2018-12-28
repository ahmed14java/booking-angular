const express = require('express');
const router = express.Router();

const usersController = require('../controller/users');

router.post('/auth' , usersController.login);
router.post('/register' , usersController.register);

module.exports = router;