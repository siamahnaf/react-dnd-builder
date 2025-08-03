"use client"
import { cloneElement } from "react";
import { Tooltip } from "@siamf/tooltip";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconArrowNarrowUp, IconArrowNarrowDown, IconAlignLeft2, IconAlignRight2, IconAlignCenter, IconAlignJustified, IconBan, IconClearFormatting, IconArrowBarToLeft, IconArrowBarToRight, IconLayoutAlignMiddle } from "../../../../icons";

//Components
import DeviceSwitcher from "../_helpers/DeviceSwitcher";

//Interface
interface Props {
    label?: string;
    isDevice?: boolean;
    iconSets?: "directions" | "aligns" | "alignment" | "btnAlign" | "imgAlign" | "divideEl" | "dividePosition";
    value?: string;
    onChange?: (e: string) => void;
}

const IconButton = ({ isDevice = true, label, iconSets = "directions", value, onChange }: Props) => {
    return (
        <div className="grid grid-cols-2 gap-2 items-center mt-5">
            <div className="flex gap-4 items-center">
                <label className="text-sm text-gray-500">
                    {label}
                </label>
                {isDevice &&
                    <DeviceSwitcher />
                }
            </div>
            <div className="flex w-max justify-end ml-auto border border-solid border-black/10 rounded-sm">
                {lists[iconSets].map((item, i) => (
                    <Tooltip content={item.title} key={i} containerClassName="flex-1">
                        <button
                            className={`w-full px-2 py-2 flex items-center justify-center ${value === item.value ? "bg-black/20 border-transparent" : "border-black/10"} ${i !== 0 && "border-l"}`}
                            onClick={() => onChange?.(item.value === value ? "" : item.value)}
                        >
                            {cloneElement(item.icon, {
                                className: "",
                                size: 16
                            })}
                        </button>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};

export default IconButton;

const lists = {
    directions: [
        { value: "row", icon: <IconArrowNarrowRight />, title: "Row (Horizontal)" },
        { value: "column", icon: <IconArrowNarrowDown />, title: "Column (Vertical)" },
        { value: "row-reverse", icon: <IconArrowNarrowLeft />, title: "Row Reversed" },
        { value: "column-reverse", icon: <IconArrowNarrowUp />, title: "Column Reversed" }
    ],
    aligns: [
        { value: "flex-start", icon: <IconAlignRight2 />, title: "Start" },
        { value: "center", icon: <IconAlignCenter />, title: "Center" },
        { value: "flex-end", icon: <IconAlignLeft2 />, title: "End" },
        { value: "align_stretch", icon: <IconAlignJustified />, title: "Stretch" }
    ],
    alignment: [
        { value: "left", icon: <IconAlignLeft2 />, title: "Start" },
        { value: "center", icon: <IconAlignCenter />, title: "Center" },
        { value: "right", icon: <IconAlignRight2 />, title: "End" },
        { value: "justify", icon: <IconAlignJustified />, title: "Stretch" }
    ],
    btnAlign: [
        { value: "0 auto 0 0", icon: <IconAlignLeft2 />, title: "Left" },
        { value: "0 auto", icon: <IconAlignCenter />, title: "Center" },
        { value: "0 0 0 auto", icon: <IconAlignRight2 />, title: "Right" },
        { value: "justify", icon: <IconAlignJustified />, title: "Justify" }
    ],
    imgAlign: [
        { value: "0 auto 0 0", icon: <IconAlignLeft2 />, title: "Left" },
        { value: "0 auto", icon: <IconAlignCenter />, title: "Center" },
        { value: "0 0 0 auto", icon: <IconAlignRight2 />, title: "Right" },
    ],
    divideEl: [
        { value: "none", icon: <IconBan />, title: "None" },
        { value: "text", icon: <IconClearFormatting />, title: "Text Element" }
    ],
    dividePosition: [
        { value: "left", icon: <IconArrowBarToLeft />, title: "Left" },
        { value: "center", icon: <IconLayoutAlignMiddle />, title: "Center" },
        { value: "right", icon: <IconArrowBarToRight />, title: "Right" }
    ]
}