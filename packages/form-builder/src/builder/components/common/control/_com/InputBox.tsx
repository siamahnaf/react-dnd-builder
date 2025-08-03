"use client"
import { ChangeEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { IconAlertSquareRoundedFilled } from "../../../../icons";

//Interface
interface Props {
    label?: string;
    value?: string;
    onChange?: (e: string) => void;
    placeholder?: string;
    className?: string;
    inputType?: "text" | "int" | "float-1" | "float-2";
    suffix?: "none" | "unit";
    unit?: string;
    onUnitChange?: (e: string) => void;
    isError?: boolean;
}

const InputBox = ({ label, value = "", onChange, placeholder, className = "", inputType = "text", unit = "px", onUnitChange, suffix = "none", isError = false }: Props) => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    //Handler
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (inputType === "int") {
            value = value.replace(/[^0-9]/g, "").slice(0, 9);
        } else if (inputType.startsWith("float")) {
            const decimalPlaces = parseInt(inputType.split("-")[1] || "0", 10);
            const regex = new RegExp(`^\\d*(\\.\\d{0,${decimalPlaces}})?$`);
            if (!regex.test(value)) {
                value = value.slice(0, -1);
            }
        }

        e.target.value = value;
    };

    //Inputs
    const onInputProps = inputType !== "text" ? { onInput: handleInput } : {};


    //Handler
    const ref = useClickOutside(() => setOpen(false));

    //Handler
    const onSelect = (value: string) => {
        setOpen(false);
        onUnitChange?.(value)
    }

    return (
        <div className={className}>
            {label &&
                <label className="text-base font-medium text-gray-700 block" htmlFor={label}>
                    {label}
                </label>
            }
            <div className="relative">
                <input
                    id={label}
                    className={`focus:outline-none border border-solid border-gray-200 text-base py-2 px-2 rounded-lg appearance-none w-full mt-[4px] placeholder:text-gray-400 placeholder:font-light block hover:border-gray-400/80 focus:border-gray-400/80 transition-all duration-200 ${/^element\d+$/.test(value) ? "text-gray-400" : "text-gray-800"}`}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    {...onInputProps}
                />
                {isError &&
                    <IconAlertSquareRoundedFilled className="absolute top-1/2 block right-2 -translate-y-1/2 text-red-600" size={18} />
                }
                {suffix === "unit" &&
                    <div className="absolute right-0 top-0 bottom-0 border-l border-solid border-gray-200" ref={ref}>
                        <button className="h-full px-3 text-gray-500" onClick={() => setOpen(true)}>
                            {unit}
                        </button>
                        <AnimatePresence>
                            {open &&
                                <motion.ul
                                    className="absolute top-0 bg-white shadow-xl border border-solid border-gray-300/80 z-30 rounded-md px-1.5 py-1.5 w-full [&_li]:select-none [&_li]:cursor-pointer space-y-2 [&_li]:text-base [&_li]:text-left"
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    transition={{ duration: 0.1 }}
                                >
                                    {units.map((item, i) => (
                                        <li key={i} onClick={() => onSelect(item)}>
                                            {item}
                                        </li>
                                    ))}
                                </motion.ul>
                            }
                        </AnimatePresence>
                    </div>
                }
            </div>
        </div>
    );
};

export default InputBox;

const units = ["px", "%", "rem", "em"]