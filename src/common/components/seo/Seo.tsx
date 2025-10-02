import { Helmet } from "react-helmet-async";
import { baseUrl } from "../../../services/api-routes/apiRoutes";

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
};

const SEO = ({
  title = "Default Website Title",
  description = "Default website description",
  keywords = "default, keywords",
  canonical,
  ogImage = "/default-og-image.jpg",
}: SEOProps) => {
  return (
    <Helmet>
      {/* Title */}
      <title>{title}</title>

      {/* Description */}
      <meta name="description" content={description} />

      {/* Keywords */}
      <meta name="keywords" content={keywords} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:site_name" content="My Website" />
    </Helmet>
  );
};

export default SEO;
