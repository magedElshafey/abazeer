import { memo } from "react";
import CopyRight from "./components/copyrights/CopyRight";
import Features from "./components/features/Features";
import SiteMap from "./components/site-map/SiteMap";

const Footer = () => {
  return (
    <footer className="bg-white shadow-md" role="contentinfo">
      <Features />
      <SiteMap />
      <CopyRight />
    </footer>
  );
};

export default memo(Footer);
