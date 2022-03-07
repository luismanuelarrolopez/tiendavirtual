const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app =express();

const productsRoutes = require('./routes/products.routes');
const carritotRoutes = require('./routes/carrito.routes');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(productsRoutes,carritotRoutes);
app.use((err,req,res,next)=> {
  return res.json({
    message: err.message
  })
})
app.listen(4000)
console.log('Server on port 4000')