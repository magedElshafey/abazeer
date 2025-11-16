import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { validateEmail } from "@/utils/validateEmail";
import useNewsLetterApi from "../api/useNewsLetterApi";
import { AxiosError } from "axios";
import { Response } from "@/types/Response";

const useNewsLetterLogic = (onClose?: () => void) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { isPending, mutateAsync } = useNewsLetterApi();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      setEmail(value);

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

      typingTimeoutRef.current = setTimeout(() => {
        if (isTouched) {
          setIsValid(!value || validateEmail(value));
        }
      }, 500);
    },
    [isTouched]
  );

  const handleBlur = useCallback(() => {
    setIsTouched(true);
    setIsValid(!email || validateEmail(email));
  }, [email]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsTouched(true);

      const valid = validateEmail(email);
      setIsValid(valid);
      if (!valid) return;

      toast.promise(mutateAsync(email), {
        success: (res) => {
          if (onClose) onClose();
          return res?.message || t("Subscribed successfully");
        },
        error: (err: AxiosError<Response>) => err?.response?.data.message || "",
      });

      setEmail("");
      setIsTouched(false);
    },
    [email, mutateAsync, t]
  );

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  return {
    states: { email, isValid, isPending, isTouched },
    handlers: { handleInputChange, handleBlur, handleSubmit },
  };
};

export default useNewsLetterLogic;
