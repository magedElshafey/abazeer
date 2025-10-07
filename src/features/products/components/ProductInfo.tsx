import { FC } from "react";
import ProductRate from "./ProductRate";
import { useTranslation } from "react-i18next";
import MainBtn from "../../../common/components/buttons/MainBtn";
import { CiShoppingCart } from "react-icons/ci";
import ProductQuantity from "./ProductQuantity";
import { FaRegHeart } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";

const ProductInfo: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="px-2 flex flex-col gap-4">
      <div className="border-b pb-4">
        <p className="text-inherit text-xl mb-2 text-wrap">
          The title of the product
        </p>
        <ProductRate rating={4.5} reviewCount={128} />
      </div>
      <div>
        <span className="text-2xl font-bold text-text-darkRed">
          994.50 {t("SAR")}
        </span>
        <span className="invisible">place</span>
        <del className="text-lg font-bold text-text-gray opacity-60 line-through">
          1500.00 {t("SAR")}
        </del>
      </div>
      <div className="appearance-auto prose">
        <ul>
          <li> Unrestrained and portable active stereo speaker</li>
          <li> Free from the confines of wires and chords</li>
          <li> 20 hours of portable capabilities</li>
          <li> Double-ended Coil Cord with 3.5mm Stereo Plugs Included</li>
          <li> 3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li>
        </ul>
      </div>
      <div className="bg-background-green/20 text-sm w-fit flex items-center gap-4 rounded border border-background-green py-1 px-2">
        <p>{t("availability")}</p>
        <p className="text-background-green">15 {t("currently available")}</p>
      </div>
      <div>
        <p>{t("quantity")}</p>
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 mt-1">
          <ProductQuantity className="w-full" />
          <MainBtn className="w-full">
            <div className="flex-center gap-2">
              <CiShoppingCart />
              <p>{t("add-to-cart")}</p>
            </div>
          </MainBtn>
          <MainBtn className="w-full py-1" theme="secondary">
            Buy Now
          </MainBtn>
        </div>
      </div>
      <div className="flex items-center gap-5 pb-4 border-b">
        <div className="flex items-center gap-2">
          <FaRegHeart />
          <p className="text-lg pb-1">{t("wishlist")}</p>
        </div>
        <div className="flex items-center gap-2">
          <GoGitCompare />
          <p className="text-lg pb-1">{t("compare")}</p>
        </div>
      </div>

      {/* Product Metadata Section */}
      <div className="space-y-3">
        {/* SKU */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700 min-w-[60px]">SKU:</span>
          <span className="text-gray-600">PRD-2024-001</span>
        </div>

        {/* Categories */}
        <div className="flex items-start gap-2">
          <span className="font-medium text-gray-700 min-w-[80px]">
            Categories:
          </span>
          <div className="flex flex-wrap gap-1">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              Electronics
            </a>
            <span className="text-gray-400">,</span>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              Audio
            </a>
            <span className="text-gray-400">,</span>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              Speakers
            </a>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-start gap-2">
          <span className="font-medium text-gray-700 min-w-[50px]">Tags:</span>
          <div className="flex flex-wrap gap-1">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              wireless
            </a>
            <span className="text-gray-400">,</span>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              portable
            </a>
            <span className="text-gray-400">,</span>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              bluetooth
            </a>
            <span className="text-gray-400">,</span>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              stereo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
