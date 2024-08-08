import React, { useContext } from 'react'
import AppContext from './context/AppContext.jsx'
import ShowProduct from './components/product/ShowProduct.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from './components/product/ProductDetail.jsx';
import SearchProduct from "./components/product/SearchProduct";
import Navbar from './components/Navbar.jsx';
import Register from './components/user/Register.jsx';
import Login from "./components/user/Login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/user/Profile.jsx';
import Cart from './components/Cart.jsx';
import Address from './components/Address.jsx'
import Checkout from './components/Checkout.jsx'
const App = () => {
  // const { } = useContext(AppContext)
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>

        <Route path='/' element={<ShowProduct />} />

        <Route path="/product/search/:term" element={<SearchProduct />} />

        <Route path='product/:id' element={<ProductDetail />} />


        <Route path='/register' element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Address />} />
        <Route path="/checkout" element={<Checkout />} />

      </Routes>
    </Router>
  )
}

export default App
