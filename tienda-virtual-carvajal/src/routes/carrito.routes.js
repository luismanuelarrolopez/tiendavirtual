const {Router} = require('express');
const {getAllCart,getACart,createACart,deleteACart,updateACart} = require('../controllers/carrito.controller') 
const router = Router();

router.get('/carrito', getAllCart);

router.get('/carrito/:id',getACart);

router.post('/carrito',createACart);

router.delete('/carrito/:id',deleteACart);

router.put('/carrito/:id',updateACart);

module.exports = router;