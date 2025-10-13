import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { baseUrl } from "../../../services/api-routes/apiRoutes";

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  favicon?: string;
};

const SEO = ({
  title,
  description = "Default website description",
  keywords = "default, keywords",
  canonical,
  ogImage = "/default-og-image.jpg",
  favicon = "/favicon.ico",
}: SEOProps) => {
  const { i18n, t } = useTranslation();

  const siteName = i18n.language === "ar" ? "أبازير" : "Abazeer";

  const pageTitle = title ? `${siteName} | ${t(title)}` : siteName;

  return (
    <Helmet>
      {/* Title */}
      <title>{pageTitle}</title>

      {/* Description */}
      <meta name="description" content={description} />

      {/* Keywords */}
      <meta name="keywords" content={keywords} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href={favicon} />
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
