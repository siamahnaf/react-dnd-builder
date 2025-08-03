import { JSX, cloneElement } from "react";

//Interface
interface Props {
    current: number;
    list: {
        icon: JSX.Element;
        name: string;
    }[];
    onChange: (e: number) => void;
}

const StylusTab = ({ current, list, onChange }: Props) => {
    return (
        <div className="flex border-b border-solid border-gray-100">
            {list.map((item, i) => (
                <button className={`flex-1 py-2 ${i === current ? "bg-builder text-white" : "text-gray-800 hover:bg-gray-100"}`} onClick={() => onChange(i)} key={i}>
                    {cloneElement(item.icon, {
                        size: 19,
                        className: "mx-auto"
                    })}
                    <span className="text-sm mt-1">{item.name}</span>
                </button>
            ))}
        </div>
    );
};

export default StylusTab;