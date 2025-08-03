"use client"
import { useState } from "react";
import { IconPlus, IconTrash } from "../../../../icons";

//Components
import UploaderDialog from "../_helpers/UploaderDialog";

//Interface
type ValueTypes = { url: string, alt: string, caption: string }
interface Props {
    value?: ValueTypes;
    onChange?: (e: ValueTypes) => void;
}

const ImageHandler = ({ value, onChange }: Props) => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="relative overflow-hidden group">
            <div className="bg-[#d5d8dc] flex items-center justify-center rounded-md h-[130px] select-none cursor-pointer hover:bg-[#aaadb0]" onClick={() => setOpen(true)}>
                {value?.url ?
                    <img
                        src={value.url}
                        alt="image"
                        width={400}
                        height={120}

                    /> : <IconPlus size={20} className="text-white" />
                }
            </div>
            <div className="absolute bg-black bottom-0 left-0 w-full text-white text-center py-1.5 transition-all delay-75 translate-y-8 group-hover:translate-y-0 pointer-events-none">
                <p className="text-sm opacity-80">Choose Image</p>
            </div>
            {value?.url &&
                <button className="bg-black px-1 rounded-sm absolute top-2 right-2 text-white opacity-0 invisible group-hover:opacity-70 group-hover:visible select-none cursor-pointer py-1" onClick={() => onChange?.({ url: "", alt: "", caption: "" })}>
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
    );
};

export default ImageHandler;