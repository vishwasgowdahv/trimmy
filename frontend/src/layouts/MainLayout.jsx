import { Outlet } from "react-router-dom";
import Navbar from "../components/components/Navbar.jsx";
import Footer from "../components/components/Footer.jsx";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
