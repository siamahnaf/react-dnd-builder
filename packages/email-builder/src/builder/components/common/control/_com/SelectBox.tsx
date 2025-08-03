"use client"
import { IconChevronDown } from "../../../../icons";

//Components
import DeviceSwitcher from "../_helpers/DeviceSwitcher";

//Interface
interface Props {
    label?: string;
    value?: string;
    onChange?: (e: string) => void;
    options?: { value: string, label: string }[];
    isDevice?: boolean;
}

const ContentWidthType = ({ label, value, onChange, options = [], isDevice = false }: Props) => {
    return (
        <div className="grid grid-cols-2 gap-2 items-center">
            <div className="flex gap-4 items-center">
                <label className="text-sm text-gray-500">{label}</label>
                {isDevice &&
                    <DeviceSwitcher />
                }
            </div>
            <div className="relative">
                <select
                    className="focus:outline-none border border-solid border-black/20 text-sm cursor-pointer py-1 pl-2 pr-7 rounded-sm appearance-none w-full"
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                >
                    {options.map((item, i) => (
                        <option value={item.value} key={i}>{item.label}</option>
                    ))}
                </select>
                <div className="absolute top-1/2 -translate-y-1/2 right-1  pointer-events-none">
                    <IconChevronDown size={20} />
                </div>
            </div>
        </div>
    );
};

export default ContentWidthType;