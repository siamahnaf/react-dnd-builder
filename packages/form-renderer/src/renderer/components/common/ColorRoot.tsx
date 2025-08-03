"use client"
import { useState } from "react";
import { ColorPicker as ColorPick } from "@siamf/react-color-pick";
import { motion, AnimatePresence } from "framer-motion";
import "@siamf/react-color-pick/dist/index.css";
import { useFloating, offset, flip, shift, autoUpdate, useInteractions, useClick, useDismiss } from "@floating-ui/react";
import { createPortal } from "react-dom";
import { TColor } from "../../types/elements";
import { useEditor } from "../../context/editor.context";

interface Props {
    value?: string;
    onChange?: (value: string) => void;
    item: TColor;
    isReadOnly: boolean;
}

const ColorRoot = ({ value, onChange, item, isReadOnly }: Props) => {
    //Editor
    const { settings, form } = useEditor();
    const { general, name, layout } = item;
    const { theme } = settings;

    //State
    const [open, setOpen] = useState<boolean>(false);

    // Floating UI setup
    const { x, y, refs, strategy, context } = useFloating({
        open: open,
        onOpenChange: setOpen,
        placement: "bottom-start",
        middleware: [offset(6), flip(), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate,
    })
    const click = useClick(context)
    const dismiss = useDismiss(context)
    const { getFloatingProps } = useInteractions([click, dismiss])

    //Animation
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
    return (
        <div className="relative">
            <style jsx>{`
                .ColorBar {
                    background: ${theme?.fieldBgColor};
                    border-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.fieldBorderColor};
                    color: ${theme?.fieldTextColor};
                    width: ${layout?.fieldWidth?.value || 100}${layout?.fieldWidth?.unit || "%"};
                }
                .ColorBar:focus {
                    outline-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.accentBgColor}
                }
                .ColorBarUnderline:focus {
                    box-shadow: ${theme?.accentBgColor} 0px 2px;
                    border-color: transparent;
                }
            `}</style>
            <div className={`${isReadOnly ? "pointer-events-none" : ""} cursor-pointer select-none`} onClick={() => setOpen(!open)} ref={refs.setReference}>
                {general?.displayType === "box" &&
                    <div className="w-7 h-7 flex justify-center items-center rounded-sm bg-gray-300 select-none cursor-pointer">
                        <div className={`w-3 h-3 rounded-sm relative ${!value && "bg-gray-400 after:w-6 after:h-px after:bg-red-600 after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:-rotate-45"}`} style={{ background: value }} />
                    </div>
                }
                {general?.displayType === "bar" &&
                    <button className={`${getTheme()} h-[48px] block p-1 ColorBar ${theme?.theme === "underline" && "ColorBarUnderline"} `}>
                        <div className="w-full h-full rounded-lg" style={{ background: value }} />
                    </button>
                }
            </div>
            {createPortal(
                <AnimatePresence>
                    {open &&
                        <motion.div
                            {...getFloatingProps({
                                ref: refs.setFloating,
                                style: {
                                    position: strategy,
                                    top: y ?? 0,
                                    left: x ?? 0
                                },
                                className: "z-[999] w-[300px] bg-white p-3 border  border-solid border-gray-200 rounded-lg",
                                role: "listbox"
                            })}
                            initial={initialMotion}
                            animate={animateMotion}
                            exit={initialMotion}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                            <ColorPick
                                value={value}
                                onChange={onChange}
                            />
                        </motion.div>
                    }
                </AnimatePresence>, document.body
            )}
        </div>
    );
};

export default ColorRoot;