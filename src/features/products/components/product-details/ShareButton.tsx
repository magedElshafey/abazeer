import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Share2 } from "lucide-react";

import DialogComponent from "@/common/components/dialog/dialog";
import MainBtn from "@/common/components/buttons/MainBtn";
import { ProductDetails } from "../../types/product.types";

type ShareButtonProps = {
  product: Pick<ProductDetails, "id" | "name">;
};

const ShareButton: FC<ShareButtonProps> = ({ product }) => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const shareInputRef = useRef<HTMLInputElement>(null);

  const shareUrl = useMemo(() => {
    const fallbackPath = `/products/${product.id}`;
    if (typeof window === "undefined") {
      return fallbackPath;
    }
    const origin = window.location.origin;
    return `${origin}${fallbackPath}`;
  }, [product.id]);

  const selectInput = useCallback(() => {
    if (shareInputRef.current) {
      shareInputRef.current.focus();
      shareInputRef.current.select();
    }
  }, []);

  const copyShareUrl = useCallback(async () => {
    if (!shareUrl) return;
    selectInput();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        document.execCommand("copy");
      }
      setIsCopied(true);
    } catch (error) {
      console.error(error);
      setIsCopied(false);
    }
  }, [selectInput, shareUrl]);

  useEffect(() => {
    if (isDialogOpen) {
      void copyShareUrl();
    } else {
      setIsCopied(false);
    }
  }, [copyShareUrl, isDialogOpen]);

  return (
    <DialogComponent
      header={{
        title: "share_product",
        description: "share_product_description",
      }}
      cancel={{ text: "close" }}
      content={
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              ref={shareInputRef}
              readOnly
              value={shareUrl}
              className="flex-1 rounded border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orangeColor"
            />
            <MainBtn
              onClick={() => void copyShareUrl()}
              theme={isCopied ? "outline" : "main"}
              className="whitespace-nowrap w-fit sm:w-fit md:w-fit"
            >
              {isCopied ? t("copied") : t("copy_link")}
            </MainBtn>
          </div>
          {isCopied && (
            <span className="text-xs text-background-green">
              {t("link_copied_successfully")}
            </span>
          )}
        </div>
      }
      onOpenChange={setIsDialogOpen}
    >
      <MainBtn
        theme="outline"
        className="flex items-center gap-2 !px-4 md:w-auto sm:w-auto !py-2"
      >
        <Share2 className="h-4 w-4" />
        {t("share")}
      </MainBtn>
    </DialogComponent>
  );
};

export default ShareButton;


