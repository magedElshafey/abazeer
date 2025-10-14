import { useTranslation } from "react-i18next";
import React, { PropsWithChildren } from "react";
import { cv } from "css-variants";
import { twMerge } from "tailwind-merge";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const themes = {
  main: "bg-orangeColor text-black",
  secondary: "bg-black text-white",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const buttonVariants = cv({
  base: "px-2 py-2 rounded font-bold disabled:cursor-not-allowed transition-all",
  variants: {
    theme: {
      ...themes,
    },
  },
  defaultVariants: {
    theme: "main",
  },
});

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
  theme?: keyof typeof themes;
  disabled?: boolean;
}

const MainBtn: React.FC<PropsWithChildren<MainBtnProps>> = ({
  text,
  onClick,
  type = "button",
  isPending = false,
  className,
  children,
  theme,
  disabled = false,
}) => {
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      disabled={isPending || disabled}
      type={type}
      onClick={handleClick}
      aria-busy={isPending}
      aria-label={isPending ? t("Submitting, please wait") : t(text || "")}
      className={`${twMerge(buttonVariants({ theme, className }))}`}
    >
      {isPending ? (
        <AiOutlineLoading3Quarters
          className="animate-spin"
          size={20}
          aria-hidden="true"
        />
      ) : (
        children || t(text || "")
      )}
    </button>
  );
};

export default React.memo(MainBtn);
