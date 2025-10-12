import { useState } from "react";
import { useTranslation } from "react-i18next";
import useFaq from "../../api/faq/useFaq";
import SEO from "@/common/components/seo/Seo";
import { tabTitle } from "@/utils/tabTitle";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import EmptyData from "@/common/components/empty-data/EmptyData";
import SectionTitle from "@/common/components/titles/SectionTitle";
import type { Faq } from "../../types/Faq.type";

const Faq = () => {
  const { t } = useTranslation();
  const queryResult = useFaq();

  return (
    <>
      <SEO title={tabTitle(t("faq"))} />
      <div className="containerr">
        <div className="flex-center">
          <SectionTitle title="faq" />
        </div>

        <FetchHandler queryResult={queryResult} skeletonType="faq">
          {queryResult?.data?.length ? (
            <div className="max-w-3xl mx-auto space-y-4">
              {queryResult.data.map((item: Faq) => (
                <FaqAccordion key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyData />
          )}
        </FetchHandler>
      </div>
    </>
  );
};

export default Faq;

interface FaqAccordionProps {
  item: Faq;
}

const FaqAccordion = ({ item }: FaqAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-2xl shadow-sm bg-white transition hover:shadow-md focus-within:ring-2 focus-within:ring-orangeColor">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex justify-between items-center px-5 py-4 focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span className="font-medium text-gray-900">{item.question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Improved transition using scaleY + opacity */}
      <div
        id={`faq-answer-${item.id}`}
        role="region"
        className={`px-5 transform-gpu origin-top transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 scale-y-100 max-h-[500px] py-3"
            : "opacity-0 scale-y-0 max-h-0"
        }`}
      >
        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
};
