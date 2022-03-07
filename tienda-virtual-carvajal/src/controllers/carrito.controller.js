const bd = require('../db')

const getAllCart = async (req,res,next) => {
    try{
        const allCart = await bd.query("SELECT * FROM carrocompras");
        res.json(allCart.rows);
    }catch(error){
        next(error);
    }
}

const getACart = async (req,res,next) => {
    try{
        const {id} = req.params;

        const aCart = await bd.query("SELECT * FROM carrocompras INNER JOIN producto ON carrocompras.idproductocarro = producto.idproducto where idusuariocarro= $1 ",[id]);
        res.json(aCart.rows)
        if(aCart.rows.length === 0) return res.status(404).json({
            message: 'Carro no encontrado'
        });
    }catch(error){
        next(error);
    }
}

const createACart = async(req,res,next) => {
    const {idusuariocarro,idproductocarro,cantidad} = req.body

    try{
        const result = await bd.query("INSERT INTO carrocompras(idusuariocarro,idproductocarro,cantidad) VALUES ($1,$2,$3) RETURNING *",[
            idusuariocarro,idproductocarro,cantidad]);
        res.json(result.rows[0]);
    }catch(error){
        next(error);
    }
};

const deleteACart = async(req,res,next) => {
    try{
        const {id} = req.params;

        const deleteCart = await bd.query("DELETE FROM carrocompras WHERE idcarro= $1 ",[id]);
    
        if(deleteCart.rows.length === 0) return res.status(404).json({
            message: 'Carro no encontrado'
        });
        return res.sendStatus(204)
    }catch(error){
        next(error);
    }
}

const updateACart = async(req,res) => {
    const {id} = req.params;
    const {nombre,precio,stock,descripcion,imagen} = req.body
    const updateCart = await bd.query("UPDATE carrocompras SET nombre=$1,precio=$2,stock=$3,descripcion=$4,imagen=$5 WHERE id=$5 RETURNING*",[
        nombre,precio,stock,descripcion,imagen,id]);
    if(updateCart.rows.length === 0) return res.status(404).json({
        message: 'Carro no encontrado'
    });
    next(error);
}

module.exports ={
    getAllCart,
    createACart,
    deleteACart,
    updateACart,
    getACart
}