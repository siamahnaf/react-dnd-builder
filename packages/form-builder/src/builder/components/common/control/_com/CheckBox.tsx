//Interface
interface Props {
    id: string;
    label?: string;
    value?: boolean;
    onChange?: (e: boolean) => void;
    className?: string;
}

const CheckBox = ({ id, label, value = false, onChange, className }: Props) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="relative mt-[2px]">
                <input
                    type="checkbox"
                    id={id}
                    className="peer appearance-none border border-stroke w-[17px] h-[17px] rounded-sm align-middle block bg-white checked:border-builder checked:bg-builder cursor-pointer"
                    checked={value}
                    onChange={(e) => onChange?.(e.target.checked)}
                />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-px pointer-events-none opacity-0 invisible peer-checked:opacity-100 peer-checked:visible">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </span>
            </div>
            {label &&
                <label htmlFor={id} className="text-base font-medium mt-0.5 text-gray-700 block cursor-pointer select-none">{label}</label>
            }
        </div>
    );
};

export default CheckBox;