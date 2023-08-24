const express = require('express');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const authVerifyMiddleware = require('../Middleware/AuthVerifyMiddleware');
const router = express.Router();

// Register new user api 
router.post("/user-register", userController.register);

// Login user api
router.post("/user-login", userController.login);

// Create Product api
router.post('/create-product', authVerifyMiddleware, productController.createProduct)

// Get All Product List api
router.get('/get-all-products', productController.getAllProducts)

// Create Cart api
router.post("/create-cart", authVerifyMiddleware, cartController.createCart);

// Get All Cart List api
router.get("/cart-list", authVerifyMiddleware, cartController.getAllCartList)

// Delete Cart product api
router.delete("/delete-cart/:id", authVerifyMiddleware, cartController.deleteCart)

module.exports = router;