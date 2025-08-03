"use client"
import { useState, cloneElement } from "react";
import { Tooltip } from "@siamf/tooltip";
import { IconPaintFilled, IconPhoto, IconPlus, IconTrash } from "../../../../icons";
import { ColorPicker } from "@siamf/react-color-pick";
import { motion, AnimatePresence } from "framer-motion";
import "@siamf/react-color-pick/dist/index.css";

//Hook
import { useClickOutside } from "../../../../components/hooks/useClickOutside";

//Components
import UploaderDialog from "../_helpers/UploaderDialog";

//Interface
type ValueTypes = { url: string, alt: string, caption: string }
interface Props {
    label?: string;
    type?: string;
    onTypeChange?: (e: string) => void;
    colorValue?: string;
    onColorChange?: (e: string) => void;
    imageValue?: ValueTypes;
    onImageChange?: (e: ValueTypes) => void;
}


const BackgroundOption = ({ label, type, onTypeChange, colorValue, onColorChange, imageValue, onImageChange }: Props) => {
    //State
    const [colorOpen, setColorOpen] = useState<boolean>(false);
    const [imageOpen, setImageOpen] = useState<boolean>(false);


    const colorRef = useClickOutside(() => setColorOpen(false));


    return (
        <div>
            <div>
                <div className="flex gap-4 items-center">
                    <label className="text-sm text-gray-500">
                        {label}
                    </label>
                </div>
                <div className="flex w-full rounded-sm mt-2 border border-solid border-black/10 overflow-hidden">
                    {typeList.map((item, i) => (
                        <Tooltip content={item.name} containerClassName="flex-1" key={i}>
                            <button
                                className={`w-full py-2.5 border-solid ${i !== 0 && "border-l"} ${type === item.type ? "bg-gray-200 border-transparent" : "border-black/10"} flex items-center justify-center`}
                                onClick={() => onTypeChange?.(item.type)}
                            >
                                {cloneElement(item.icon, {
                                    size: 16
                                })}
                            </button>
                        </Tooltip>
                    ))}
                </div>
            </div>
            {type === "color" &&
                <div className="mt-4 relative group" ref={colorRef}>
                    <div
                        className="w-full cursor-pointer rounded-md overflow-hidden h-[150px] select-none relative" onClick={() => setColorOpen(!colorOpen)}
                        style={{ background: colorValue }}
                    >
                        {!colorValue &&
                            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-7 h-7 flex items-center justify-center text-white mx-auto bg-gray-500 rounded-full">
                                        <IconPlus size={16} />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Add Background Color</p>
                                </div>
                            </div>
                        }

                    </div>
                    {colorValue &&
                        <button className="absolute top-3 right-3 bg-black text-white rounded-md p-2 transition-all opacity-0 invisible -translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0" onClick={() => onColorChange?.("")}>
                            <IconTrash size={20} />
                        </button>
                    }
                    <AnimatePresence>
                        {colorOpen &&
                            <motion.div
                                className="absolute top-full mt-2 z-[999999999999999]"
                                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                transition={{ duration: 0.1 }}
                            >
                                <ColorPicker
                                    value={colorValue}
                                    onChange={(e) => onColorChange?.(e)}
                                />
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
            }
            {type === "image" &&
                <div className="mt-4 relative group">
                    <div
                        className="w-full cursor-pointer rounded-md overflow-hidden h-[150px] select-none" onClick={() => setImageOpen(!imageOpen)}
                    >
                        {!imageValue?.url &&
                            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-7 h-7 flex items-center justify-center text-white mx-auto bg-gray-500 rounded-full">
                                        <IconPlus size={16} />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Add Background Image</p>
                                </div>
                            </div>
                        }
                        {imageValue?.url &&
                            <img src={imageValue.url} alt="Uploaded Image" width={600} height={600} className="object-contain" />
                        }
                    </div>
                    {imageValue?.url &&
                        <button className="absolute top-3 right-3 bg-black text-white rounded-md p-2 transition-all opacity-0 invisible -translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0" onClick={() => onImageChange?.({ url: "", alt: "", caption: "" })}>
                            <IconTrash size={20} />
                        </button>
                    }
                    <UploaderDialog
                        open={imageOpen}
                        onClose={() => setImageOpen(false)}
                        value={imageValue}
                        onChange={onImageChange}
                    />
                </div>
            }
        </div>
    );
};

export default BackgroundOption;


export const typeList = [
    {
        icon: <IconPaintFilled />,
        type: "color",
        name: "Background Color"
    },
    {
        icon: <IconPhoto />,
        type: "image",
        name: "Background Image"
    }
]