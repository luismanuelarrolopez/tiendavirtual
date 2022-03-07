import {useState,useEffect} from "react";
import {Grid,Card,Typography, CardContent,Button,CardMedia,TextField} from '@mui/material'
import {useNavigate} from 'react-router-dom'

export const ProductCart =() =>{

    const [cart, setCart] = useState([]);
    const [products, setProduct] = useState([]);

    var subTotal = [0];
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()

    const loadProducts = async () =>{
        const response = await fetch(" http://localhost:4000/products ")
        const data = await response.json()
        console.log(data)
        setProduct(data)
    }

    useEffect(() =>{
        loadProducts()
    },[])
    const SumaSubTotales = () =>{
        const suma = subTotal.reduce((anterior,actual) =>{
            return anterior+actual;
        });
        return suma
    }

    const SubTotales = (subtotal) =>{
        subTotal.push(subtotal);
    }
    const loadCart = async () =>{
        const response = await fetch(" http://localhost:4000/carrito/Luismanuelarro ")
        const data = await response.json()
        console.log(data)
        setCart(data)
    }
    const actStock = async(id,stock)=>{
        
        const res = await fetch('http://localhost:4000/products/',{
            method: "PUT",
            body: JSON.stringify({op: 'suma',stock: stock, idproducto: id}),
            headers:{
                "Content-Type": "application/json"
            }
        });
    }
    const handleDelete = async (id,idproducto,cantidad,stock) => {
        console.log(idproducto);
        setLoading(true);
        await fetch(`http://localhost:4000/carrito/${id}`,{
            method: "DELETE",
        })
        setCart(
            cart.filter(cart => cart.idcarro !== id));
        actStock(idproducto,cantidad);
        setLoading(false);
    }

    useEffect(() =>{
        loadCart()
    },[])

    return(
        
        <>
        <Grid justifyContent="center" alignItems="center">
        <h3>____</h3>      
        <Card 
                style={{
                    marginBottom: ".5rem",
                    backgroundColor: '#d8f3dc',
                    margin: ".7rem",
                }}>
                    <CardContent style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <div><Typography>DETALLE PEDIDO</Typography></div>
                        <div><Typography>SUBTOTAL</Typography></div>
                        <div><Typography>OPCIONES</Typography></div>
                    </CardContent>
        </Card>
            {cart.map((cart)=>( 
                <Card xs={3}
                style={{
                    marginBottom: ".5rem",
                    backgroundColor: '#d8f3dc',
                    margin: ".7rem",
                }}
                key={cart.idcarro}
                >
                    <CardContent style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <div>
                            <Typography>Producto: {cart.nombre}</Typography>
                            <Typography>Precio Und: {cart.precio}</Typography>
                            <Typography>Cantidad: {cart.cantidad}</Typography>
                            
                        </div>
                        <div>
                        <Typography> $ {cart.precio * cart.cantidad}{SubTotales(cart.precio * cart.cantidad)} </Typography>
                        </div>
                        <div>
                            <Button variant='contained' color='inherit'
                            onClick={()=> alert('Si desea agregar mas productos vuelva al catalogo')}>Editar Cantidad</Button>
                            <Button variant='contained' color='warning'
                            style={{marginLeft: ".5rem"}}
                            onClick={()=> handleDelete(cart.idcarro,cart.idproductocarro,cart.cantidad,products.stock)}>Eliminar</Button>
                            
                        </div>
                        
                    </CardContent>
                    </Card>
                ))}
                <Card 
                style={{
                    marginBottom: ".5rem",
                    backgroundColor: '#d8f3dc',
                    margin: ".7rem",
                }}>
                    <CardContent style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <div></div>
                        <div>
                            <Typography>TOTAL: ${SumaSubTotales()}</Typography>
                            
                        </div>
                        <div></div>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
}