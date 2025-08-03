"use client"

//Interface
interface Props {
    label?: string;
    value?: string;
    onChange?: (e: string) => void;
    placeholder?: string;
    className?: string;
    rows?: number;
}

const TextareaBox = ({ label, value = "", onChange, placeholder, className = "", rows }: Props) => {
    return (
        <div className={className}>
            <label className="text-base font-medium text-gray-700 block" htmlFor={label}>
                {label}
            </label>
            <textarea
                id={label}
                className="focus:outline-none border border-solid border-gray-200 text-base py-2 px-2 rounded-lg appearance-none w-full mt-[4px] placeholder:text-gray-400 placeholder:font-light block hover:border-gray-400/80 focus:border-gray-400/80 transition-all duration-200 text-gray-800"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                rows={rows}
            />
        </div>
    );
};

export default TextareaBox;