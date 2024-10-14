const { getSingleProduct, getProducts, addProduct, updateProduct, deleteProduct, ratingQueryProduct } = require('../controller/product.controller');

const router= require('express').Router();




router.get('/products',getProducts);
router.get('/product/query/',ratingQueryProduct);
router.get('/products/:pId',getSingleProduct);
router.post('/product/add',addProduct);
router.patch('/product/update/:pId',updateProduct);
router.delete('/product/delete/:pId',deleteProduct);





module.exports= router;