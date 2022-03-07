import {useState,useEffect} from "react";
import {Grid,Card,Typography,CardContent,TextField,Button, CircularProgress} from '@mui/material'
import {useNavigate} from 'react-router-dom'

export const ProductForm =() =>{
    const [product, setProduct] = useState({
        nombre: "",
        precio: "",
        stock: "",
        descripcion:"",
      });
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        setLoading(true);
        
        const res = await fetch(" http://localhost:4000/products ",{
            method: "POST",
            body: JSON.stringify(product),
            headers:{
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        setLoading(false);
        navigate('/');
    };
    const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });
    return(
        <Grid container direction="column" alignItems="center" justifyContent="center">
            <Grid item xs={3}>
                <Card 
                sx={{mt:20}} 
                style={{backgroundColor: '#d8f3dc',
                padding: '1rem',}}>
                    <Typography>
                        Agregar un nuevo producto
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name="nombre"
                                variant='filled'
                                label='Nombre del producto'
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'}}
                                inputProps={{style:{color: '#fb8500'}}}
                                onChange={handleChange}
                            />
                            <TextField
                                name="precio"
                                variant='filled'
                                label='Precio del producto'
                                type='number'
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'}}
                                inputProps={{style:{color: '#fb8500'}}}
                                onChange={handleChange}
                            />
                            <TextField
                                name="stock"
                                variant='filled'
                                label='Cantidad en stock'
                                type='number'
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'}}
                                inputProps={{style:{color: '#fb8500'}}}
                                onChange={handleChange}
                            />
                            <TextField
                                name="descripcion"
                                variant='filled'
                                label='Descripcion'
                                multiline
                                rows={4}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'}}
                                inputProps={{style:{color: '#fb8500'}}}
                                onChange={handleChange}
                            />
                            <Button variant='contained' color='primary' type='submit' disabled={!product.nombre || !product.precio || !product.stock || !product.descripcion}>
                                    {loading ? <CircularProgress
                                        color='inherit'
                                        size={24}
                                    /> : 'Agregar'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}