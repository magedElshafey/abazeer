import Logo from "../../../../../components/logo/Logo";
import logo from "../../../../../../assets/logo (1).png";
import type { Nav } from "../../../../../../types/Nav";
import FooterLinkList from "./FooterLinkList";
import NewsLetter from "../../newsletter/NewsLetter";
const useflulLinks: Nav[] = [
  {
    name: "terms of use",
    link: "/terms-of-use",
  },
  {
    name: "terms & conditions",
    link: "/terms-conditions",
  },
  {
    name: "refund policy",
    link: "/refund-policy",
  },
  {
    name: "faq",
    link: "/faq",
  },
];
const helpCenterLinks: Nav[] = [
  {
    name: "About",
    link: "/about",
  },
  {
    name: "contact",
    link: "/contact",
  },
  {
    name: "blogs",
    link: "/refund-policy",
  },
];
const myAccount: Nav[] = [
  {
    name: "my cart",
    link: "/my-cart",
  },
  {
    name: "my whishlist",
    link: "/my-whishlist",
  },
  {
    name: "my addresses",
    link: "/my-addresses",
  },
  {
    name: "my profile",
    link: "/my-profile",
  },
];
const SiteMap = () => {
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
          <div>
            <Logo logo={logo} />
            <p className="mt-4 text-xs text-gray-500 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              finibus viverra iaculis. Etiam vulputate et justo eget
              scelerisque.
            </p>
          </div>
          <FooterLinkList links={useflulLinks} title="useful links" />
          <FooterLinkList links={helpCenterLinks} title="help center" />
          <FooterLinkList links={myAccount} title="my account" />
          <NewsLetter />
        </div>
      </div>
    </section>
  );
};

export default SiteMap;
