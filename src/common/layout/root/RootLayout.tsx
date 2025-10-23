import { Outlet, useLocation } from "react-router-dom";
import useLocalizeDocumentAttributes from "../../hooks/useLocalizeDocumentAttributes";
import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
import { useEffect } from "react";
import SEO from "@/common/components/seo/Seo";
import MaintenancePage from "@/features/app-status/pages/maintenance/MaintenancePage";
// const site_maintenance = true;
const RootLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useLocalizeDocumentAttributes();
  const { data } = useGetWebsiteSettings();
  if (data?.site_maintenance) return <MaintenancePage />;
  return (
    <>
      <SEO
        title={data?.site_name}
        description={data?.site_description}
        favicon={data?.site_favicon || ""}
      />
      <Outlet />
    </>
  );
};

export default RootLayout;
