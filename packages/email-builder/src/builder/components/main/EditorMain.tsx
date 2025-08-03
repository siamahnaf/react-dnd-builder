"use client"
import { useState } from "react";
import Sidebar from "../layouts/Sidebar";
import RootLayout from "../layouts/RootLayout";
import { IconChevronsLeft, IconChevronsRight } from "../../icons";

const EditorMain = () => {
    //State
    const [isResizing, setResizing] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(320);
    const [hide, setHide] = useState<boolean>(false);

    //Handler
    const handleMouseDown = () => {
        setResizing(true);
        const handleMouseUp = () => {
            setResizing(false);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
        const handleMouseMove = (event: MouseEvent) => {
            let newWidth = event.clientX;
            newWidth = Math.max(250, Math.min(750, newWidth));
            setWidth(newWidth);
        };
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);
    };

    return (
        <div className={`flex h-[calc(100vh-55px)] ${isResizing && "cursor-ew-resize"}`}>
            <div className={`relative bg-white border-r border-solid border-gray-50 shadow-[4px_0_12px_rgba(0,0,0,0.03)] ${!isResizing && "transition-all duration-[400ms]"}`} style={{ flex: `0 0 ${width}px`, width: `${width}px`, flexBasis: `${width}px`, marginLeft: hide ? `-${width}px` : 0 }}>
                <div className="h-full overflow-auto">
                    <Sidebar />
                </div>
                <div className="absolute w-2 h-full right-0 top-0 cursor-ew-resize select-none z-10" onMouseDown={handleMouseDown}></div>
                <button className={`absolute bottom-[10%] right-0 w-[40px] h-[40px] border border-solid border-gray-200 transition-all duration-300 rounded-full flex items-center justify-center ${hide ? "translate-x-[40px]" : "translate-x-[20px]"} text-white bg-builder z-[99]`} onClick={() => setHide(prev => !prev)}>
                    {hide ? <IconChevronsRight /> : <IconChevronsLeft />}
                </button>
            </div>
            <div className="h-full overflow-auto flex-1">
                <RootLayout />
            </div>
        </div>
    );
};

export default EditorMain;