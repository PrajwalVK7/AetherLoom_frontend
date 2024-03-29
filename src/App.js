import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Auths from "./pages/Auths";
import Dashboard from "./pages/Dashboard";
import ProductData from "./pages/ProductData";
import { useState } from "react";

function App() {
  const [loginStatus, setLoginStatus] = useState(false)
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/wishlist" element={<WishList loginStatus={loginStatus} />} />
        <Route path="/cart" element={<Cart loginStatus={loginStatus} />} />
        <Route path="/login" element={<Auths setLoginStatus={setLoginStatus} />} />
        <Route path="/register" element={<Auths register={"register"} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:categoryName" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductData />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;
