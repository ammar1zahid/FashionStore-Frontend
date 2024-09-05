import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Home from './pages/home/Home';
import ProductList from './pages/poductsList/ProductList';
import Product from './pages/productPage/ProductPage';
import Register from './pages/register/register';
import Login from './pages/login/Login';
import Cart from './pages/cart/cart';
import { useSelector } from 'react-redux';
import { RootState } from "./redux/store"; 

function App() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>     
          <Route path="/category/:Cat" element={<ProductList/>}></Route>   
          <Route path="/product/:id" element={<Product/>}></Route>   
          <Route path="/register" element={<Register/>}></Route>   
          <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
          <Route path="/cart" element={<Cart/>}></Route>   
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
