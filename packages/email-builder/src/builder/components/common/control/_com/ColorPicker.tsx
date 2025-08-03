"use client"
import { useState } from "react";
import { ColorPicker as ColorPick } from "@siamf/react-color-pick";
import { motion, AnimatePresence } from "framer-motion";
import "@siamf/react-color-pick/dist/index.css";

//Hook
import { useClickOutside } from "../../../../components/hooks/useClickOutside";

//Interface
interface Props {
    label?: string;
    value?: string;
    onChange?: (e: string) => void;
}


const ColorPicker = ({ label, value, onChange }: Props) => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    //Ref
    const ref = useClickOutside(() => setOpen(false));

    return (
        <div className="grid grid-cols-2 gap-2 items-center">
            <label className="text-sm text-gray-500">
                {label}
            </label>
            <div ref={ref} className="relative">
                <div className="w-7 h-7 ml-auto flex justify-center items-center rounded-sm bg-gray-300 select-none cursor-pointer" onClick={() => setOpen(!open)}>
                    <div className={`w-3 h-3 rounded-sm relative ${!value && "bg-gray-400 after:w-6 after:h-px after:bg-red-600 after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:-rotate-45"}`} style={{ background: value }} />
                </div>
                <AnimatePresence>
                    {open &&
                        <motion.div
                            className="absolute top-full mt-2 z-[999] right-0 w-[260px]"
                            initial={{ opacity: 0, scale: 0.95, y: -5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -5 }}
                            transition={{ duration: 0.1 }}
                        >
                            <ColorPick
                                value={value}
                                onChange={onChange}
                            />
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ColorPicker;