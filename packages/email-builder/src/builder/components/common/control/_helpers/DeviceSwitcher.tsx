"use client";
import { useState } from "react";
import { IconDeviceImac, IconDeviceIpad, IconDeviceMobile } from "../../../../icons";
import { motion, AnimatePresence } from "framer-motion";

//Helpers Hook
import { useClickOutside } from "../../../../components/hooks/useClickOutside";

//Store
import { useEditor } from "../../../../context/editor.context";

const DeviceSwitcher = () => {
    //State
    const [open, setOpen] = useState(false);

    //Handler
    const ref = useClickOutside(() => setOpen(false));

    //Store
    const { device } = useEditor();

    //On Select
    const onSelect = (value: "mobile" | "desktop" | "tablet") => {
        device.setValue(value);
        setOpen(false)
    }

    return (
        <div ref={ref} className="relative">
            <div onClick={() => setOpen(!open)} className="cursor-pointer select-none hover:text-builder">
                {device.value === "desktop" &&
                    <IconDeviceImac size={16} />
                }
                {device.value === "tablet" &&
                    <IconDeviceIpad size={16} />
                }
                {device.value === "mobile" &&
                    <IconDeviceMobile size={16} />
                }
            </div>
            <AnimatePresence>
                {open &&
                    <motion.ul
                        className="absolute top-0 bg-white shadow-xl border border-solid border-gray-300 z-30 rounded-md px-2 py-1.5 left-1/2 -translate-x-1/2 [&_li]:select-none [&_li]:cursor-pointer space-y-2"
                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                        transition={{ duration: 0.1 }}
                    >
                        <li onClick={() => onSelect("desktop")}>
                            <IconDeviceImac size={18} />
                        </li>
                        <li onClick={() => onSelect("tablet")}>
                            <IconDeviceIpad size={18} />
                        </li>
                        <li onClick={() => onSelect("mobile")}>
                            <IconDeviceMobile size={18} />
                        </li>
                    </motion.ul>
                }
            </AnimatePresence>
        </div>
    );
};

export default DeviceSwitcher;