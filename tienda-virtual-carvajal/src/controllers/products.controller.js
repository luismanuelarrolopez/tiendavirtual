const bd = require('../db')

const getAllProducts = async (req,res,next) => {
    try{
        const allProducts = await bd.query("SELECT * FROM PRODUCTO");
        res.json(allProducts.rows);
    }catch(error){
        next(error);
    }
}

const getAProduct = async (req,res,next) => {
    try{
        const {id} = req.params;

        const aProduct = await bd.query('SELECT * FROM PRODUCTO WHERE idproducto= $1 ',[id]);
    
        if(aProduct.rows.length === 0) return res.status(404).json({
            message: 'Producto no encontrado'
        });
        res.json(aProduct.rows[0])
    }catch(error){
        next(error);
    }
}

const createAProduct = async(req,res,next) => {
    const {nombre,precio,stock,descripcion,imagen} = req.body

    try{
        const result = await bd.query("INSERT INTO producto(nombre,precio,stock,descripcion) VALUES ($1,$2,$3,$4) RETURNING *",[
            nombre,precio,stock,descripcion]);
        res.json(result.rows[0]);
    }catch(error){
        next(error);
    }
};

const deleteAProduct = async(req,res,next) => {
    try{
        const {id} = req.params;

        const deleteProduct = await bd.query("DELETE FROM PRODUCTO WHERE id= $1 ",[id]);
    
        if(deleteProduct.rows.length === 0) return res.status(404).json({
            message: 'Producto no encontrado'
        });
        return res.sendStatus(204)
    }catch(error){
        next(error);
    }
}

const updateAProduct = async(req,res,next) => {
    try{
        const {op,idproducto,stock} = req.body
        if(op=='suma'){
            const updateProduct = await bd.query("UPDATE producto SET stock=producto.stock + $1 WHERE idproducto=$2 RETURNING*",[stock,idproducto]);
        }if(op=='resta'){
            const updateProduct = await bd.query("UPDATE producto SET stock=producto.stock - $1 WHERE idproducto=$2 RETURNING*",[stock,idproducto]);
        }
        if(updateProduct.rows.length === 0) return res.status(404).json({
            message: 'Producto no encontrado'
        });
    }catch(error){
        next(error);
    }
}

module.exports ={
    getAllProducts,
    createAProduct,
    deleteAProduct,
    updateAProduct,
    getAProduct,
}