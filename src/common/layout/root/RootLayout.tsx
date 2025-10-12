import { Outlet, useLocation } from "react-router-dom";
import useLocalizeDocumentAttributes from "../../hooks/useLocalizeDocumentAttributes";
import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
import { useEffect } from "react";
import SEO from "@/common/components/seo/Seo";
const RootLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useLocalizeDocumentAttributes();
  const { data } = useGetWebsiteSettings();
  return (
    <>
      <SEO title={data?.site_name} description={data?.site_description} />
      <Outlet />
    </>
  );
};

export default RootLayout;
