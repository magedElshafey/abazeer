import { useTranslation } from "react-i18next";
import React from "react";
interface MainBtnProps {
  text: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
    ...args: any[]
  ) => Promise<string | void> | string | void;
  type?: "button" | "submit" | "reset";
  isPending?: boolean;
  bg?: string;
}

const MainBtn: React.FC<MainBtnProps> = ({
  text,
  onClick,
  type = "button",
  isPending = false,
  bg = "",
}) => {
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };
  console.log("main button renderd");
  return (
    <button
      disabled={isPending}
      type={type}
      onClick={handleClick}
      aria-busy={isPending}
      aria-label={isPending ? t("Submitting, please wait") : t(text)}
      className={`w-full flex items-center justify-center p-4 ${
        bg ? bg : "bg-gradient-to-t from-darkBlue to-lightBlue text-white"
      }  rounded-2xl shadow-xl disabled:opacity-85 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkBlue`}
    >
      {isPending ? (
        <div
          className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"
          role="status"
          aria-live="polite"
          aria-label={t("Loading")}
        ></div>
      ) : (
        t(text)
      )}
    </button>
  );
};

export default React.memo(MainBtn);
