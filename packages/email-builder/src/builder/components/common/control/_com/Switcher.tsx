"use client"

//Interface
interface Props {
    label?: string;
    value?: boolean;
    onChange?: (e: boolean) => void;
    offText?: string;
    onText?: string;
}


const Switcher = ({ label, value = false, onChange, offText = "Hide", onText = "Show" }: Props) => {
    return (
        <div className="grid grid-cols-2 gap-2 items-center mt-5">
            <label className="text-sm text-gray-500">
                {label}
            </label>
            <div>
                <div className="w-max ml-auto relative">
                    <input type="checkbox" className="relative w-[3.26rem] h-5 p-px block  border-transparent text-transparent rounded-full cursor-pointer appearance-none transition-colors ease-in-out duration-200 disabled:opacity-50 disabled:pointer-events-none bg-[#d5d8dc] checked:bg-builder checked:border-builder focus:checked:border-builder before:w-[17px] before:h-[17px] before:z-10 before:bg-white before:absolute before:top-1/2 before:-translate-y-1/2 checked:before:bg-white before:left-[2%] checked:before:left-[64%] before:rounded-full before:shadow before:transition-all before:ease-in-out before:duration-200 peer" checked={value} onChange={(e) => onChange?.(e.target.checked)} />
                    <span className="absolute text-[10px] top-1/2 -translate-y-1/2 capitalize left-[6px] pointer-events-none text-black opacity-0 invisible transition-all delay-100 peer-checked:opacity-100 peer-checked:visible peer-checked:text-white">{offText}</span>
                    <span className="absolute text-[10px] top-1/2 -translate-y-1/2 capitalize right-[6px] pointer-events-none text-black opacity-100 transition-all delay-100 visible peer-checked:opacity-0 peer-checked:invisible peer-checked:text-white">{onText}</span>
                </div>
            </div>
        </div>
    );
};

export default Switcher;