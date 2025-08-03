"use client"
import { useState, useRef } from "react";
import moment from "moment";
import { IconCalendarWeek, IconX, IconChevronLeft, IconChevronRight } from "../../icons";
import { createPortal } from "react-dom";
import { useFloating, offset, flip, shift, autoUpdate, useInteractions, useClick, useDismiss } from "@floating-ui/react"
import { AnimatePresence, motion } from "framer-motion";
import { useEditor } from "../../context/editor.context";
import { TDatetime } from "../../types/elements";

// Motions
const initialMotion = { opacity: 0, scale: 0.95 };
const animateMotion = { opacity: 1, scale: 1 };

// Interface
interface Props {
    value?: string;
    onChange?: (e: string) => void;
    item: TDatetime;
    isReadOnly: boolean;
}

const TimerRoot = ({ onChange, value, item, isReadOnly }: Props) => {
    // Editor
    const { settings, form } = useEditor();
    const { name, general, layout } = item;
    const { theme } = settings;

    // State
    const [open, setOpen] = useState<boolean>(false);
    const [currentYear, setCurrentYear] = useState<number>(moment().year());

    // Floating UI
    const { x, y, strategy, refs, context } = useFloating({
        open,
        onOpenChange: setOpen,
        placement: "bottom-start",
        middleware: [offset(4), flip(), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate,
    });
    const click = useClick(context)
    const dismiss = useDismiss(context)
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss])

    // Ref
    const triggerRef = useRef<HTMLInputElement>(null);

    // Handlers
    const prevYears = () => {
        setCurrentYear(prev => prev - 10);
    };

    const nextYears = () => {
        setCurrentYear(prev => prev + 10);
    };

    const onYearSelect = (year: number) => {
        onChange?.(year.toString());
        setOpen(false);
    };

    const getDisplayValue = () => {
        if (!value) return general?.placeholder || "Select year";
        return moment(value, "YYYY").format(general?.yearFormat || "YYYY");
    };

    // Calculate decade start and end
    const decadeStart = Math.floor(currentYear / 10) * 10;
    const decadeEnd = decadeStart + 9;

    // Theme
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

    return (
        <div>
            <style jsx>{`
                .DateTime {
                    background: ${theme?.fieldBgColor};
                    border-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.fieldBorderColor};
                    color: ${theme?.fieldTextColor};
                    width: ${layout?.fieldWidth?.value || 100}${layout?.fieldWidth?.unit || "%"};
                    text-align: ${layout?.valueAlignment || "auto"};
                }
                .DateTimeThemeText {
                    color: ${theme?.accentBgColor};
                }
                .DateTimeThemeBg {
                    background: ${theme?.accentBgColor};
                }
                .DateTime:focus {
                    outline-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.accentBgColor}
                }
                .DateTimeUnderline:focus {
                    outline-style: none;
                    box-shadow: ${theme?.accentBgColor} 0px 2px;
                    border-color: transparent;
                }
                .DateTimeBorderLess {
                    outline-style: none;
                }
                .IconArrowColor {
                    color: ${theme?.fieldTextColor};
                }
            `}</style>
            <div className="relative mt-[4px]">
                <input
                    {...getReferenceProps({
                        ref(node: Element | null) {
                            refs.setReference(node)
                            triggerRef.current = node as HTMLInputElement
                        },
                        value: getDisplayValue(),
                        autoComplete: "off",
                        role: "presentation",
                        readOnly: true,
                        type: "text",
                        placeholder: general?.placeholder || "Select year"
                    })}
                    className={`${getTheme()} relative h-[48px] pl-3 pr-10 cursor-pointer text-base DateTime ${theme?.theme === "border-less" && "DateTimeBorderLess"} ${theme?.theme === "underline" && "DateTimeUnderline"} ${isReadOnly ? "pointer-events-none" : ""}`}
                />
                {!value && (
                    <span className="absolute top-1/2 right-4 pointer-events-none -translate-y-1/2 IconArrowColor">
                        <IconCalendarWeek className="text-lg text-main" />
                    </span>
                )}
                {value && (
                    <button
                        className="absolute top-1/2 right-2 -translate-y-1/2 IconArrowColor hover:bg-gray-200 p-1.5 rounded-md transition-all"
                        type="button"
                        onClick={() => { onChange?.(""); }}
                    >
                        <IconX size={20} />
                    </button>
                )}
            </div>
            {createPortal(<AnimatePresence>
                {open &&
                    <motion.div
                        {...getFloatingProps({
                            ref: refs.setFloating,
                            style: {
                                position: strategy,
                                top: y ?? 0,
                                left: x ?? 0,
                                width: triggerRef.current?.offsetWidth,
                                maxWidth: 400
                            },
                            className: "z-[99999] p-2 bg-white border border-solid rounded-lg border-gray-200/80",
                            role: "listbox"
                        })}
                        initial={initialMotion}
                        animate={animateMotion}
                        exit={initialMotion}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                        <div className="flex justify-between mb-3 items-center">
                            <button className="text-text-main font-bold py-1.5 px-2 rounded" onClick={prevYears} type="button">
                                <IconChevronLeft size={28} stroke={1.4} />
                            </button>
                            <div className="flex items-center justify-center">
                                <button className="text-lg font-medium hover:bg-secondary px-2 py-px rounded-md transition-all" type="button">
                                    {decadeStart} - {decadeEnd}
                                </button>
                            </div>
                            <button className="text-text-main font-bold py-1.5 px-2 rounded" onClick={nextYears} type="button">
                                <IconChevronRight size={28} />
                            </button>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {Array.from({ length: 10 }, (_, i) => {
                                const year = decadeStart + i;
                                const currentYearNum = moment().year();
                                const isSelectedYear = year.toString() === value;
                                const isCurrentYear = year === currentYearNum;

                                return (
                                    <button
                                        key={year}
                                        type="button"
                                        onClick={() => onYearSelect(year)}
                                        className={`py-1.5 text-center rounded-lg transition-all ${isSelectedYear
                                            ? "DateTimeThemeBg text-white"
                                            : isCurrentYear
                                                ? "DateTimeThemeText font-medium"
                                                : "text-gray-600"
                                            }`}
                                    >
                                        {year}
                                    </button>
                                )
                            })}
                        </div>
                    </motion.div>}
            </AnimatePresence>, document.body)}
        </div>
    );
};

export default TimerRoot;