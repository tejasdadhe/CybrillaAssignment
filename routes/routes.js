const listProduct = require ('../controllers/listProducts');
const viewCart = require ('../controllers/viewCart');
const addProduct = require ('../controllers/addProduct');
const bodyParser = require('body-parser')


var urlencodedParser = bodyParser.urlencoded({ extended: false })



const express = require('express');
const router = express.Router();


router.get('/getProducts',listProduct);
router.get('/viewCart',viewCart);
router.post('/addProduct' ,urlencodedParser,addProduct);

module.exports = router;


