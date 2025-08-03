"use client"

//Interface
interface Props {
    id: string;
    label?: string;
    value?: boolean;
    onChange?: (e: boolean) => void;
}

const CheckBox = ({ id, label, value, onChange }: Props) => {
    return (
        <div className="flex mt-2 gap-2">
            <input
                type="checkbox"
                className="shrink-0 mt-0.5 border-gray-200 rounded text-builder focus:ring-builder disabled:opacity-50 disabled:pointer-events-none"
                id={id}
                checked={value || false}
                onChange={(e) => onChange?.(e.target.checked)}
            />
            {label &&
                <label htmlFor={id} className="text-sm text-gray-500 select-none cursor-pointer mt-[3px]">{label}</label>
            }
        </div>
    );
};

export default CheckBox;