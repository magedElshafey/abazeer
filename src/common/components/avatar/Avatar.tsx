import { FC } from "react";

interface AvatarProps {
    url: string;
    alt?: string;
    size?: number; // px
}

const Avatar: FC<AvatarProps> = ({ url, alt = "avatar", size = 72 }) => {
    const dimension = `${size}px`;
    return (
        <img
            src={url}
            alt={alt}
            style={{ width: dimension, height: dimension }}
            className="rounded-full object-cover border border-gray-200"
        />
    );
};

export default Avatar;


