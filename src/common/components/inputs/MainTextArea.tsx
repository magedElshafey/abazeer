import { useState, useId, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons";
import React from "react";

interface MainTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  Icon?: IconType;
  required?: boolean;
  enableAutocomplete?: boolean;
  storageKey?: string;
  rows?: number;
  resize?: "none" | "both" | "horizontal" | "vertical";
}

const MainTextArea = React.forwardRef<HTMLTextAreaElement, MainTextAreaProps>(
  (
    {
      id,
      label,
      placeholder,
      error,
      Icon,
      required = false,
      disabled = false,
      enableAutocomplete = false,
      storageKey,
      value,
      onChange,
      onBlur,
      rows = 4,
      resize = "vertical",
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation();
    const autoId = useId();
    const textareaId = id || autoId;

    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
      if (enableAutocomplete && storageKey) {
        const stored = localStorage.getItem(storageKey);
        if (stored) setSuggestions(JSON.parse(stored));
      }
    }, [enableAutocomplete, storageKey]);

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (enableAutocomplete && storageKey && value) {
        const updated = Array.from(
          new Set([value as string, ...suggestions])
        ).slice(0, 10);
        setSuggestions(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
      if (onBlur) onBlur(e);
    };

    const resizeClasses = {
      none: "resize-none",
      both: "resize-none",
      horizontal: "resize-none",
      vertical: "resize-none",
    };

    return (
      <div className="w-full">
        {label && (
          <label
            tabIndex={-1}
            htmlFor={textareaId}
            className="text-sm md:text-base block mb-2 font-medium text-gray-700"
          >
            {t(label)}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div
          className={`transition duration-150 rounded-lg w-full py-3 px-4 flex items-start gap-3 bg-background-gray
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${
            error
              ? "ring-2 ring-red-500"
              : "focus-within:ring-2 focus-within:ring-orangeColor"
          }`}
        >
          {Icon && (
            <Icon size={20} className="text-text-gray mt-1 flex-shrink-0" aria-hidden="true" />
          )}

          <textarea
            id={textareaId}
            tabIndex={0}
            ref={ref}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            placeholder={placeholder ? t(placeholder) : ""}
            required={required}
            disabled={disabled}
            rows={rows}
            aria-invalid={!!error}
            aria-describedby={error ? `${textareaId}-error` : undefined}
            className={`flex-1 outline-none w-full bg-transparent border-none text-[#333333] placeholder:text-gray-400 ${resizeClasses[resize]} max-h-[300px] overflow-y-auto`}
            {...rest}
          />
        </div>

        {enableAutocomplete && (
          <datalist id={`${textareaId}-list`}>
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
            id={`${textareaId}-error`}
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

MainTextArea.displayName = "MainTextArea";

export default MainTextArea;
