import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Landing from "./pages/Landing.jsx";
import Footer from "./components/components/Footer.jsx";

function App() {
  return (
    <>
      <Navbar />
      {/* <Home />
      <Login />
      <Signup /> */}
      <Landing />
      <Footer />
    </>
  );
}

export default App;
