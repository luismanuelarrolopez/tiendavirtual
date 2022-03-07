import React from "react";
import LogoCarvajal from "../images/logo-head.png"
import {Box,AppBar,Container,Toolbar,Grid,Card,Typography, CardContent,Button,CardMedia,TextField} from '@mui/material'
import {Link,useNavigate} from 'react-router-dom'

export default function Header(){
    const navigate = useNavigate()
    return(
        <Box sx={{flexGrow: 1}}>
            <AppBar position='static' color="transparent">
                <Container>
                    <Toolbar>
                        <Typography>
                        <a href="/">
                            <div className="logo">
                            <img src={LogoCarvajal} alt="" width={200}/>
                            </div>
                        </a>
                        </Typography>
                        <Typography variant='h6' sx={{flexGrow: 0.25}}> 
                            <Link to="/" style={{textDecoration:'none', color:'black'}}> Catalogo </Link>
                        </Typography>
                        <Typography variant='h6' sx={{flexGrow: 0.25}}> 
                            <Link to="/carrito" style={{textDecoration:'none', color:'black'}}> Administrar Productos </Link>
                        </Typography>
                        <Button variant='contained' color='primary' onClick={()=> navigate('/form')}>
                            Agregar Producto
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}