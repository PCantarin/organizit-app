import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Layout from "./pages/Layout/Layout"
import Home from "./pages/Home/Home"
import Users from "./pages/Users/Users";
import Products from "./pages/Products/Products";

import "./App.css";
import Movements from "./pages/Movements/Movements";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Home />}/>
          <Route path="/users" element={<Users />}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/movements" element={<Movements />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
