import { formatDate } from "@/utils/formatDate";
import { Testimonials } from "../../types/testimonials.types";
import Avatar from "@/common/components/avatar/Avatar";

interface TestimonialsCardProps {
  data: Testimonials;
}

const TestimonialsCard: React.FC<TestimonialsCardProps> = ({ data }) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col justify-between h-full min-h-[220px] bg-white shadow-sm">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-2">
        <div className="w-16 flex-shrink-0">
          <Avatar url="/images/600x600.jpg" alt={data.name} size={60} />
        </div>

        <div className="flex flex-col items-center">
          <span className="font-medium text-gray-800">{data.name}</span>
          <span className="text-gray-600 text-xs text-center">
            {data.job_title}
          </span>
        </div>
      </div>
      <p className="text-gray-600  line-clamp-3">{data.quote}</p>

      {/* Bottom Section */}
      <div className="flex items-center justify-end mt-3 pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {formatDate(data?.created_at)}
        </span>
      </div>
    </div>
  );
};

export default TestimonialsCard;
