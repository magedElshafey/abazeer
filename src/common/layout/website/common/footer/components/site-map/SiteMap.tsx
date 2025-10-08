import { useMemo } from "react";
import Logo from "../../../../../../components/logo/Logo";
import logo from "../../../../../../../assets/logo (1).png";
import FooterLinkList from "./FooterLinkList";
import NewsLetter from "../../newsletter/NewsLetter";
import useGetAllStaticPages from "@/features/static-pages/api/all/useGetAllStaticPages";
import { myAccount } from "../../../../../../../data/data";
import type { Nav } from "@/types/Nav";

const SiteMap = () => {
  const { data } = useGetAllStaticPages();

  const allowedSlugs = ["contact-us", "about-us", "faq"];

  const helpCenterLinks: Nav[] = useMemo(() => {
    if (!data) return [];
    return data
      .filter((item: any) => allowedSlugs.includes(item.slug))
      .map((item: any) => ({
        name: item.name,
        link: `/${item.slug}`,
      }));
  }, [data]);

  const usefulLinks: Nav[] = useMemo(() => {
    if (!data) return [];
    return data
      .filter((item: any) => !allowedSlugs.includes(item.slug))
      .map((item: any) => ({
        name: item.name,
        link: `static/${item.slug}`,
      }));
  }, [data]);

  return (
    <section
      className="py-6 border-b border-t"
      aria-labelledby="sitemap-heading"
    >
      <div className="containerr">
        <h2 id="sitemap-heading" className="sr-only">
          Site Map
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* ✅ Logo + Description */}
          <div>
            <Logo logo={logo} />
            <p className="mt-4 text-xs text-gray-500 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              finibus viverra iaculis. Etiam vulputate et justo eget
              scelerisque.
            </p>
          </div>

          {/* ✅ Useful links (من API باستثناء contact-us, about-us, faq) */}
          {usefulLinks.length > 0 && (
            <FooterLinkList links={usefulLinks} title="useful links" />
          )}

          {/* ✅ Help center (contact-us, about-us, faq) */}
          {helpCenterLinks.length > 0 && (
            <FooterLinkList links={helpCenterLinks} title="help center" />
          )}

          {/* ✅ My Account */}
          <FooterLinkList links={myAccount} title="my account" />

          {/* ✅ Newsletter */}
          <NewsLetter />
        </div>
      </div>
    </section>
  );
};

export default SiteMap;
