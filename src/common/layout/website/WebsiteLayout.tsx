import { Outlet } from "react-router-dom";
import Navbar from "./larg-screens/navbar/Navbar";
import Footer from "./common/footer/Footer";
import Header from "./larg-screens/header/Header";
import MobileNavbar from "./small-screens/mobile-navbar/MobileNavbar";
import CategoriesHeader from "./larg-screens/navbar/category-header/CategoriesHeader";

const WebsiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="md:hidden">
        <MobileNavbar />
      </div>
      <Header />
      <Navbar />
      <CategoriesHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
