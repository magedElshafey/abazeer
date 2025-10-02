import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import MobileNavbar from "./mobile-navbar/MobileNavbar";
import CategoriesHeader from "./navbar/category-header/CategoriesHeader";

const WebsiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="lg:hidden">
        <MobileNavbar />
      </div>
      <Header />
      <Navbar />
      <CategoriesHeader />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
