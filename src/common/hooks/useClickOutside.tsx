import { useEffect, useRef } from "react";

type UseClickOutsideProps = {
    onClickOutside: (event: MouseEvent) => void;
};

export const useClickOutside = <T extends HTMLElement>({
    onClickOutside,
}: UseClickOutsideProps) => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                event.target &&
                ref.current &&
                !ref.current.contains(event.target as Node)
            ) {
                onClickOutside(event);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClickOutside]);

    return ref;
};
