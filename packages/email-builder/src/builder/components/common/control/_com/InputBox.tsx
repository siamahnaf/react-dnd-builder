"use client"

//Interface
interface Props {
    label?: string;
    value?: string;
    onChange?: (e: string) => void;
}

const InputBox = ({ label, value, onChange }: Props) => {
    return (
        <div className="grid grid-cols-2 gap-2 items-center mt-5">
            <label className="text-sm text-gray-500">
                {label}
            </label>
            <div className="flex-1">
                <input
                    className="focus:outline-none border border-solid border-black/20 text-sm py-1 px-2 rounded-sm appearance-none w-full"
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                />
            </div>
        </div>
    );
};

export default InputBox;