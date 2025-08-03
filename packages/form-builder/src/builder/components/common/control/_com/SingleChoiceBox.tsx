import { IconTrash, IconPlus, IconEraser, IconAlertSquareRoundedFilled } from "../../../../icons";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
    label?: string;
    value?: string[];
    onChange?: (e: string[]) => void;
    className?: string;
}

const SingleChoiceBox = ({ label, value = [], onChange, className }: Props) => {
    //Handler
    const onAddItem = () => {
        onChange?.([...value, ""]);
    }
    const deleteItem = (index: number) => {
        const newValue = [...value.slice(0, index), ...value.slice(index + 1)];
        onChange?.(newValue);
    }
    const updateItem = (index: number, newValue: string) => {
        const updateArray = [...value];
        updateArray[index] = newValue;
        onChange?.(updateArray);
    }

    return (
        <div className={`${className}`}>
            <div className="flex items-center gap-x-1.5">
                <h4 className="text-base font-medium text-gray-700 block flex-1">
                    {label}
                </h4>
                <AnimatePresence>
                    {value.length > 0 &&
                        <motion.div
                            initial={{ opacity: 0, y: -5, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -5, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="flex gap-x-1.5 items-center"
                        >
                            <button className="p-0.5 text-gray-600" onClick={() => onChange?.([])}>
                                <IconEraser size={22} />
                            </button>
                            <button className="w-[26px] h-[26px] bg-gray-100 text-gray-700 hover:bg-builder hover:text-white flex items-center justify-center rounded-full" onClick={onAddItem}>
                                <IconPlus size={18} />
                            </button>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
            <div className="border border-solid border-gray-200 rounded-md mt-2.5">
                <div className="flex">
                    <div className="text-base bg-gray-100 flex-1 px-3 py-1.5 font-medium text-gray-600">Label</div>
                    <div className="flex-[0_0_60px] bg-gray-100" />
                </div>
                <AnimatePresence>
                    {value?.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                            animate={{ opacity: 1, height: "auto", scale: 1 }}
                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center"
                        >
                            <div className="flex-1 relative">
                                <input
                                    value={item}
                                    onChange={(e) => updateItem(i, e.target.value)}
                                    placeholder={`Item${i + 1}`}
                                    className="w-full px-3 py-1.5 text-gray-600 outline-none"
                                />
                                {!item &&
                                    <IconAlertSquareRoundedFilled className="absolute right-0 top-1/2 -translate-y-1/2 text-red-600" size={16} />
                                }
                            </div>
                            <div className="flex-[0_0_60px] flex items-center justify-center">
                                <button className="bg-gray-100 hover:bg-builder hover:text-white transition-all duration-200 p-1 rounded-md" onClick={() => deleteItem(i)}>
                                    <IconTrash size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {value.length === 0 &&
                    <div className="col-span-2 px-4 py-5 text-center">
                        <p className="font-light text-gray-600">You don&apos;t have any choices yet</p>
                        <button className="text-base mt-1 font-medium text-builder" onClick={onAddItem}>
                            Add New Choice
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default SingleChoiceBox;