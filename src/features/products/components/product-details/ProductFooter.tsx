import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductDetails } from "../../types/product.types";
import Reviews from "./Reviews";
import ProductSpecifications from "./ProductSpecifications";

type MenuItem = {
  id: string;
  label: string;
};

interface Props {
  product: ProductDetails;
}

const ProductFooter: FC<Props> = ({ product }) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("description");
  const hasFaqs = product?.faqs?.length;

  const menuItems: MenuItem[] = [
    { id: "description", label: "description" },
    { id: "specifications", label: "specifications" },
    { id: "reviews", label: "reviews" },
    ...(hasFaqs ? [{ id: "faq", label: "faq" }] : []),
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "description":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-light pb-3 border-b-2 border-orangeColor">
              {t("product_description")}
            </h3>
            <HtmlConverter html={product?.long_description} />
          </div>
        );
      case "specifications":
        return <ProductSpecifications product={product} />;
      case "reviews":
        return <Reviews product={product!} />;
      case "faq":
        if (!hasFaqs) return null;
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-light pb-3 border-b-2 border-orangeColor">
              {t("faq")}
            </h3>
            <div className="space-y-4">
              {product.faqs.map((faq, index) => (
                <ProductFaqAccordion key={`${faq.question}-${index}`} faq={faq} index={index} />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-8">
      {/* Mobile and Medium Screens: Vertical Layout */}
      <div className="block lg:hidden">
        <div className="space-y-6">
          {/* Menu Items */}
          <div className="bg-background-gray rounded-md p-4">
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`text-left px-4 py-3 rounded transition-colors ${
                    activeSection === item.id
                      ? "bg-orangeColor text-white"
                      : "hover:bg-gray-200 text-text-light"
                  }`}
                >
                  {t(item.label)}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">{renderContent()}</div>
        </div>
      </div>

      {/* Large Screens: 1/4 to 3/4 Layout */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
        {/* Menu Items - 1/4 width */}
        <div className="lg:col-span-1">
          <div className="bg-background-gray rounded-md p-4 top-4">
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`text-left px-4 py-3 rounded transition-colors ${
                    activeSection === item.id
                      ? "bg-orangeColor text-white"
                      : "hover:bg-gray-200 text-text-light"
                  }`}
                >
                  {t(item.label)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content - 3/4 width */}
        <div className="lg:col-span-3">
          <div>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductFooter;

type ProductFaq = ProductDetails["faqs"][number];

interface ProductFaqAccordionProps {
  faq: ProductFaq;
  index: number;
}

const ProductFaqAccordion: FC<ProductFaqAccordionProps> = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerId = `product-faq-answer-${index}`;

  return (
    <div className="border border-gray-200 rounded-2xl shadow-sm bg-white transition hover:shadow-md focus-within:ring-2 focus-within:ring-orangeColor">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex justify-between items-center px-5 py-4 focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <span className="font-medium text-gray-900">{faq.question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        id={answerId}
        role="region"
        className={`grid transition-all duration-300 ease-out overflow-hidden ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className="px-5 pb-4 text-gray-600 leading-relaxed transition-transform duration-300 ease-out transform"
            style={{
              transform: isOpen ? "translateY(0)" : "translateY(-10px)",
            }}
          >
            <HtmlConverter html={faq.answer} />
          </div>
        </div>
      </div>
    </div>
  );
};
