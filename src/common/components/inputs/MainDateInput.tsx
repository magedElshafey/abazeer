import { useId } from "react";
import { useTranslation } from "react-i18next";
import type { IconType } from "react-icons";
import React from "react";

interface MainDateProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  Icon?: IconType;
  required?: boolean;
}

const MainDate = React.forwardRef<HTMLInputElement, MainDateProps>(
  (
    {
      id,
      label,
      placeholder,
      error,
      required = false,
      disabled = false,
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
              ? "ring-2 ring-red-500"
              : "focus-within:ring-2 focus-within:ring-primary"
          }`}
        >
          <input
            id={inputId}
            ref={ref}
            type="date"
            value={value as string}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder ? t(placeholder) : ""}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className="flex-1 outline-none w-full bg-transparent border-none text-text-gray placeholder:text-gray-400"
            {...rest}
          />
        </div>

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

export default MainDate;
