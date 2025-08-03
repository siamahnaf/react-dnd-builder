"use client"
import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconPencil } from "../../../../icons";

//Hooks
import { useClickOutside } from "../../../../components/hooks/useClickOutside";

//Interface
interface Props {
    label?: string;
    children?: ReactNode;
}

const OptionsGroup = ({ label, children }: Props) => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    //Ref
    const ref = useClickOutside(() => setOpen(false));

    return (
        <div className="grid grid-cols-2 gap-2 items-center relative" ref={ref}>
            <label className="text-sm text-gray-500">
                {label}
            </label>
            <div className="relative flex items-center justify-end">
                <button className={`w-7 h-7 rounded-sm flex justify-center items-center border border-solid border-black/10`} onClick={() => setOpen(!open)}>
                    <IconPencil size={18} />
                </button>
            </div>
            <AnimatePresence>
                {open &&
                    <motion.div
                        className="absolute top-full mt-2 z-[999] right-0 bg-white shadow-lg border border-solid border-gray-100 rounded-lg px-4 py-3 w-full"
                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                        transition={{ duration: 0.1 }}
                    >
                        {children}
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
};

export default OptionsGroup;