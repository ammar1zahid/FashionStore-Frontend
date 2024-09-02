import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/home/Home';
import ProductList from './pages/poductsList/ProductList';
import Product from './pages/productPage/ProductPage';
import Register from './pages/register/register';
import Login from './pages/login/Login';
import Cart from './pages/cart/cart';

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>   
          <Route path="/category" element={<ProductList/>}></Route>   
          <Route path="/category" element={<ProductList/>}></Route>   
          <Route path="/product" element={<Product/>}></Route>   
          <Route path="/register" element={<Register/>}></Route>   
          <Route path="/login" element={<Login/>}></Route>   
          <Route path="/cart" element={<Cart/>}></Route>   
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
