import { Outlet } from "react-router-dom";
import Navbar from "./larg-screens/navbar/Navbar";
import Footer from "./common/footer/Footer";
import Header from "./larg-screens/header/Header";
import MobileNavbar from "./small-screens/mobile-navbar/MobileNavbar";
import CategoriesHeader from "./larg-screens/navbar/category-header/CategoriesHeader";
import Breadcrumb from "./common/breadcrumb/components/Breadcrumb";
import MobileWidget from "./small-screens/mobile-widget/MobileWidget";
const WebsiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="md:hidden">
        <MobileNavbar />
      </div>
      <div className="md:hidden">
        <MobileWidget />
      </div>
      <Header />
      <Navbar />
      <CategoriesHeader />
      <Breadcrumb />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
