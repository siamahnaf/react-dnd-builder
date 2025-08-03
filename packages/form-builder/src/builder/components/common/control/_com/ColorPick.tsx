"use client"
import { useState } from "react";
import { ColorPicker as ColorPick } from "@siamf/react-color-pick";
import { motion, AnimatePresence } from "framer-motion";
import "@siamf/react-color-pick/dist/index.css";
import { useFloating, offset, flip, shift, autoUpdate, useInteractions, useClick, useDismiss } from "@floating-ui/react";
import { createPortal } from "react-dom";

//Interface
interface Props {
    label?: string;
    value?: string;
    onChange?: (e: string) => void;
    className?: string;
}

const ColorPicker = ({ label, value, onChange, className = "" }: Props) => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    // Floating UI setup
    const { x, y, refs, strategy, context } = useFloating({
        open: open,
        onOpenChange: setOpen,
        placement: "bottom-end",
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

    return (
        <div className={`grid grid-cols-2 gap-2 items-center ${className}`} >
            <label className="text-base font-medium text-gray-700 block">
                {label}
            </label>
            <div className="relative">
                <div className="w-7 h-7 ml-auto flex justify-center items-center rounded-sm bg-gray-300 select-none cursor-pointer" onClick={() => setOpen(!open)} ref={refs.setReference}>
                    <div className={`w-3 h-3 rounded-sm relative ${!value && "bg-gray-400 after:w-6 after:h-px after:bg-red-600 after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:-rotate-45"}`} style={{ background: value }} />
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
                                    role: "listbox",
                                    "aria-labelledby": label ? `${label}-label` : undefined,
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
        </div>
    );
};

export default ColorPicker;