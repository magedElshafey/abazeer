import { FC } from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";
import MainBtn from "@/common/components/buttons/MainBtn";

interface EmptyStateCardProps {
  icon: IconType;
  link: string;
  buttonText: string;
  title: string;
  description: string;
}

const EmptyStateCard: FC<EmptyStateCardProps> = ({
  icon: Icon,
  link,
  buttonText,
  title,
  description,
}) => {
  return (
    <div className="flex items-center justify-center py-12 border rounded-md">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <Link to={link} className="block w-fit mx-auto">
          <MainBtn className="flex-center gap-4 px-10 mx-auto">{buttonText}</MainBtn>
        </Link>
      </div>
    </div>
  );
};

export default EmptyStateCard;


