import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
import ScrollToTopButton from "./common/scroll-to-top/ScrollToTopButton";
import MobileNavbar from "./small-screens/mobile-navbar/MobileNavbar";
import MobileWidget from "./small-screens/mobile-widget/MobileWidget";
import Header from "./larg-screens/header/Header";
import StickyNavbar from "./larg-screens/sticky-navbar/StickyNavbar";
import CategoriesHeader from "./larg-screens/navbar/category-header/CategoriesHeader";
import Breadcrumb from "./common/breadcrumb/components/Breadcrumb";
import { Outlet } from "react-router-dom";
import Footer from "./common/footer/Footer";

const WebsiteLayout = () => {
  const { data } = useGetWebsiteSettings();
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTopButton />
      <div className="md:hidden">
        <MobileNavbar logo={data?.site_logo || "/images/logo.png"} />
      </div>
      <div className="md:hidden">
        <MobileWidget />
      </div>
      <Header />
      <StickyNavbar logo={data?.site_logo || "/images/logo.png"} />
      <CategoriesHeader />
      <Breadcrumb />
      <main className="flex-1 py-8">
        <Outlet />
      </main>
      <Footer
        site_logo={data?.site_logo || "/images/logo.png"}
        contact_phone={data?.contact_phone || ""}
        contact_email={data?.contact_email || ""}
        contact_address={data?.contact_address || ""}
        social_facebook={data?.social_facebook || null}
        social_twitter={data?.social_twitter || null}
        social_instagram={data?.social_instagram || null}
      />
    </div>
  );
};

export default WebsiteLayout;
