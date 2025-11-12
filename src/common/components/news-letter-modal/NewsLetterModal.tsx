import NewsLetter from "@/common/layout/website/common/footer/newsletter/NewsLetter";

type Props = {
  onClose: () => void;
};

const NewsletterModal = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative h-[250px] flex flex-col items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700  "
        >
          ✕
        </button>
        <div className="mt-4">
          <NewsLetter onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;
