import { formatDate } from "@/utils/formatDate";
import { Testimonials } from "../../types/testimonials.types";
import Avatar from "@/common/components/avatar/Avatar";
import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";

interface TestimonialsCardProps {
  data: Testimonials;
}

const TestimonialsCard: React.FC<TestimonialsCardProps> = ({ data }) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col gap-2 h-[220px] shadow-sm">
      {/* Top Section */}
      <div className="flex  items-center gap-2 h-[60px]">
        <div className="w-16 flex-shrink-0">
          <Avatar url={data.image} alt={data.name} size={60} />
        </div>

        <div className="flex flex-col items-center">
          <span className="font-medium text-gray-800">{data.name}</span>
          <span className="text-gray-600 text-xs text-center">
            {data.job_title}
          </span>
        </div>
      </div>
      <div className="line-clamp-4">
        <HtmlConverter html={data.quote} />
      </div>
      <div className="flex items-center justify-end pt-2 mt-auto border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {formatDate(data?.created_at)}
        </span>
      </div>
    </div>
  );
};

export default TestimonialsCard;
