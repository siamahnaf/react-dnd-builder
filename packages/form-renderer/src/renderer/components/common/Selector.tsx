"use client"
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFloating, offset, flip, shift, autoUpdate, useInteractions, useClick, useDismiss } from "@floating-ui/react";
import { IconChevronDown, IconCheck, IconX } from "../../icons";
import ScrollWrapper from "./ScrollWrapper";
import { createPortal } from "react-dom";
import { useEditor } from "../../context/editor.context";
import { TSelect } from "../../types/elements";

//Interface
interface CustomSelectProps {
    value?: string | string[];
    onChange?: (value: string | string[]) => void;
    item: TSelect;
    isReadOnly: boolean;
    isChoiceSelectable: boolean;
    isChoiceVisible: boolean;
}

const Selector = ({ value = "", onChange, item, isReadOnly, isChoiceVisible, isChoiceSelectable }: CustomSelectProps) => {
    //Editor
    const { settings, form } = useEditor();
    const { theme } = settings;
    const { name, general, layout } = item;

    // Determine if this is a multi-select component
    const isMultiSelect = general?.type === "multi-select";

    // state
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [choiceOptions, setChoiceOptions] = useState(general?.choices || []);

    // refs
    const triggerRef = useRef<HTMLButtonElement>(null)
    const optionsRef = useRef<HTMLDivElement>(null)

    // Floating UI setup
    const { x, y, refs, strategy, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "bottom-start",
        middleware: [offset(4), flip(), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate,
    })

    const click = useClick(context)
    const dismiss = useDismiss(context)
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss])

    // Helper function to handle value normalization
    const getSelectedValues = useCallback(() => {
        if (isMultiSelect) {
            return Array.isArray(value) ? value : value ? [value] : [];
        }
        return value;
    }, [value, isMultiSelect]);

    const selectedValues = getSelectedValues();

    // compute filtered list & selected label
    const filteredOptions = choiceOptions.filter((o) => {
        const label = o.label.toLowerCase();
        const search = searchTerm.toLowerCase();
        switch (general?.searchMode) {
            case "startWith": return label.startsWith(search);
            case "endWith": return label.endsWith(search);
            case "contain":
            default: return label.includes(search);
        }
    });

    const sortedOptions = [...filteredOptions];
    if (general?.choiceOrder === "asc") {
        sortedOptions.sort((a, b) => a.label.localeCompare(b.label));
    } else if (general?.choiceOrder === "desc") {
        sortedOptions.sort((a, b) => b.label.localeCompare(a.label));
    }

    // For single-select, find the selected option
    const selectedOption = isMultiSelect ? null : choiceOptions.find((o) => o.value === value);

    // reset search/highlight when opening/closing
    useEffect(() => {
        if (isOpen) {
            setHighlightedIndex(
                isMultiSelect
                    ? 0 // For multi-select, just highlight the first option
                    : selectedOption
                        ? filteredOptions.findIndex((o) => o.value === selectedOption.value)
                        : 0
            )
        } else {
            setSearchTerm("")
            setHighlightedIndex(-1)
        }
    }, [isOpen, filteredOptions, selectedOption, isMultiSelect])

    // keyboard navigation
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!isOpen) {
                if (["Enter", " ", "ArrowDown"].includes(event.key)) {
                    event.preventDefault()
                    setIsOpen(true)
                    setHighlightedIndex(0)
                }
                return
            }

            switch (event.key) {
                case "Escape":
                    event.preventDefault()
                    setIsOpen(false)
                    setHighlightedIndex(-1)
                    setSearchTerm("")
                    triggerRef.current?.focus()
                    break
                case "ArrowDown":
                    event.preventDefault()
                    setHighlightedIndex((prev) =>
                        prev < filteredOptions.length - 1 ? prev + 1 : 0
                    )
                    break
                case "ArrowUp":
                    event.preventDefault()
                    setHighlightedIndex((prev) =>
                        prev > 0 ? prev - 1 : filteredOptions.length - 1
                    )
                    break
                case "Enter":
                    event.preventDefault()
                    if (
                        highlightedIndex >= 0 &&
                        highlightedIndex < filteredOptions.length
                    ) {
                        const opt = filteredOptions[highlightedIndex]

                        if (isMultiSelect) {
                            // For multi-select, toggle the selection
                            const currentValues = Array.isArray(value) ? value : value ? [value] : [];
                            const newValues = currentValues.includes(opt.value)
                                ? currentValues.filter(v => v !== opt.value)
                                : [...currentValues, opt.value];
                            onChange?.(newValues);
                        } else {
                            // For single-select, just select the option
                            onChange?.(opt.value);
                            setIsOpen(false);
                        }

                        setHighlightedIndex(-1);
                        setSearchTerm("");
                    }
                    break
                case "Tab":
                    setIsOpen(false)
                    setHighlightedIndex(-1)
                    setSearchTerm("")
                    break
                default:
                    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
                        event.preventDefault()
                        const newTerm = searchTerm + event.key.toLowerCase()
                        setSearchTerm(newTerm)
                        const idx = filteredOptions.findIndex((o) =>
                            o.label.toLowerCase().startsWith(newTerm)
                        )
                        if (idx >= 0) setHighlightedIndex(idx)
                    } else if (event.key === "Backspace") {
                        event.preventDefault()
                        const newTerm = searchTerm.slice(0, -1)
                        setSearchTerm(newTerm)
                        const idx = filteredOptions.findIndex((o) =>
                            o.label.toLowerCase().startsWith(newTerm)
                        )
                        if (idx >= 0) setHighlightedIndex(idx)
                    }
                    break
            }
        },
        [isOpen, highlightedIndex, filteredOptions, onChange, searchTerm, isMultiSelect, value]
    )

    // attach keydown listener when open
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown)
            return () => document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isOpen, handleKeyDown]);

    // scroll highlighted option into view
    useEffect(() => {
        if (isOpen && highlightedIndex >= 0 && optionsRef.current) {
            const el = optionsRef.current.children[
                highlightedIndex
            ] as HTMLElement
            el?.scrollIntoView({ block: "nearest", behavior: "smooth" })
        }
    }, [highlightedIndex, isOpen]);

    useEffect(() => {
        const fetchRemoteChoices = async () => {
            if ((!general?.choices || general.choices.length === 0) && general?.webServiceUrl) {
                try {
                    const res = await fetch(general.webServiceUrl);
                    const data = await res.json();
                    // Navigate into the nested path
                    const pathSegments = general.pathToData?.split(".") || [];
                    let target = data;
                    for (const segment of pathSegments) {
                        target = target?.[segment];
                    }
                    // Validate target is an array
                    if (!Array.isArray(target)) {
                        setChoiceOptions([]);
                        return;
                    }
                    // Extract choices
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
        fetchRemoteChoices();
    }, [general]);

    // animation presets based on placement
    const initialMotion = {
        opacity: 0,
        scale: 0.95,
    }
    const animateMotion = { opacity: 1, scale: 1 }

    //Theme
    const getTheme = () => {
        switch (theme?.theme) {
            case "border":
                return "border border-solid rounded-lg outline-2 outline-transparent";
            case "border-less":
                return "rounded-lg";
            case "underline":
                return "border-b border-solid"
        }
    }

    // Handle removing a selected value in multi-select mode
    const handleRemoveValue = (valToRemove: string) => {
        if (isMultiSelect && Array.isArray(value)) {
            const newValues = value.filter(v => v !== valToRemove);
            onChange?.(newValues);
        }
    }

    // Handle clearing all values
    const handleClearAll = () => {
        if (isMultiSelect) {
            onChange?.([]);
        } else {
            onChange?.("");
        }
    }

    return (
        <div>
            <style jsx>{`
                .SelectBox {
                    background: ${theme?.fieldBgColor};
                    border-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.fieldBorderColor};
                    color: ${theme?.fieldTextColor};
                    width: ${layout?.fieldWidth?.value || 100}${layout?.fieldWidth?.unit || "%"};
                    text-align: ${layout?.valueAlignment || "auto"};
                }
                .SelectBox:focus {
                    outline-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.accentBgColor}
                }
                .SelectBoxUnderline:focus {
                    box-shadow: ${theme?.accentBgColor} 0px 2px;
                    border-color: transparent;
                }
                .IconArrowColor {
                    color: ${theme?.fieldTextColor};
                }
                .SelectedTag {
                    background-color: ${theme?.accentBgColor}20;
                    border: 1px solid ${theme?.accentBgColor}40;
                    color: ${theme?.accentBgColor};
                }
            `}</style>
            <div className="relative">
                <button
                    {...getReferenceProps({
                        ref(node: Element | null) {
                            refs.setReference(node)
                            triggerRef.current = node as HTMLButtonElement
                        },
                        type: "button",
                        "aria-haspopup": "listbox",
                        "aria-expanded": isOpen
                    })}
                    className={`${getTheme()} relative h-[48px] pl-3 pr-7 text-base SelectBox ${theme?.theme === "underline" && "SelectBoxUnderline"} ${isReadOnly ? "pointer-events-none" : ""}`}
                >
                    {isMultiSelect ? (
                        <span className="flex flex-wrap gap-1.5 w-full">
                            {selectedValues.length > 0 ? (
                                (selectedValues as string[]).map((val) => {
                                    const option = choiceOptions.find(o => o.value === val);
                                    return (
                                        <span
                                            key={val}
                                            className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-sm SelectedTag"
                                        >
                                            <span className="truncate max-w-[120px]">
                                                {option?.label || val}
                                            </span>
                                            {!isReadOnly && (
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveValue(val);
                                                    }}
                                                    className="hover:text-opacity-80"
                                                >
                                                    <IconX size={14} />
                                                </span>
                                            )}
                                        </span>
                                    );
                                })
                            ) : (
                                <span className="font-light truncate w-full">
                                    {general?.placeholder || "Select options"}
                                </span>
                            )}
                        </span>
                    ) : (
                        <span
                            className={`truncate block w-full ${selectedOption ? "text" : "font-light"}`}
                        >
                            {selectedOption ? selectedOption.label : (general?.placeholder || "Select an option")}
                        </span>
                    )}
                </button>
                <div className={`absolute IconArrowColor top-1/2 right-2 -translate-y-1/2 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""} ${!(isMultiSelect ? selectedValues.length > 0 : selectedOption?.label && general?.clearBtn) ? "pointer-events-none" : ""}`}>
                    {(isMultiSelect ? selectedValues.length > 0 : selectedOption?.label && general?.clearBtn) ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClearAll();
                            }}
                            className="block"
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
                                    width: triggerRef.current?.offsetWidth,
                                },
                                className: "z-[999999999999] bg-white border border-gray-200 rounded-lg",
                                role: "listbox"
                            })}
                            initial={initialMotion}
                            animate={animateMotion}
                            exit={initialMotion}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                            {searchTerm && (
                                <div className="px-2 py-1 text-white text-xs w-max rounded-br-md" style={{ background: theme?.accentBgColor }}>
                                    Searching: {searchTerm}
                                </div>
                            )}
                            <ScrollWrapper className="max-h-[300px]" showAlways>
                                {filteredOptions.length === 0 ? (
                                    general?.allowCustomChoice ? (() => {
                                        const min = parseInt(general?.minValueForCustom ?? "0");
                                        const max = parseInt(general?.maxValueForCustom ?? "0");
                                        const length = searchTerm.length;
                                        const canCreate =
                                            (!min || length >= min) &&
                                            (!max || length <= max) &&
                                            !choiceOptions.some((opt) => opt.value === searchTerm);

                                        return canCreate ? (
                                            <div
                                                className="px-4 py-3 text-sm text-blue-600 cursor-pointer hover:underline"
                                                onClick={() => {
                                                    const newChoice = { label: searchTerm, value: searchTerm };
                                                    setChoiceOptions((prev) => [...prev, newChoice]);

                                                    if (isMultiSelect) {
                                                        const currentValues = Array.isArray(value) ? value : value ? [value] : [];
                                                        const newValues = [...currentValues, searchTerm];
                                                        onChange?.(newValues);
                                                    } else {
                                                        onChange?.(searchTerm);
                                                    }

                                                    setIsOpen(false);
                                                }}
                                            >
                                                Create new option: <strong>{searchTerm}</strong>
                                            </div>
                                        ) : (
                                            <div className="px-4 py-3 text-sm text-gray-400 text-center">
                                                {length < min
                                                    ? `Minimum ${min} characters required to create`
                                                    : length > max
                                                        ? `Maximum ${max} characters allowed`
                                                        : `No matching options to create`}
                                            </div>
                                        );
                                    })() : (
                                        <div className="px-4 py-3 text-sm opacity-80 text-center">
                                            No options found
                                        </div>
                                    )
                                ) : (
                                    sortedOptions.map((option, idx) => {
                                        const isSelected = isMultiSelect
                                            ? selectedValues.includes(option.value)
                                            : option.value === value;

                                        return (
                                            <div
                                                key={option.value}
                                                className={`${!isChoiceSelectable ? "pointer-events-none" : ""} relative cursor-pointer select-none px-4 py-2.5 transition-colors duration-150 flex gap-x-2 ${isSelected
                                                    ? "bg-gray-200/90 text-gray-800"
                                                    : ""
                                                    } ${highlightedIndex === idx &&
                                                        !isSelected
                                                        ? "bg-gray-100"
                                                        : ""
                                                    } ${highlightedIndex !== idx &&
                                                        !isSelected
                                                        ? "text-gray-800 hover:bg-gray-50"
                                                        : ""
                                                    }`}
                                                onClick={() => {
                                                    if (isMultiSelect) {
                                                        // For multi-select, toggle the selection
                                                        const currentValues = Array.isArray(value) ? value : value ? [value] : [];
                                                        const newValues = currentValues.includes(option.value)
                                                            ? currentValues.filter(v => v !== option.value)
                                                            : [...currentValues, option.value];
                                                        onChange?.(newValues);
                                                    } else {
                                                        // For single-select, just select the option
                                                        onChange?.(option.value);
                                                        setIsOpen(false);
                                                    }
                                                }}
                                            >
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
    )
}

export default Selector;