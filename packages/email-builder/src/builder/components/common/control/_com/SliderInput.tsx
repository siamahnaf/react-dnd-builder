"use client"
import { useMemo } from "react";

//Components
import DeviceSwitcher from "../_helpers/DeviceSwitcher";
import RangeSlider from "../_helpers/RangeSlider";
import UnitSelector from "../_helpers/UniSelector";

//Inter
type BasicRange = {
    min: number;
    max: number;
    step: number;
    units: string[];
};
interface Props {
    label?: string;
    isDevice?: boolean;
    value?: string;
    onChange?: (e: string) => void;
    unit?: string;
    onUnitChange?: (e: string) => void;
    options?: {
        unit: string;
        min: number;
        max: number;
        step: number;
    }[] | { min: number, max: number, step: number };
}

const SliderInput = ({ value, onChange, label, isDevice = true, unit, onUnitChange, options }: Props) => {
    //Min Max Step Units
    const { min, max, step, units } = useMemo<BasicRange>(() => {
        if (!options) return { min: 0, max: 100, step: 1, units: [] };
        if (Array.isArray(options)) {
            const range = options.find((o) => o.unit === unit) ?? { min: 0, max: 100, step: 1 };
            const units = options.map(o => String(o.unit));
            return { ...range, units: units };
        }
        return { ...options, units: [] };
    }, [options, unit]);

    return (
        <div className="mt-5">
            <div className="grid grid-cols-2 gap-3">
                <div className="flex gap-4 items-center">
                    <label className="text-sm text-gray-500">{label}</label>
                    {isDevice &&
                        <DeviceSwitcher />
                    }
                </div>
                {units.length > 0 &&
                    <div className="text-right w-max ml-auto">
                        <UnitSelector
                            value={unit}
                            onChange={onUnitChange}
                            options={units}
                        />
                    </div>
                }
            </div>
            <div className="flex gap-3 mt-1">
                <div className="flex-1">
                    <RangeSlider
                        min={min}
                        max={max}
                        step={step}
                        onChange={(e) => onChange?.(e)}
                        value={value}
                    />
                </div>
                <input
                    className="focus:outline-none border border-solid border-black/20 py-1 px-1.5 rounded-sm text-sm text-gray-500 w-[60px]"
                    type="number"
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SliderInput;