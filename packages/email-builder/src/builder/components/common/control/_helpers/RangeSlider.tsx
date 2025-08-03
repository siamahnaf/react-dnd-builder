//Interface
interface Props {
    min: number;
    max: number;
    step: number;
    onChange?: (e: string) => void;
    value?: string;
}

const RangeSlider = ({ min, max, step, onChange, value }: Props) => {
    return (
        <div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                onChange={(e) => onChange?.(e.target.value)}
                value={value}
                className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
                [&::-webkit-slider-thumb]:w-2.5
                [&::-webkit-slider-thumb]:h-2.5
                [&::-webkit-slider-thumb]:-mt-0.5
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_var(--color-builder)]
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:duration-150
                [&::-webkit-slider-thumb]:ease-in-out
                
                [&::-moz-range-thumb]:w-2.5
                [&::-moz-range-thumb]:h-2.5
                [&::-moz-range-thumb]:appearance-none
                [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:border-4
                [&::-moz-range-thumb]:border-builder
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:transition-all
                [&::-moz-range-thumb]:duration-150
                [&::-moz-range-thumb]:ease-in-out
                
                [&::-webkit-slider-runnable-track]:w-full
                [&::-webkit-slider-runnable-track]:h-1
                [&::-webkit-slider-runnable-track]:bg-gray-300
                [&::-webkit-slider-runnable-track]:rounded-full
                
                [&::-moz-range-track]:w-full
                [&::-moz-range-track]:h-2
                [&::-moz-range-track]:bg-gray-100
                [&::-moz-range-track]:rounded-full"
            />
        </div>
    );
};

export default RangeSlider;