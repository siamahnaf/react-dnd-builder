"use client"
import { IconCircleCheckFilled } from "../../../../icons";

//Interface
interface Props {
    label?: string;
    value?: string;
    onChange?: (e: string) => void;
}

const GridSelector = ({ label, value, onChange }: Props) => {
    return (
        <div className="mt-5">
            <h4 className="text-sm text-gray-500 mb-2">
                {label}
            </h4>
            <div className="grid grid-cols-2 gap-4 mx-auto [&_div]:grid [&_div]:gap-[1px] [&_div]:cursor-pointer [&_div_div]:h-[44px] [&_div_div]:bg-[#d5d8dc] [&_div_div]:group-hover:bg-[#515962] [&_div]:relative">
                <div className="grid-cols-2 group" onClick={() => onChange?.("repeat(1, 1fr)")}>
                    <div className="col-span-2" />
                    {value === "repeat(1, 1fr)" &&
                        <IconCircleCheckFilled className="absolute top-1/2 left-1/2 -translate-1/2 text-green-600" />
                    }
                </div>
                <div className="grid-cols-2 group" onClick={() => onChange?.("repeat(2, 1fr)")}>
                    <div />
                    <div />
                    {value === "repeat(2, 1fr)" &&
                        <IconCircleCheckFilled className="absolute top-1/2 left-1/2 -translate-1/2 text-green-600" />
                    }
                </div>
                <div className="grid-cols-3 group" onClick={() => onChange?.("repeat(3, 1fr)")}>
                    <div />
                    <div />
                    <div />
                    {value === "repeat(3, 1fr)" &&
                        <IconCircleCheckFilled className="absolute top-1/2 left-1/2 -translate-1/2 text-green-600" />
                    }
                </div>
                <div className="grid-cols-4 group" onClick={() => onChange?.("repeat(4, 1fr)")}>
                    <div />
                    <div />
                    <div />
                    <div />
                    {value === "repeat(4, 1fr)" &&
                        <IconCircleCheckFilled className="absolute top-1/2 left-1/2 -translate-1/2 text-green-600" />
                    }
                </div>
                <div className="grid-cols-3 group" onClick={() => onChange?.("1fr 2fr")}>
                    <div />
                    <div className="col-span-2" />
                    {value === "1fr 2fr" &&
                        <IconCircleCheckFilled className="absolute top-1/2 left-1/2 -translate-1/2 text-green-600" />
                    }
                </div>
                <div className="grid-cols-3 group" onClick={() => onChange?.("2fr 1fr")}>
                    <div className="col-span-2" />
                    <div />
                    {value === "2fr 1fr" &&
                        <IconCircleCheckFilled className="absolute top-1/2 left-1/2 -translate-1/2 text-green-600" />
                    }
                </div>
                <div className="grid-cols-6 group" onClick={() => onChange?.("1fr 2fr 1fr 2fr")}>
                    <div />
                    <div className="col-span-2" />
                    <div />
                    <div className="col-span-2" />
                    {value === "1fr 2fr 1fr 2fr" &&
                        <IconCircleCheckFilled className="absolute top-1/2 left-1/2 -translate-1/2 text-green-600" />
                    }
                </div>
                <div className="grid-cols-6 group" onClick={() => onChange?.("2fr 1fr 2fr 1fr")}>
                    <div className="col-span-2" />
                    <div />
                    <div className="col-span-2" />
                    <div />
                    {value === "2fr 1fr 2fr 1fr" &&
                        <IconCircleCheckFilled className="absolute top-1/2 left-1/2 -translate-1/2 text-green-600" />
                    }
                </div>
            </div>
        </div>
    );
};

export default GridSelector;