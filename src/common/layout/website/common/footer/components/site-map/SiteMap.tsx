import { useMemo } from "react";
import Logo from "../../../../../../components/logo/Logo";
import FooterLinkList from "./FooterLinkList";
import NewsLetter from "../../newsletter/NewsLetter";
import useGetAllStaticPages from "@/features/static-pages/api/all/useGetAllStaticPages";
import { myAccount } from "../../../../../../../data/data";
import type { Nav } from "@/types/Nav";
import type { NavbarType } from "@/types/navbar.types";
// to do  : fav icon and slogan
interface SiteMapProps extends NavbarType {
  contact_address: string;
  contact_email: string;
  contact_phone: string;
  slogan?: string;
}
const SiteMap: React.FC<SiteMapProps> = ({
  logo,
  contact_address,
  contact_email,
  contact_phone,
  slogan,
}) => {
  const { data } = useGetAllStaticPages();

  const allowedSlugs = ["about-us", "faq"];

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
      className="py-4 border-b border-t"
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
            <p className="my-4 text-xs text-gray-500 leading-relaxed">
              {slogan || ""}
            </p>
            <ul>
              {contact_address && (
                <li className="text-transition mb-3">{contact_address}</li>
              )}
              {contact_phone && (
                <li className="text-transition mb-3">
                  <a
                    href={`tel:${contact_phone}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    dir="ltr"
                  >
                    {contact_phone}
                  </a>
                </li>
              )}
              {contact_email && (
                <li className="text-transition lowercase">
                  <a
                    href={`mailto:${contact_email}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {contact_email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {usefulLinks.length > 0 && (
            <FooterLinkList links={usefulLinks} title="useful links" />
          )}

          {helpCenterLinks.length > 0 && (
            <FooterLinkList
              links={[
                ...helpCenterLinks,
                { name: "latest blogs", link: "blogs" },
              ]}
              title="help center"
            />
          )}

          <FooterLinkList links={myAccount} title="my account" />

          <NewsLetter />
        </div>
      </div>
    </section>
  );
};

export default SiteMap;
