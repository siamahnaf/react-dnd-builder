"use client";
import { useState } from "react";
import { IconLink } from "../../../../icons";

//Components
import DeviceSwitcher from "../_helpers/DeviceSwitcher";
import UnitSelector from "../_helpers/UniSelector";

//Interface
type DirectionTypes = "all" | "top" | "bottom" | "left" | "right" | "column" | "row";
interface Props {
    values?: { value: string, direction: DirectionTypes }[];
    onChange?: (e: { value: string, direction: DirectionTypes }) => void;
    isDevice?: boolean;
    label?: string;
    unit?: string;
    onUnitChange?: (e: string) => void;
    units?: string[];
}

const GroupInput = ({ values = [], isDevice = true, label, unit, onUnitChange, units = [], onChange }: Props) => {
    //State
    const [link, setLink] = useState<boolean>(true);

    //Handler
    const onValueChange = (item: { value: string, direction: DirectionTypes }) => {
        if (link) onChange?.({ value: item.value, direction: "all" });
        else onChange?.(item);
    }

    return (
        <div className="mt-5">
            <div className="grid grid-cols-2 gap-3">
                <div className="flex gap-4 items-center">
                    <label className="text-sm text-gray-500">
                        {label}
                    </label>
                    {isDevice &&
                        <DeviceSwitcher />
                    }
                </div>
                {units?.length > 0 &&
                    <div className="text-right w-max ml-auto">
                        <UnitSelector
                            value={unit}
                            onChange={onUnitChange}
                            options={units}
                        />
                    </div>
                }
            </div>
            <div className="flex mt-3">
                <div className="flex-1 flex">
                    {values.map((item, i) => (
                        <div className="flex-1" key={i}>
                            <input
                                className={`focus:outline-none border-t border-l border-b border-solid border-black/20 h-[34px] px-2 text-sm text-gray-500 w-full ${i === 0 && "rounded-s-[3px]"}`}
                                type="number"
                                onChange={(e) => onValueChange({ value: e.target.value, direction: item.direction })}
                                value={item.value}
                            />
                            <p className="text-xs capitalize text-center mt-1 text-gray-500 font-light">
                                {item.direction}
                            </p>
                        </div>
                    ))}
                </div>
                <button className={`px-[6px] rounded-e-[3px] border border-solid h-[34px] ${link ? "bg-gray-200  border-black/10" : "border-black/20"}`} onClick={() => setLink(!link)}>
                    <IconLink size={18} />
                </button>
            </div>
        </div>
    );
};

export default GroupInput;