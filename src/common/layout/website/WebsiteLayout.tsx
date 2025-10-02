import { Outlet } from "react-router-dom";
import Footer from "./common/footer/Footer";
import Header from "./larg-screens/header/Header";
import MobileNavbar from "./small-screens/mobile-navbar/MobileNavbar";
import Breadcrumb from "./common/breadcrumb/components/Breadcrumb";
import MobileWidget from "./small-screens/mobile-widget/MobileWidget";
import StickyNavbar from "./larg-screens/sticky-navbar/StickyNavbar";
import ScrollToTopButton from "./common/scroll-to-top/ScrollToTopButton";
const WebsiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTopButton />
      <div className="md:hidden">
        <MobileNavbar />
      </div>
      <div className="md:hidden">
        <MobileWidget />
      </div>
      <Header />
      <StickyNavbar />
      <Breadcrumb />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
