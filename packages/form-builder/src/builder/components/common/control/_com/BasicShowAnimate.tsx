import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

//Interface
interface Props {
    id?: string;
    show?: boolean;
    children?: ReactNode;
}

const BasicShowAnimate = ({ show, id, children }: Props) => {
    return (
        <AnimatePresence>
            {show &&
                <motion.div
                    key={id}
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                >
                    {children}
                </motion.div>
            }
        </AnimatePresence>
    );
};

export default BasicShowAnimate;