import { useState, useId, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons";
import { FiEye, FiEyeOff } from "react-icons/fi";
import React from "react";

interface MainInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  Icon?: IconType;
  required?: boolean;
  enableAutocomplete?: boolean;
  storageKey?: string;
}

const MainInput = React.forwardRef<HTMLInputElement, MainInputProps>(
  (
    {
      id,
      label,
      placeholder,
      type = "text",
      error,
      Icon,
      required = false,
      disabled = false,
      enableAutocomplete = false,
      storageKey,
      value,
      onChange,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation();
    const autoId = useId();
    const inputId = id || autoId;

    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
      if (enableAutocomplete && storageKey) {
        const stored = localStorage.getItem(storageKey);
        if (stored) setSuggestions(JSON.parse(stored));
      }
    }, [enableAutocomplete, storageKey]);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (enableAutocomplete && storageKey && value) {
        const updated = Array.from(
          new Set([value as string, ...suggestions])
        ).slice(0, 10);
        setSuggestions(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
      if (onBlur) onBlur(e); // مهم ل react-hook-form
    };

    const togglePassword = () => setShowPassword((prev) => !prev);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm md:text-base block mb-2 font-medium text-gray-700"
          >
            {t(label)}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div
          className={`transition duration-150 rounded-lg w-full py-3 px-4 flex items-center gap-3 bg-background-babyBlue
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${
            error
              ? "ring-2 ring-red-500" // 🔴 لو فيه خطأ
              : "focus-within:ring-2 focus-within:ring-primary"
          }`}
        >
          {Icon && (
            <Icon size={20} className="text-text-gray" aria-hidden="true" />
          )}

          <input
            id={inputId}
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            placeholder={placeholder ? t(placeholder) : ""}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            list={enableAutocomplete ? `${inputId}-list` : undefined}
            className="flex-1 outline-none w-full bg-transparent border-none text-[#333333] placeholder:text-gray-400"
            {...rest}
          />

          {isPassword && (
            <button
              type="button"
              onClick={togglePassword}
              aria-label={
                showPassword ? t("hide password") : t("show password")
              }
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          )}
        </div>

        {enableAutocomplete && (
          <datalist id={`${inputId}-list`}>
            {suggestions.map((item, i) => (
              <option key={i} value={item} />
            ))}
          </datalist>
        )}

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            error ? "max-h-10 opacity-100 mt-1" : "max-h-0 opacity-0"
          }`}
        >
          <p
            id={`${inputId}-error`}
            className="text-red-500 text-xs"
            role="alert"
          >
            {error && t(error)}
          </p>
        </div>
      </div>
    );
  }
);

export default MainInput;
