import { useTranslation } from "react-i18next";
import React, { PropsWithChildren } from "react";
import { cv } from "css-variants";

const themes = {
  main: "bg-orangeColor text-black",
  secondary: "bg-black text-white"
}

const buttonVariants = cv({
  base: "px-2 py-2 rounded font-bold",
  variants: {
    theme: {
      ...themes
    }
  },
  defaultVariants: {
    theme: "main"
  }
})

interface MainBtnProps {
  text?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
    ...args: any[]
  ) => Promise<string | void> | string | void;
  type?: "button" | "submit" | "reset";
  isPending?: boolean;
  bg?: string;
  className?: string;
  theme?: keyof typeof themes,
}



const MainBtn: React.FC<PropsWithChildren<MainBtnProps>> = ({
  text,
  onClick,
  type = "button",
  isPending = false,
  className,
  children,
  theme
}) => {
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      disabled={isPending}
      type={type}
      onClick={handleClick}
      aria-busy={isPending}
      aria-label={isPending ? t("Submitting, please wait") : t(text || "")}
      className={`${buttonVariants({ theme })} ${className}`}
    >
      {isPending ? (
        <div
          className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"
          role="status"
          aria-live="polite"
          aria-label={t("Loading")}
        ></div>
      ) : (
        children ||
        t(text || "")
      )}
    </button>
  );
};

export default React.memo(MainBtn);
