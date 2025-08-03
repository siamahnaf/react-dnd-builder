import { useState, useRef } from "react";
import moment from "moment";
import { IconCalendarWeek, IconX } from "../../icons";
import { createPortal } from "react-dom";
import { useFloating, offset, flip, shift, autoUpdate, useInteractions, useClick, useDismiss } from "@floating-ui/react"
import { AnimatePresence, motion } from "framer-motion";
import { useEditor } from "../../context/editor.context";
import { TDatetime } from "../../types/elements";

//Motions
const initialMotion = { opacity: 0, scale: 0.95 };
const animateMotion = { opacity: 1, scale: 1 };

//Interface
interface Props {
    value?: string;
    onChange?: (e: string) => void;
    item: TDatetime;
    isReadOnly: boolean;
}

const TimerRoot = ({ onChange, value, item, isReadOnly }: Props) => {
    //Editor
    const { settings, form } = useEditor();
    const { name, general, layout } = item;
    const { theme } = settings;

    //State
    const [open, setOpen] = useState<boolean>(false);

    //Floating UI
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

    //Ref
    const triggerRef = useRef<HTMLInputElement>(null);

    //Handler
    const onMonthSelect = (month: number) => {
        onChange?.(moment().month(month).format("MMMM"))
        setOpen(false);
    };
    const getDisplayValue = () => {
        if (!value) return "";
        return moment(value, "MMMM").format(`${general?.monthFormat || "MMMM"}`);
    };

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
                .IconAlarmFilled:after {
                    background: ${theme?.accentBgColor};
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
                        placeholder: general?.placeholder || "Select time"
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
                        <div className="grid grid-cols-3 gap-2">
                            {moment.monthsShort().map((month, index) => {
                                const isCurrentMonth = index === moment().month();
                                const isSelectedMonth = value && moment(value, "MMMM").month() === index;

                                return (
                                    <button
                                        key={month}
                                        type="button"
                                        onClick={() => onMonthSelect?.(index)}
                                        className={`py-1.5 text-center rounded-lg transition-all ${isSelectedMonth ? "DateTimeThemeBg text-white" : isCurrentMonth ? "DateTimeThemeText font-medium" : "text-gray-600"}`}
                                    >
                                        {month}
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