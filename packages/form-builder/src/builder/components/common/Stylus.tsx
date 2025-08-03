"use client"
import { ReactElement, ReactNode, useState, isValidElement } from "react";
import { IconCaretRightFilled } from "../../icons";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";

//Interface
interface Props {
    render?: boolean;
    children?: ReactNode;
}
interface CProps {
    type: string;
    children: ReactNode;
}
interface MProps {
    buttons?: string[];
    children?: ReactElement<CProps> | ReactElement<CProps>[];
}
interface RProps {
    children: ReactNode;
}

const Stylus = ({ render = false, children }: Props) => {
    if (!render) return null;
    return (children);
};

const M = ({ buttons = [], children }: MProps) => {
    //State
    const [active, setActive] = useState<string | null>(buttons[0]);

    //Matched
    const matched = Array.isArray(children)
        ? children.find(child => isValidElement(child) && child.props?.type === active)
        : isValidElement(children) && children.props?.type === active
            ? children
            : null;

    return (
        <div className="">
            {buttons?.map((item, i) => (
                <div className="border-b border-solid border-gray-200/60 px-3.5" key={i}>
                    <button className="flex gap-0.5 items-center w-full py-3" onClick={() => setActive(prev => prev === item ? null : item)}>
                        <IconCaretRightFilled size={16} className={`${active === item ? "rotate-90" : "rotate-0"} transition-all duration-200`} />
                        <span className="text-base font-medium text-gray-700">{item}</span>
                    </button>
                    <AnimatePresence initial={false}>
                        {matched && item === active && (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0, height: 0, y: -8 }}
                                animate={{ opacity: 1, height: "auto", y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -8 }}
                                transition={{ duration: 0.25, ease: cubicBezier(0.4, 0, 0.2, 1) }}
                                className="overflow-hidden"
                            >
                                {matched}
                                <div className="h-4" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}

const C = ({ children }: CProps) => {
    return children;
};

const R = ({ children }: RProps) => {
    return (
        <div className="px-3.5 py-2.5">
            {children}
        </div>
    )
}

Stylus.m = M;
Stylus.c = C;
Stylus.r = R;

export default Stylus;