const express = require('express');
const { signup, login } = require('../controllers/Auth');
const {loginValidator, createUserValidator ,validate} = require('../middleware/validators')
const router = express.Router();

router.post('/signup',createUserValidator(), validate, signup);
router.post('/login',loginValidator(),validate, login);

module.exports = router; 