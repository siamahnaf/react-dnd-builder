"use client"
import { useState } from "react";
import { IconChevronDown } from "../../../../icons";
import { motion, AnimatePresence } from "framer-motion";

//Helpers Hook
import { useClickOutside } from "../../../../components/hooks/useClickOutside";

//Interface
interface Props {
    value?: string;
    onChange?: (e: string) => void;
    options?: string[];
}

const UnitSelector = ({ onChange, value, options = [] }: Props) => {
    //State
    const [open, setOpen] = useState(false);

    //Handler
    const ref = useClickOutside(() => setOpen(false));

    //Handler
    const onSelect = (value: string) => {
        setOpen(false);
        onChange?.(value)
    }

    return (
        <div ref={ref} className="relative">
            <div onClick={() => setOpen(!open)} className="cursor-pointer select-none text-sm flex items-center gap-px hover:text-builder text-gray-500">
                <span>{value}</span>
                <IconChevronDown size={15} />
            </div>
            <AnimatePresence>
                {open &&
                    <motion.ul
                        className="absolute top-0 bg-white shadow-xl border border-solid border-gray-300 z-30 rounded-md px-2 py-1.5 left-1/2 -translate-x-1/2 [&_li]:select-none [&_li]:cursor-pointer space-y-2 [&_li]:text-xs [&_li]:text-left"
                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                        transition={{ duration: 0.1 }}
                    >
                        {options.map((item, i) => (
                            <li onClick={() => onSelect(item)} key={i}>
                                {item}
                            </li>
                        ))}
                    </motion.ul>
                }
            </AnimatePresence>
        </div>
    );
};

export default UnitSelector;