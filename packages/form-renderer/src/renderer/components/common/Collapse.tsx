import { AnimatePresence, motion, cubicBezier } from "framer-motion";

interface CollapseProps {
    open: boolean;
    children: React.ReactNode;
}

const Collapse = ({ open, children }: CollapseProps) => {
    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0, y: -8 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: cubicBezier(0.4, 0, 0.2, 1) }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Collapse;