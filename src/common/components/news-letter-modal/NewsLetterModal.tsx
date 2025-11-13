import NewsLetter from "@/common/layout/website/common/footer/newsletter/NewsLetter";
import { useTranslation } from "react-i18next";
// import SquareImage from "../images/sqaure-image/SqaureImage";
type Props = {
  onClose: () => void;
};

const NewsletterModal = ({ onClose }: Props) => {
  const { i18n } = useTranslation();
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50">
      <div className="containerr">
        <div className="bg-white w-full rounded-lg mx-auto  max-w-md  relative ">
          <button
            onClick={onClose}
            className={`absolute top-2 z-50 ${
              i18n.language === "ar" ? "right-3" : "left-3"
            } text-gray-500 hover:text-gray-700`}
          >
            ✕
          </button>
          {/* <SquareImage
            src="https://as2.ftcdn.net/v2/jpg/02/59/98/87/1000_F_259988723_FkzrqRyMP1kQk8WMkYnKT4o2Tw29d9Ki.jpg"
            alt="news-letter"
          /> */}
          <div className="px-5 py-12 ">
            <NewsLetter onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;
