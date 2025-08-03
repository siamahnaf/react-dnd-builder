"use client";
import { useState } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";

//Components
import PreviewHeader from "./_helpers/_preview/PreviewHeader";
import PreviewBody from "./_helpers/_preview/PreviewBody";

const Preview = () => {
    const [isResizing, setResizing] = useState(false);
    const [width, setWidth] = useState(420);
    const [hide, setHide] = useState(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setResizing(true);
        document.body.classList.add("cursor-col-resize");

        const startX = e.clientX;
        const startWidth = width;

        const handleMouseMove = (event: MouseEvent) => {
            const deltaX = event.clientX - startX;
            const newWidth = Math.max(250, Math.min(750, startWidth - deltaX));
            setWidth(newWidth);
        };

        const handleMouseUp = () => {
            setResizing(false);
            document.body.classList.remove("cursor-col-resize");
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    const variants = {
        initial: {
            marginRight: `-${width}px`,
            opacity: 0,
            scale: 0.98,
        },
        animate: {
            marginRight: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.35,
                ease: cubicBezier(0.25, 0.8, 0.25, 1),
            },
        },
        exit: {
            marginRight: `-${width}px`,
            opacity: 0,
            scale: 0.98,
            transition: {
                duration: 0.3,
                ease: cubicBezier(0.25, 0.8, 0.25, 1),
            },
        },
    };

    return (
        <AnimatePresence mode="wait">
            {!hide && (
                <motion.div
                    key="sidebar"
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{
                        flex: `0 0 ${width}px`,
                        width: `${width}px`,
                        flexBasis: `${width}px`,
                    }}
                    className={`relative z-10 bg-white border-l border-gray-200/70 ${isResizing ? "cursor-col-resize select-none" : ""}`}
                >
                    <div className="h-full relative">
                        <PreviewHeader onClose={() => setHide(true)} />
                        <PreviewBody />
                    </div>
                    <div
                        className="w-[6px] h-full bg-transparent absolute top-1/2 -translate-y-1/2 rounded-full cursor-col-resize"
                        onMouseDown={handleMouseDown}
                    />
                </motion.div>
            )}

            {hide && (
                <motion.div
                    key="handle"
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: -10 }}
                    exit={{ opacity: 0, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-[12px] h-[70px] bg-builder rounded-full cursor-pointer absolute top-1/2 - translate-y-1/2 right-0"
                    onClick={() => setHide(false)}
                />
            )}
        </AnimatePresence>
    );
};

export default Preview;
