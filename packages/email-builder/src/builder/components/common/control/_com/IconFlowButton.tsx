"use client"
import { cloneElement } from "react";
import { Tooltip } from "@siamf/tooltip";

//Components
import DeviceSwitcher from "../_helpers/DeviceSwitcher";

//Icons
import { JustifyStart, JustifyCenter, JustifyEnd, JustifyEven, JustifyAround, JustifyBetween } from "../../../../icons";

//Interface
interface Props {
    label?: string;
    isDevice?: boolean;
    iconSets?: "justify";
    value?: string;
    onChange?: (e: string) => void;
}

const IconFlowButton = ({ label, isDevice = true, iconSets = "justify", value, onChange }: Props) => {
    return (
        <div className="mt-5">
            <div className="flex gap-4 items-center">
                <label className="text-sm text-gray-500">
                    {label}
                </label>
                {isDevice &&
                    <DeviceSwitcher />
                }
            </div>
            <div className="flex border border-solid border-black/10 rounded-sm mt-3">
                {lists[iconSets].map((item, i) => (
                    <Tooltip content={item.title} key={i} containerClassName="flex-1">
                        <button
                            className={`px-2 w-full py-2 flex items-center justify-center ${value === item.value ? "bg-black/20 border-transparent" : "border-black/10"} ${i !== 0 && "border-l"}`}
                            onClick={() => onChange?.(item.value === value ? "" : item.value)}
                        >
                            {cloneElement(item.icon, {
                                size: 16
                            })}
                        </button>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};

export default IconFlowButton;

const lists = {
    justify: [
        { value: "flex-start", icon: <JustifyStart />, title: "Start" },
        { value: "center", icon: <JustifyCenter />, title: "Center" },
        { value: "flex-end", icon: <JustifyEnd />, title: "End" },
        { value: "space-between", icon: <JustifyBetween />, title: "Space Between" },
        { value: "space-around", icon: <JustifyAround />, title: "Space Around" },
        { value: "space-evenly", icon: <JustifyEven />, title: "Space Evenly" }
    ]
}