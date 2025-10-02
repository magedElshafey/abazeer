import { Outlet, useLocation } from "react-router-dom";
import useLocalizeDocumentAttributes from "../../hooks/useLocalizeDocumentAttributes";
import { useEffect } from "react";
const RootLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useLocalizeDocumentAttributes();

  return (
    <>
      <Outlet />
    </>
  );
};

export default RootLayout;
