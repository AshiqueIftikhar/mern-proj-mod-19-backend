const express = require('express');
const { register, login } = require('../controllers/userController');
const router = express.Router();

// Register new user api 
router.post("/user-register", register);

// Login user api
router.post("/user-login", login);