"use client"
import { useState } from "react";
import { IconPlus, IconTrash } from "../../../../icons";

//Components
import PickerDialog from "../_helpers/PickerDialog";

//Interface
interface Props {
    value?: string;
    onChange?: (e: string) => void;
}

const IconPicker = ({ value, onChange }: Props) => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="relative overflow-hidden group">
            <div className="rounded-md h-[130px] select-none cursor-pointer bg-[linear-gradient(45deg,#d5d8dc_25%,transparent_0,transparent_75%,#d5d8dc_0,#d5d8dc),linear-gradient(45deg,#d5d8dc_25%,transparent_0,transparent_75%,#d5d8dc_0,#d5d8dc)] bg-size-[16px_16px] bg-position-[0_0,calc(16px/2)_calc(16px/2)] overflow-hidden group" onClick={() => setOpen(true)}>
                <div className="w-full h-full flex items-center justify-center group-hover:bg-black/20">
                    {value ?
                        <img
                            src={value}
                            alt="image"
                            width={200}
                            height={200}
                            className="w-[40px]"

                        /> : <IconPlus size={20} className="bg-builder w-[30px] h-[30px] rounded-md text-white p-[5px]" />
                    }
                </div>
            </div>
            <div className="absolute bg-black bottom-0 left-0 w-full text-white text-center py-1.5 transition-all delay-75 translate-y-8 group-hover:translate-y-0 pointer-events-none">
                <p className="text-sm opacity-80">Choose Icon</p>
            </div>
            {value &&
                <button className="bg-black px-1 rounded-sm absolute top-2 right-2 text-white opacity-0 invisible group-hover:opacity-70 group-hover:visible select-none cursor-pointer py-1" onClick={() => onChange?.("")}>
                    <IconTrash size={20} />
                </button>
            }
            <PickerDialog
                open={open}
                onClose={() => setOpen(false)}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default IconPicker;