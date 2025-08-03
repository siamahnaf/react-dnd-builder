"use client"
import { useState, useEffect, useRef } from "react";
import moment from "moment";
import { IconAlarmFilled, IconX } from "../../icons";
import { createPortal } from "react-dom";
import { useFloating, offset, flip, shift, autoUpdate, useInteractions, useClick, useDismiss } from "@floating-ui/react"
import { AnimatePresence, motion } from "framer-motion";
import { useEditor } from "../../context/editor.context";
import { TDatetime } from "../../types/elements";
import CustomSelect from "./CustomSelect";

//Motions
const initialMotion = { opacity: 0, scale: 0.95 };
const animateMotion = { opacity: 1, scale: 1 };

//Interface
interface TimeSelection {
    hours: string;
    minutes: string;
}
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
    const [timeSelection, setTimeSelection] = useState<TimeSelection>({ hours: "00", minutes: "00" });

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
    const handleTimeChange = (type: "hours" | "minutes", value: string) => {
        const timeValue = value.padStart(2, "0");
        setTimeSelection(prev => ({ ...prev, [type]: timeValue }));
    };

    const applyTimeSelection = () => {
        const time = `${timeSelection.hours}:${timeSelection.minutes}:00`;
        onChange?.(time);
        setOpen(false);
    };

    const getDisplayValue = () => {
        if (!value) return "";
        return moment(value, "HH:mm:ss").format(`${general?.timeFormat || "HH:mm"}`);
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

    //Initialize Calendar
    useEffect(() => {
        if (value) {
            const timeFormate = moment(value, "HH:mm:ss");
            setTimeSelection({
                hours: timeFormate.format("HH"),
                minutes: timeFormate.format("mm")
            });
        }
    }, [value]);

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
                        <IconAlarmFilled className="text-lg text-main" />
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
                        <div className="p-4">
                            <h3 className="text-lg font-medium opacity-90">Select Time</h3>

                            <div className="flex items-center gap-x-2 mt-4">
                                <CustomSelect
                                    placeholder="00"
                                    value={timeSelection.hours}
                                    onChange={(e) => handleTimeChange("hours", e)}
                                    options={Array.from({ length: 24 }, (_, i) => ({ label: i.toString().padStart(2, "0"), value: i.toString().padStart(2, "0") }))}
                                />
                                <span className="text-gray-500">:</span>
                                <CustomSelect
                                    placeholder="00"
                                    value={timeSelection.minutes}
                                    onChange={(e) => handleTimeChange("minutes", e)}
                                    options={Array.from({ length: 60 }, (_, i) => ({ label: i.toString().padStart(2, "0"), value: i.toString().padStart(2, "0") }))}
                                />
                            </div>
                            <div className="flex justify-end mt-6 gap-x-4">
                                <button
                                    className="px-4 py-1.5 border rounded-md text-gray-700 hover:bg-gray-100 border-gray-300"
                                    onClick={() => setOpen(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="px-4 py-1.5 DateTimeThemeBg text-white rounded-md border border-solid"
                                    onClick={applyTimeSelection}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </motion.div>}
            </AnimatePresence>, document.body)}
        </div>
    );
};

export default TimerRoot;