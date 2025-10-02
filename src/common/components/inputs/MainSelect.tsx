import React, {
  useEffect,
  useRef,
  useState,
  useId,
  KeyboardEvent,
} from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropdown } from "react-icons/io";
import Loader from "../loader/spinner/Loader";
import type { IconType } from "react-icons";

interface OptionType {
  id: number;
  name: string;
}

interface MainSelectProps<T extends OptionType> {
  id?: string;
  name?: string; // optional for forms
  options?: T[];
  onSelect?: (option: T) => void; // full option callback
  onChange?: (value: number | null) => void; // controlled value callback (id)
  onBlur?: (e?: any) => void;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  fetchApi?: () => Promise<T[]>;
  value?: number | null; // controlled value is option.id or null
  error?: string | null;
  required?: boolean;
  ariaLabel?: string;
  className?: string;
  Icon?: IconType;
  label?: string;
}

function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

const MainSelectInner = <T extends OptionType>(props: MainSelectProps<T>) => {
  const {
    id,
    options = [],
    onSelect,
    onChange,
    onBlur,
    disabled = false,
    loading = false,
    placeholder,
    fetchApi,
    value,
    error,
    required = false,
    className,
    Icon,
    label = "",
  } = props;

  const { t, i18n } = useTranslation();
  const autoId = useId();
  const inputId = id || `${autoId}-select`;
  const listboxId = `${inputId}-listbox`;
  const errorId = `${inputId}-error`;

  const [showOptions, setShowOptions] = useState(false);
  const [fetchedOptions, setFetchedOptions] = useState<T[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string | null>("");
  const [search, setSearch] = useState("");
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const lastSelectedRef = useRef<T | undefined>(undefined);

  // decide displayed options (fetched or from props)
  const displayedOptions = fetchApi ? fetchedOptions : options;

  // load fetched options lazily when opening
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (fetchApi && fetchedOptions.length === 0) {
        try {
          const data = await fetchApi();
          if (mounted) setFetchedOptions(data);
        } catch (err) {
          console.error("MainSelect fetchApi error:", err);
        }
      }
    };
    if (showOptions) load();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showOptions, fetchApi]);

  // sync selected label when value or options change
  useEffect(() => {
    if (value != null) {
      const opt =
        options.find((o) => o.id === value) ||
        fetchedOptions.find((o) => o.id === value);
      if (opt) {
        setSelectedLabel(opt.name);
        lastSelectedRef.current = opt;
      } else {
        setSelectedLabel(null);
      }
    } else {
      setSelectedLabel(null);
      lastSelectedRef.current = undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options, fetchedOptions]);

  useClickOutside(containerRef, () => {
    setShowOptions(false);
    setFocusedIndex(-1);
  });

  const filtered = displayedOptions.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
  );

  // keyboard handling
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!showOptions) {
          openList();
        } else {
          setFocusedIndex((prev) =>
            Math.min(prev + 1, Math.max(0, filtered.length - 1))
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (showOptions) {
          setFocusedIndex((prev) => Math.max(0, prev - 1));
        }
        break;
      case "Home":
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setFocusedIndex(filtered.length - 1);
        break;
      case "Enter":
        e.preventDefault();
        if (
          showOptions &&
          focusedIndex >= 0 &&
          focusedIndex < filtered.length
        ) {
          handleSelectChange(filtered[focusedIndex]);
        } else {
          openList();
        }
        break;
      case "Escape":
        e.preventDefault();
        setShowOptions(false);
        setSearch("");
        break;
      default:
        // allow typing to search
        if (!showOptions) {
          openList();
        }
        break;
    }
  };

  const openList = () => {
    if (disabled) return;
    setShowOptions(true);
    // focus input after opening
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleToggle = (e?: React.MouseEvent) => {
    if (disabled) return;
    e?.stopPropagation();
    setShowOptions((s) => {
      const next = !s;
      if (next) {
        setTimeout(() => inputRef.current?.focus(), 0);
      } else {
        setFocusedIndex(-1);
      }
      return next;
    });
  };

  const handleSelectChange = (option: T) => {
    setSelectedLabel(option.name);
    lastSelectedRef.current = option;
    setShowOptions(false);
    setSearch("");
    setFocusedIndex(-1);
    if (onSelect) onSelect(option);
    if (onChange) onChange(option.id);
    if (onBlur) onBlur(); // inform forms that blur/commit happened
  };

  // move focus to the focusedIndex item visually (scrollIntoView)
  useEffect(() => {
    if (focusedIndex < 0) return;
    const listEl = listRef.current;
    const item = listEl?.querySelector(`[data-index="${focusedIndex}"]`) as
      | HTMLElement
      | undefined;
    if (item) {
      item.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  const showLabel = selectedLabel
    ? t(selectedLabel)
    : placeholder
    ? t(placeholder)
    : "";

  return (
    <div className={`w-full ${className || ""}`}>
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
        ref={containerRef}
        className={`relative w-full`}
        onClick={(e) => {
          // open when clicking the box (unless clicking inside list)
          if ((e.target as Node) === containerRef.current) openList();
        }}
      >
        <div
          role="combobox"
          aria-expanded={showOptions}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          aria-owns={listboxId}
          aria-required={required || undefined}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          tabIndex={0}
          onKeyDown={(e) => {
            // convert React.KeyboardEvent to our handler
            handleKeyDown(e as any);
          }}
          onBlur={() => {
            // note: actual blur handling to forms will be called on select or explicitly if needed
          }}
          className={`transition text-text-gray duration-150 rounded-lg w-full py-3 px-4 flex-between gap-3 bg-background-babyBlue
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            ${
              error
                ? "ring-2 ring-red-500"
                : "focus-within:ring-2 focus-within:ring-primary"
            }`}
          onClick={handleToggle}
        >
          {/* leading placeholder / selected text */}
          <div className="flex gap-2">
            {Icon && <Icon size={20} aria-hidden="true" />}
            {showLabel}
          </div>

          {/* chevron */}
          {!disabled && <IoMdArrowDropdown size={20} aria-hidden="true" />}
        </div>

        {/* dropdown */}
        {showOptions && (
          <div
            id={listboxId}
            role="listbox"
            aria-labelledby={inputId}
            ref={listRef}
            className={`absolute top-full  w-full max-h-48 overflow-y-auto bg-white border border-slate-400 rounded-lg shadow-lg z-40 ${
              i18n.language === "ar" ? "right-0" : "left-0"
            }`}
          >
            {loading ? (
              <div className="w-full flex justify-center py-3">
                <Loader />
              </div>
            ) : filtered.length ? (
              filtered.map((item, idx) => {
                const isFocused = idx === focusedIndex;
                const isSelected = lastSelectedRef.current?.id === item.id;
                return (
                  <div
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={-1}
                    key={item.id}
                    data-index={idx}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    onMouseDown={(e) => {
                      // prevent blur before click handler
                      e.preventDefault();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectChange(item);
                    }}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${
                      isFocused ? "bg-gray-100" : ""
                    }`}
                  >
                    {t(item.name)}
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full flex-center p-3">
                <p className="text-center">{t("no data")}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* error area (same as MainInput) */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          error ? "max-h-10 opacity-100 mt-1" : "max-h-0 opacity-0"
        }`}
      >
        <p id={errorId} className="text-red-500 text-xs" role="alert">
          {error && t(error)}
        </p>
      </div>
    </div>
  );
};

const MainSelect = React.forwardRef(MainSelectInner) as <T extends OptionType>(
  p: MainSelectProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement;

export default MainSelect;
