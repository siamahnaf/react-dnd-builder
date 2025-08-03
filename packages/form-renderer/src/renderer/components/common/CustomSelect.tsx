"use client"
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFloating, offset, flip, shift, autoUpdate, useInteractions, useClick, useDismiss } from "@floating-ui/react";
import { IconChevronDown, IconCheck } from "../../icons";
import ScrollWrapper from "./ScrollWrapper";
import { createPortal } from "react-dom";

interface Option {
    value: string
    label: string
}

interface CustomSelectProps {
    label?: string
    value?: string
    onChange?: (value: string) => void
    options?: Option[]
    placeholder?: string
    className?: string
    theme?: "white" | "blue" | "orange",
    width?: number;
}

export default function CustomSelect({
    label,
    value = "",
    onChange,
    options = [],
    placeholder = "Select an option",
    className = "",
    theme = "white",
    width
}: CustomSelectProps) {
    // state
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [highlightedIndex, setHighlightedIndex] = useState(-1)

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

    // compute filtered list & selected label
    const filteredOptions = options.filter((o) =>
        o.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const selectedOption = options.find((o) => o.value === value)

    // reset search/highlight when opening/closing
    useEffect(() => {
        if (isOpen) {
            setHighlightedIndex(
                selectedOption
                    ? filteredOptions.findIndex((o) => o.value === selectedOption.value)
                    : 0
            )
        } else {
            setSearchTerm("")
            setHighlightedIndex(-1)
        }
    }, [isOpen, filteredOptions, selectedOption])

    // keyboard navigation (copied exactly from your original handler)
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
                        onChange?.(opt.value)
                        setIsOpen(false)
                        setHighlightedIndex(-1)
                        setSearchTerm("")
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
        [isOpen, highlightedIndex, filteredOptions, onChange, searchTerm]
    )

    // attach keydown listener when open
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown)
            return () => document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isOpen, handleKeyDown])

    // scroll highlighted option into view
    useEffect(() => {
        if (isOpen && highlightedIndex >= 0 && optionsRef.current) {
            const el = optionsRef.current.children[
                highlightedIndex
            ] as HTMLElement
            el?.scrollIntoView({ block: "nearest", behavior: "smooth" })
        }
    }, [highlightedIndex, isOpen])

    // animation presets based on placement
    const initialMotion = {
        opacity: 0,
        scale: 0.95,
    }
    const animateMotion = { opacity: 1, scale: 1 }

    // theme classes
    const colors = {
        white: {
            main:
                "bg-white border border-gray-200 hover:border-gray-400/80 focus:border-gray-400/80",
            text: "text-gray-800",
            placeholder: "text-gray-400 font-light",
            icon: "text-gray-500",
        },
        orange: {
            main: "bg-[#ff98141a] hover:bg-[#FF9714]",
            text: "text-gray-800 group-hover:text-white",
            placeholder: "text-gray-500 group-hover:text-white/90",
            icon: "text-gray-500 group-hover:text-white/90",
        },
        blue: {
            main: "bg-[#437fd91a] hover:bg-[#427FD9]",
            text: "text-gray-800 group-hover:text-white",
            placeholder: "text-gray-600 group-hover:text-white/90 font-light",
            icon: "text-gray-500 group-hover:text-white/90",
        },
    }

    return (
        <div className={`relative w-full ${className}`}>
            {label && (
                <label
                    className="text-base font-medium text-gray-700 block"
                    htmlFor={label}
                >
                    {label}
                </label>
            )}
            <button
                {...getReferenceProps({
                    ref(node: Element | null) {
                        refs.setReference(node)
                        triggerRef.current = node as HTMLButtonElement
                    },
                    type: "button",
                    className: `relative w-full rounded-lg py-2 pl-2 pr-6 text-left transition-all duration-200 text-base group mt-[4px] outline-none ${colors[theme].main
                        }`,
                    "aria-haspopup": "listbox",
                    "aria-expanded": isOpen,
                    "aria-labelledby": label ? `${label}-label` : undefined,
                })}
            >
                <span
                    className={`truncate block w-full transition-all ${selectedOption ? colors[theme].text : colors[theme].placeholder
                        }`}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <IconChevronDown
                    size={22}
                    className={`${colors[theme].icon} absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>
            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            {...getFloatingProps({
                                ref: refs.setFloating,
                                style: {
                                    position: strategy,
                                    top: y ?? 0,
                                    left: x ?? 0,
                                    width: width ? width : triggerRef.current?.offsetWidth,
                                },
                                className: "z-[999999999999] bg-white border border-gray-200 rounded-lg",
                                role: "listbox",
                                "aria-labelledby": label ? `${label}-label` : undefined,
                            })}
                            initial={initialMotion}
                            animate={animateMotion}
                            exit={initialMotion}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                            {searchTerm && (
                                <div className="px-2 py-1 bg-builder text-white text-xs w-max rounded-br-md">
                                    Searching: {searchTerm}
                                </div>
                            )}
                            <ScrollWrapper className="max-h-[300px]" showAlways>
                                {filteredOptions.length === 0 ? (
                                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                        No options found
                                    </div>
                                ) : (
                                    filteredOptions.map((option, idx) => (
                                        <div
                                            key={option.value}
                                            className={`relative cursor-pointer select-none px-4 py-2.5 transition-colors duration-150 flex gap-x-2 ${option.value === value
                                                ? "bg-gray-200/90 text-gray-800"
                                                : ""
                                                } ${highlightedIndex === idx &&
                                                    option.value !== value
                                                    ? "bg-gray-100"
                                                    : ""
                                                } ${highlightedIndex !== idx &&
                                                    option.value !== value
                                                    ? "text-gray-800 hover:bg-gray-50"
                                                    : ""
                                                }`}
                                            onClick={() => {
                                                onChange?.(option.value)
                                                setIsOpen(false)
                                            }}
                                        >
                                            <span className="flex-1 truncate text-base">
                                                {option.label}
                                            </span>
                                            {option.value === value && (
                                                <IconCheck size={18} className="text-builder" />
                                            )}
                                        </div>
                                    ))
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
