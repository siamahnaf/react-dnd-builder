"use client";

//Interface
interface Props {
    label?: string;
    value?: string;
    rows?: number;
    onChange?: (e: string) => void;
}

const TextareaBox = ({ label = "Add your custom css", value, onChange, rows = 4 }: Props) => {
    return (
        <div>
            <h4 className="text-sm text-gray-500 mb-3">
                {label}
            </h4>
            <textarea
                className="focus:outline-none border border-solid border-black/20 text-sm py-1 px-2 rounded-sm appearance-none w-full"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                rows={rows}
            />
        </div>
    );
}

export default TextareaBox;