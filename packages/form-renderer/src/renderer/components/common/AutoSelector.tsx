import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TAutocomplete } from "../../types/elements";
import { useEditor } from "../../context/editor.context";
import { countries } from "../data/country.data";
import { IconX, IconChevronDown, IconCheck } from "../../icons";
import { useFloating, offset, flip, shift, autoUpdate, useInteractions, useDismiss } from "@floating-ui/react";
import ScrollWrapper from "./ScrollWrapper";
import { createPortal } from "react-dom";
import LazyImage from "./LazyImage";

interface Props {
    value?: string;
    onChange?: (value: string) => void;
    item: TAutocomplete;
    isReadOnly: boolean;
    isChoiceSelectable: boolean;
    isChoiceVisible: boolean;
}
type ChoiceTypes = {
    flag?: string;
    label: string;
    value: string;
}[]

const AutoSelector = ({ value = "", onChange, item, isReadOnly, isChoiceSelectable, isChoiceVisible }: Props) => {
    //Reading Options
    const { settings, form } = useEditor();
    const { theme } = settings;
    const { name, general, layout } = item;

    //State
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [choiceOptions, setChoiceOptions] = useState<ChoiceTypes>(general?.customChoice || []);

    // Memoize filtered options
    const filteredOptions = useMemo(() => {
        return choiceOptions.filter((o) => {
            const label = o.label.toLowerCase();
            const search = inputValue.toLowerCase();
            switch (general?.searchMode) {
                case "startWith": return label.startsWith(search);
                case "endWith": return label.endsWith(search);
                case "contain":
                default: return label.includes(search);
            }
        });
    }, [choiceOptions, inputValue, general?.searchMode]);

    // Memoize sorted options
    const sortedOptions = useMemo(() => {
        const options = [...filteredOptions];
        if (general?.choiceOrder === "asc") {
            options.sort((a, b) => a.label.localeCompare(b.label));
        } else if (general?.choiceOrder === "desc") {
            options.sort((a, b) => b.label.localeCompare(a.label));
        }
        return options;
    }, [filteredOptions, general?.choiceOrder]);

    // Floating UI setup
    const { x, y, refs, strategy, context } = useFloating({
        open: isOpen,
        onOpenChange: (open) => {
            setIsOpen(open);
            if (!open) {
                if (!general?.allowCustomInput) {
                    const matched = choiceOptions.find(opt =>
                        opt.label === inputValue || opt.value === inputValue
                    );
                    if (!matched) {
                        setInputValue("");
                        onChange?.("");
                    } else {
                        setInputValue(matched.label);
                        onChange?.(matched.value);
                    }
                } else {
                    onChange?.(inputValue);
                }
            }
        },
        placement: "bottom-start",
        middleware: [offset(4), flip(), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate,
    })
    const dismiss = useDismiss(context)
    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss])

    // refs
    const inputRef = useRef<HTMLInputElement>(null);

    //Handler
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
    }

    // Handle clearing the value
    const handleClear = () => {
        onChange?.("");
        setInputValue("");
        setIsOpen(false);
    }

    //Effect
    useEffect(() => {
        const fetchRemoteChoices = async () => {
            if (!general?.choiceType && general?.webServiceUrl) {
                try {
                    const res = await fetch(general.webServiceUrl);
                    const data = await res.json();
                    const pathSegments = general.pathToData?.split(".") || [];
                    let target = data;
                    for (const segment of pathSegments) {
                        target = target?.[segment];
                    }
                    if (!Array.isArray(target)) {
                        setChoiceOptions([]);
                        return;
                    }
                    /* eslint-disable @typescript-eslint/no-explicit-any */
                    const remoteChoices = target.map((item: any) => {
                        const label = item?.[general.levelField || ""];
                        const value = item?.[general.valueField || ""];
                        if (label && value) {
                            return { label: String(label), value: String(value) };
                        }
                        return null;
                    }).filter((item): item is { label: string; value: string } => item !== null);
                    setChoiceOptions(remoteChoices);
                } catch {
                    setChoiceOptions([]);
                }
            }
        };
        const includes = (str: string) => str?.split(",").map(s => s.trim()).filter(Boolean) || [];

        if (general?.choiceType === "country") {
            const included = includes(general.country?.include || "");
            const excluded = includes(general.country?.exclude || "");
            const country = countries
                .filter(c => (included.length ? included.includes(c.code) : true))
                .filter(c => (excluded.length ? !excluded.includes(c.code) : true))
                .map(a => ({
                    flag: `https://flagcdn.com/w20/${a.code.toLowerCase()}.png`,
                    label: general.country?.type === "name" ? a.label : a.code,
                    value: a.code
                }));
            setChoiceOptions(country);
        } else if (general?.choiceType === "currency") {
            const included = includes(general.currency?.include || "");
            const excluded = includes(general.currency?.exclude || "");
            const currency = countries
                .filter(c => (included.length ? included.includes(c.currencyCode) : true))
                .filter(c => (excluded.length ? !excluded.includes(c.currencyCode) : true))
                .map(a => ({
                    flag: `https://flagcdn.com/w20/${a.code.toLowerCase()}.png`,
                    label: general.currency?.type === "code" ? a.currencyCode : a.currencySymbol,
                    value: a.currencyCode
                }));
            setChoiceOptions(currency);
        } else if (general?.choiceType === "calling-code") {
            const included = includes(general.callingCode?.include || "");
            const excluded = includes(general.callingCode?.exclude || "");
            const callingCode = countries
                .filter(c => (included.length ? included.includes(c.phone) : true))
                .filter(c => (excluded.length ? !excluded.includes(c.phone) : true))
                .map(a => {
                    const phone = general.callingCode?.addPlusText ? `+${a.phone}` : a.phone;
                    return {
                        flag: `https://flagcdn.com/w20/${a.code.toLowerCase()}.png`,
                        label: phone,
                        value: phone
                    };
                });
            setChoiceOptions(callingCode);
        } else if (general?.choiceType === "custom") {
            setChoiceOptions(general.customChoice || []);
        } else if (!general?.choiceType && general?.webServiceUrl) {
            fetchRemoteChoices();
        } else {
            setChoiceOptions([]);
        }
    }, [general?.choiceType, general?.country, general?.currency, general?.callingCode, general?.customChoice, general?.webServiceUrl, general?.pathToData, general?.levelField, general?.valueField]);

    //Theme
    const getTheme = () => {
        switch (theme?.theme) {
            case "border":
                return "border border-solid rounded-lg";
            case "border-less":
                return "rounded-lg";
            case "underline":
                return "border-b border-solid"
        }
    }

    // animation presets based on placement
    const initialMotion = {
        opacity: 0,
        scale: 0.95,
    }
    const animateMotion = { opacity: 1, scale: 1 }

    return (
        <div>
            <style jsx>{`
                .AutoComplete {
                    background: ${theme?.fieldBgColor};
                    border-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.fieldBorderColor};
                    color: ${theme?.fieldTextColor};
                    width: ${layout?.fieldWidth?.value || 100}${layout?.fieldWidth?.unit || "%"};
                    text-align: ${layout?.valueAlignment || "auto"};
                }
                .AutoComplete:focus {
                    outline-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.accentBgColor}
                }
                .AutoCompleteUnderline:focus {
                    outline-style: none;
                    box-shadow: ${theme?.accentBgColor} 0px 2px;
                    border-color: transparent;
                }
                .AutocompleteBorderLess {
                    outline-style: none;
                }
                .IconArrowColor {
                    color: ${theme?.fieldTextColor};
                }
            `}</style>
            <div className="relative">
                <input
                    {...getReferenceProps({
                        ref(node: Element | null) {
                            refs.setReference(node)
                            inputRef.current = node as HTMLInputElement
                        },
                        type: "text",
                        onFocus: () => setIsOpen(true),
                        value: inputValue,
                        onChange: handleInputChange,
                        placeholder: general?.placeholder || "Type to search...",
                        readOnly: isReadOnly,
                        "aria-autocomplete": "list",
                        "aria-expanded": isOpen,
                        "aria-controls": "autocomplete-options"
                    })}
                    className={`${getTheme()} relative h-[48px] pl-3 pr-10 text-base AutoComplete ${theme?.theme === "border-less" && "AutocompleteBorderLess"} ${theme?.theme === "underline" && "AutoCompleteUnderline"} ${isReadOnly ? "pointer-events-none" : ""}`}
                />
                <div className={`absolute IconArrowColor top-1/2 right-2 -translate-y-1/2 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""} ${!(value && general?.clearBtn) ? "pointer-events-none" : ""}`}>
                    {(value && general?.clearBtn) ? (
                        <button
                            onClick={handleClear}
                            className="block"
                            aria-label="Clear selection"
                        >
                            <IconX size={18} />
                        </button>
                    ) : (
                        <IconChevronDown size={22} />
                    )}
                </div>
            </div>
            {createPortal(
                <AnimatePresence>
                    {isOpen && isChoiceVisible && (
                        <motion.div
                            {...getFloatingProps({
                                ref: refs.setFloating,
                                style: {
                                    position: strategy,
                                    top: y ?? 0,
                                    left: x ?? 0,
                                    width: inputRef.current?.offsetWidth,
                                },
                                className: "z-[999999999999] bg-white border border-gray-200 rounded-lg shadow-lg",
                                role: "listbox",
                                id: "autocomplete-options"
                            })}
                            initial={initialMotion}
                            animate={animateMotion}
                            exit={initialMotion}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                            <ScrollWrapper className="max-h-[300px]" showAlways>
                                {filteredOptions.length === 0 ? (
                                    <div className="px-4 py-3 text-sm opacity-80 text-center">
                                        No options found
                                    </div>
                                ) : (
                                    sortedOptions.map((option, idx) => {
                                        const isSelected = option.value === value;
                                        return (
                                            <div
                                                key={idx}
                                                className={`${!isChoiceSelectable ? "pointer-events-none" : ""} items-center relative cursor-pointer select-none px-4 py-2.5 transition-colors duration-150 flex gap-x-2 ${isSelected ? "bg-gray-200/90 text-gray-800" : ""}`}
                                                onClick={() => {
                                                    onChange?.(option.value);
                                                    setIsOpen(false);
                                                    setInputValue(option.label);
                                                }}
                                                role="option"
                                                aria-selected={isSelected}
                                            >
                                                {option.flag &&
                                                    <LazyImage src={option.flag} alt={option.value} loading="lazy" width={20} height={15} decoding="async" />
                                                }
                                                <span className="flex-1 truncate text-base">
                                                    {option.label}
                                                </span>
                                                {isSelected && (
                                                    <IconCheck size={18} className="text-green-600" />
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </ScrollWrapper>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default AutoSelector;