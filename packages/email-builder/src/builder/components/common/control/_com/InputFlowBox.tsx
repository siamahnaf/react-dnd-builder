"use client";
import { IconSettings } from "../../../../icons";

//Interface
interface Props {
    label?: string;
    value?: string;
    onChange?: (e: string) => void;
    onSettings?: () => void;
    placeholder?: string;
}

const InputFlowBox = ({ label, value, onChange, placeholder, onSettings }: Props) => {
    return (
        <div className="mt-3">
            <h4 className="text-sm text-gray-500 mb-3">
                {label}
            </h4>
            <div className="border border-solid border-black/20 flex rounded-sm">
                <input
                    className="focus:outline-none text-sm py-1 px-2 appearance-none w-full"
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                />
                <button className="border-l border-solid border-black/20 px-2 flex items-center justify-center" onClick={onSettings}>
                    <IconSettings size={18} />
                </button>
            </div>
        </div>
    );
}

export default InputFlowBox;