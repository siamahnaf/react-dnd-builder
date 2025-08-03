"use client"
import { useState } from "react";
import { IconPhoto, IconTrash } from "../../../../icons";

//Components
import UploaderDialog from "../_helpers/UploaderDialog";

//Interface
type ValueTypes = { url: string, alt: string }
interface Props {
    label?: string;
    value?: ValueTypes;
    onChange?: (e: ValueTypes) => void;
    className?: string;
}

const ImageBox = ({ value, onChange, label, className = "" }: Props) => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={`${className}`}>
            <label className="text-base font-medium text-gray-700 block" htmlFor={label}>
                {label}
            </label>
            <div className="relative overflow-hidden group rounded-md mt-2.5">
                <div className="border border-solid border-gray-200 bg-gray-50 rounded-lg flex items-center justify-center h-[130px] select-none cursor-pointer hover:bg-gray-300" onClick={() => setOpen(true)}>
                    {value?.url ?
                        <img
                            src={value.url}
                            alt="image"
                            width={400}
                            height={120}

                        /> : <IconPhoto size={40} stroke={1.6} className="text-builder mx-auto" />
                    }
                </div>
                <div className="absolute bg-builder bottom-0 left-0 w-full text-white text-center py-1.5 transition-all delay-75 translate-y-8 group-hover:translate-y-0 pointer-events-none">
                    <p className="text-sm opacity-80">Choose Image</p>
                </div>
                {value?.url &&
                    <button className="bg-black px-1 rounded-sm absolute top-2 right-2 text-white opacity-0 invisible group-hover:opacity-70 group-hover:visible select-none cursor-pointer py-1" onClick={() => onChange?.({ url: "", alt: "" })}>
                        <IconTrash size={20} />
                    </button>
                }
                <UploaderDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default ImageBox;