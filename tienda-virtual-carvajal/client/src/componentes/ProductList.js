import {useState,useEffect} from "react";
import {Grid,Card,Typography, CardContent,Button,CardMedia,TextField} from '@mui/material'
import {useNavigate} from 'react-router-dom'

export const ProductList =() =>{

    const [products, setProduct] = useState([]);

    const [myProduct, setMyProducts] = useState({
        cantidad: "",
    });
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const productsAdd = async (idProduct,stock,cantidad)=>{
        setLoading(true);
        if(cantidad==""){
            alert('DEBE INGRESAR UN VALOR');
        }else{
            if(stock > 0){
                const res = await fetch('http://localhost:4000/carrito',{
                    method: "POST",
                    body: JSON.stringify({idusuariocarro: 'Luismanuelarro',idproductocarro: idProduct, cantidad: cantidad}),
                    headers:{
                        "Content-Type": "application/json"
                    }
                });
                actStock(idProduct,cantidad)
                const data = await res.json();
                setLoading(false);
                navigate('/carrito');
            }
            else{
                alert('Lo sentimos, el producto no esta disponible');
            }
        }
    };
    const actStock = async(id,stock)=>{
        const res = await fetch('http://localhost:4000/products/',{
            method: "PUT",
            body: JSON.stringify({op:'resta', stock: stock, idproducto: id}),
            headers:{
                "Content-Type": "application/json"
            }
        });
    }

    const loadProducts = async () =>{
        const response = await fetch(" http://localhost:4000/products ")
        const data = await response.json()
        console.log(data)
        setProduct(data)
    }

    useEffect(() =>{
        loadProducts()
    },[])

    const handleChange = (e) =>
    setMyProducts({ ...myProduct, [e.target.name]: e.target.value });

    return(
        <>
            <h1>_____</h1>
            <Grid  container rowSpacing={1}>
            {products.map((product)=>(
                <Grid item xs={4}>
                <Card sx={{ maxWidth: 345, mt: 1 }}
                style={{
                    backgroundColor: '#d8f3dc',
                }}>
                    <CardMedia
                        component="img"
                        height="100"
                        image={product.imagen}
                        alt=""
                    />
                    <CardContent>
                        <Typography>PRODUCTO: {product.nombre}</Typography>
                        <Typography>DESCRIPCION: {product.descripcion}</Typography>
                        <Typography>PRECIO: ${product.precio}</Typography>
                        <Typography>STOCK: {product.stock} (INGRESE UN VALOR QUE ESTE EN EL STOCK)</Typography>

                        <TextField
                            name= 'cantidad'
                            variant='filled'
                            label='Cantidad'
                            type='number'
                            required
                            helperText='Ingrese un valor'
                            sx={{
                                display: 'block',
                                margin: '.5rem 0'}}
                            inputProps={{style:{color: '#fb8500'}}}
                            onChange={handleChange}
                            
                        />

                        <Button variant='contained' color='inherit' 
                        onClick={()=> productsAdd(product.idproducto,product.stock,myProduct.cantidad)} 
                        disabled={myProduct.cantidad<0 || myProduct.cantidad>product.stock}>Agregar al carro</Button>
                    </CardContent>
                    </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}