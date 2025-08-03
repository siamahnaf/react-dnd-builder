"use client"

//Interface
interface Props {
    label?: string;
    value?: string;
    onChange?: (e: string) => void;
    className?: string;
    options?: {
        label: string;
        value: string;
    }[];
    subtile?: string;
}

const OptionBox = ({ label, value = "", onChange, className = "", options = [], subtile }: Props) => {
    return (
        <div className={className}>
            <div>
                <label className="text-base font-medium text-gray-700 block" htmlFor={label}>
                    {label}
                </label>
                {subtile &&
                    <p className="text-sm font-light text-gray-600">{subtile}</p>
                }
            </div>
            <div className="mt-3 flex bg-gray-100 py-[5px] px-1.5 rounded-lg">
                {options.map((item, i) => (
                    <button key={i} className={`flex-1 py-2 rounded-lg ${item.value === value ? "bg-builder text-white" : "text-gray-600"}`} onClick={() => onChange?.(item.value)}>
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OptionBox;