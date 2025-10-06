import React, { useId } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck } from "react-icons/fi";
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";

interface MainCheckInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  required?: boolean;
  error?: string;
  labelPosition?: 'inline' | 'above';
}

const MainCheckInput = React.forwardRef<HTMLInputElement, MainCheckInputProps>(
  (
    {
      id,
      label,
      required = false,
      disabled = false,
      value,
      checked,
      onChange,
      onBlur,
      className = "",
      error,
      labelPosition = 'inline',
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation();
    const autoId = useId();
    const inputId = id || autoId;
    const isChecked = typeof checked !== "undefined" ? checked : (typeof value === "boolean" ? value : undefined);

    return (
      <div className="flex flex-col gap-1">
        {labelPosition === 'above' && label && (
          <label
            htmlFor={inputId}
            className={`text-sm md:text-base block mb-2 font-medium text-gray-700 ${
              disabled ? "opacity-50" : ""
            }`}
          >
            {t(label)}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <label htmlFor={inputId} className={`inline-flex items-center gap-2 ${className}`}>
          {/* Visually hidden native checkbox to keep accessibility and form integration */}
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            checked={isChecked}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className="sr-only peer"
            {...rest}
          />

          {/* Custom checkbox square */}
          <span
            className={`flex items-center justify-center w-4 h-4 rounded border transition-colors duration-150
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              ${isChecked ? "bg-orangeColor border-orangeColor" : "bg-gray-100 border-gray-300"}
              ${error ? "ring-2 ring-red-500 border-red-500" : "focus-within:ring-2 focus-within:ring-orangeColor"}
            `}
          >
            {isChecked ? (
              <FiCheck size={14} className="text-white" aria-hidden="true" />
            ) : null}
          </span>

          {labelPosition === 'inline' && label && (
            <span className={`text-sm md:text-base font-medium text-gray-700 ${disabled ? "opacity-50" : ""}`}>
              {t(label)}
              {required && <span className="text-red-500 ml-1">*</span>}
            </span>
          )}
        </label>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            error ? "max-h-10 opacity-100 mt-1" : "max-h-0 opacity-0"
          }`}
        >
          <p id={`${inputId}-error`} className="text-red-500 text-xs" role="alert">
            {error && t(error)}
          </p>
        </div>
      </div>
    );
  }
);

MainCheckInput.displayName = "MainCheckInput";

// Controller wrapper interface
interface MainCheckInputControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelPosition?: 'inline' | 'above';
  rules?: any; // react-hook-form rules
}

// Controller wrapper component
const MainCheckInputController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  required = false,
  disabled = false,
  className = "",
  labelPosition = 'inline',
  rules,
}: MainCheckInputControllerProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <MainCheckInput
          {...field}
          label={label}
          required={required}
          disabled={disabled}
          className={className}
          labelPosition={labelPosition}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

MainCheckInputController.displayName = "MainCheckInputController";

export default MainCheckInputController;
