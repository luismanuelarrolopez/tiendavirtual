import React from "react";
import {ProductList} from "./componentes/ProductList";
import {ProductForm} from "./componentes/ProductForm";
import {ProductCart} from "./componentes/ProductCart";
import Header from "./componentes/Header";
import 'boxicons';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import {Container} from '@mui/material';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Container>
        <Routes>
          <Route path='/' element={<ProductList/>}/>
          <Route path='/form' element={<ProductForm/>}/>
          <Route path='/carrito' element={<ProductCart/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;