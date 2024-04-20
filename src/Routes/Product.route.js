const Product  = require('../controllers/Product.controller');

const router = require('express').Router();


router.get('/',Product.GetAllProduct)
router.post('/createProducts',Product.CreateProducts)
router.post('/edit',Product.Edit)
router.post('/update',Product.Update)
router.post('/insertProductData',Product.insertProductData)


module.exports = router;