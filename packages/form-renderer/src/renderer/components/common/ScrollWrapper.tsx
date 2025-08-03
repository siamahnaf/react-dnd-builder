import { ReactNode } from "react";

interface ScrollWrapperProps {
    children: ReactNode;
    className?: string;
    showAlways?: boolean;
}

const ScrollWrapper = ({ children, className = "", showAlways = false }: ScrollWrapperProps) => {
    const colorClass = showAlways ? "[&::-webkit-scrollbar-thumb]:bg-gray-200" : "[&::-webkit-scrollbar-thumb]:bg-transparent"

    return (
        <div
            className={`overflow-auto ${className} [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent ${colorClass} [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300`}>
            {children}
        </div>
    );
};

export default ScrollWrapper;
