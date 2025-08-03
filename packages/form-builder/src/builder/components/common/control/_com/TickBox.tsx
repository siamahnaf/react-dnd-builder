import { AnimatePresence, motion } from "framer-motion";
import { TBaseTicks } from "@siamahnaf/react-form-renderer";

interface Props {
    label?: string;
    value?: TBaseTicks;
    onChange?: (e: TBaseTicks) => void;
    className?: string;
    onRefresh?: () => void;
}

const TickBox = ({ label, value = [], onChange, className, onRefresh }: Props) => {
    //Handler
    const updateItem = (field: Partial<keyof TBaseTicks[number]>, index: number, newValue: string) => {
        const updateArray = [...value];
        updateArray[index] = { ...updateArray[index], [field]: newValue };
        onChange?.(updateArray);
    }

    return (
        <div className={`${className}`}>
            <div className="flex items-center">
                <h4 className="text-base font-medium text-gray-700 block flex-1">
                    {label}
                </h4>
                {onRefresh &&
                    <button className="text-builder text-base" onClick={onRefresh}>
                        Refresh
                    </button>
                }
            </div>
            <div className="border border-solid border-gray-200 rounded-md mt-2.5">
                <div className="flex">
                    <div className="text-base bg-gray-100 flex-1 px-3 py-1.5 font-medium text-gray-600">Number</div>
                    <div className="text-base bg-gray-100 flex-1 px-3 py-1.5 font-medium text-gray-600">Text</div>
                    <div className="flex-[0_0_40px] bg-gray-100" />
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
                            <div className="flex-1 px-3 py-1.5 relative text-gray-600">
                                {item.value}
                            </div>
                            <div className="flex-1 relative">
                                <input
                                    value={item.text}
                                    onChange={(e) => updateItem("text", i, e.target.value)}
                                    placeholder={`Item${i + 1}`}
                                    className="w-full px-3 py-1.5 text-gray-600 outline-none"
                                />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TickBox;