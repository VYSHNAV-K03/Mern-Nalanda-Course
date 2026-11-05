import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Shop from "./pages/Products/Shop";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/Products/ProductDetail";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/shop" element={<Shop />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/productdetail/:prod_id/:prod_name/:prod_imgloc/:prod_imgname"
          element={<ProductDetail />}
        />
      </Routes>
    </>
  );
}

export default App;
