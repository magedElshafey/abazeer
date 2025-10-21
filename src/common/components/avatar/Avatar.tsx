import { FC, useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";

interface AvatarProps {
    url: string;
    alt?: string;
    size?: number; // px
}

const Avatar: FC<AvatarProps> = ({ url, alt = "avatar", size = 72 }) => {
    const dimension = `${size}px`;
    const [error, setError] = useState(false);
    const urlRef = useRef(url);

    useEffect(() => {
        if(url && urlRef.current !== url && error) {
            urlRef.current = url;
            setError(false);
        }
    }, [url]);

    if(error) {
        return (
            <div
                style={{
                    width: dimension,
                    height: dimension,
                }}
                className="rounded-full bg-background-gray flex-center"
            >
                <FaImage size={size - 30} className="text-text-gray" />
            </div>
        )
    }

    return (
        <img
            src={url}
            alt={alt}
            style={{ width: dimension, height: dimension }}
            className="rounded-full object-cover border border-gray-200"
            onError={() => setError(true)}
        />
    );
};

export default Avatar;


