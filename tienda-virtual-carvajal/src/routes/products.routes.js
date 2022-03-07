const {Router} = require('express');
const {getAllProducts,getAProduct,createAProduct,deleteAProduct,updateAProduct} = require('../controllers/products.controller') 
const router = Router();

router.get('/products', getAllProducts);

router.get('/products/:id',getAProduct);

router.post('/products',createAProduct);

router.delete('/products/:id',deleteAProduct);

router.put('/products',updateAProduct);

module.exports = router;