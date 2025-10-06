import { FC } from "react";
import { Link } from "react-router-dom";
import { cv } from "css-variants";
import MainBtn from "@/common/components/buttons/MainBtn";
import { IconType } from "react-icons";

const themes = {
    order: "bg-orangeColor text-black border-orangeColor",
    addresses: "bg-green-100 text-black border-green-500",
    settings: "bg-yellow-100 text-black border-yellow-500",
};

const buttonThemes: Record<keyof typeof themes, string> = {
    order: "bg-orangeColor text-black",
    addresses: "bg-green-600 text-white",
    settings: "bg-yellow-500 text-black",
};

const cardVariants = cv({
    base: "w-full rounded-md h-full bg-opacity-30 border p-4 sm:p-5 flex flex-col items-center gap-4",
    variants: {
        theme: {
            ...themes,
        },
    },
    defaultVariants: {
        theme: "order",
    },
});

interface ProfileCardProps {
    icon: IconType
    title: string;
    description: string;
    link: string;
    buttonText: string;
    theme?: keyof typeof themes;
}

const ProfileCard: FC<ProfileCardProps> = ({ icon: Icon, title, description, link, buttonText, theme = "order" }) => {
    return (
        <div className={cardVariants({ theme })}>
            <div className={`shrink-0 p-4 rounded-full flex items-center justify-center ${buttonThemes[theme]}`}>
                <Icon size={30} />
            </div>
            <div className="flex-1 min-w-0 text-center">
                <h3 className="text-base sm:text-lg font-semibold truncate">{title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
            </div>
            <Link to={link} className="shrink-0">
                <MainBtn className={`px-4 ${buttonThemes[theme]}`}>
                    <p className="pb-1">
                        {buttonText}
                    </p>
                </MainBtn>
            </Link>
        </div>
    );
};

export default ProfileCard;