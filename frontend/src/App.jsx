import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import Products from "./components/Products";
import PrivateComponent from "./components/PrivateComponent";
import PrivateComponent_2 from "./components/PrivateComponent_2";
import UpdateProduct from "./components/UpdateProduct";
function App() {
  const auth = localStorage.getItem("user");

  return (
    <div className="App">
      
      <BrowserRouter>
      <Header />
      
      {/*Setting up routes rules for whole application UI */}
      <Routes>

        {/*Private Components are used to filter out routes if you*/}
        {/*This Private component is used to redirect if user is already logged in or signed up*/}
        <Route element={<PrivateComponent />}>
        <Route path="/" element = {<Products />}></Route>
        <Route path="/add-product" element = {<AddProduct />}></Route>
        <Route path="/update/:id" element = {<UpdateProduct />}></Route>
        <Route path = "/logout" element = {<SignUp />}></Route>
        </Route>

        {/*This Private component is used to redirect if user is not logged in or signed up*/}
        <Route element={<PrivateComponent_2 />}>
        <Route path="/login" element = {<Login />}></Route>
        <Route path="/signup" element = {<SignUp />}></Route>
        </Route>
      </Routes>
      
      </BrowserRouter>
      
      <Footer />
    </div>
  );
}

export default App;
