import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import ProductList from './pages/poductsList/ProductList';
import Product from './pages/productPage/ProductPage';
import Register from './pages/register/register';
import Login from './pages/login/Login';
import Cart from './pages/cart/cart';
import { useSelector } from 'react-redux';
import { RootState } from "./redux/store"; 
import Wishlist from './pages/wishlist/Wishlist';

function App() {
  const user = useSelector((state: RootState) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route: Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Public Route: Register Page */}
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

        {/* Public Route: Login Page */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

        {/* Protected Routes: Redirect to login if not authenticated */}
        <Route
          path="/category/:Cat"
          element={user ? <ProductList /> : <Navigate to="/login" />}
        />
        <Route
          path="/product/:id"
          element={user ? <Product /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/wishlist"
          element={user ? <Wishlist /> : <Navigate to="/login" />}
        />

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
