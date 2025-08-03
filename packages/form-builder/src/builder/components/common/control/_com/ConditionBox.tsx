"use client"
import { InputBox, SelectBox, BasicShowAnimate } from "..";
import { useEditor } from "../../../../context/editor.context";
import { AnimatePresence, motion } from "framer-motion";
import { produce } from "immer";
import { layoutElements } from "../../../../data/layout/layoutelement.data";

//Interface
import { TCondition, TInputElement } from "@siamahnaf/react-form-renderer";
interface Props {
    label?: string;
    value?: TCondition[];
    onChange?: (e: TCondition[]) => void;
    className?: string;
}

const ConditionBox = ({ label, value = [], onChange, className = "" }: Props) => {
    //Editor
    const { design } = useEditor();

    //Helpers

    const allElements = design.value.pages.flatMap(p => p.elements?.flatMap(el => "elements" in el && el.elements ? [el, ...el.elements] : [el])).filter(el => !layoutElements.includes(el.type)).map((a: TInputElement) => ({
        label: a.general?.label || a.name,
        value: a.name
    }));

    //Handler
    const onAdd = (logic: "AND" | "OR") => onChange?.([...value, { logic, field: "", operator: "", value: "" }]);
    const onDelete = () => onChange?.(value.slice(0, -1));

    //Animations
    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95, height: 0, margin: 0, padding: 0 },
    };

    return (
        <div className={`bg-white border border-solid border-gray-200 rounded-xl ${className}`}>
            <h4 className="px-3 pt-3 text-gray-600">
                {label}
            </h4>
            <AnimatePresence initial={false}>
                {value.map((item, i) => (
                    <motion.div
                        key={i}
                        layout
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        className={`${i !== 0 ? "border-t border-gray-200 px-4 py-5" : "px-4 pt-2 pb-5"}`}
                    >
                        <div className="flex items-center gap-x-3">
                            {item.logic && (
                                <p className="text-gray-600 font-medium">{item.logic}</p>
                            )}
                            <div className="grid grid-cols-2 gap-x-2 flex-1">
                                <SelectBox
                                    value={item.field}
                                    onChange={newField => onChange?.(
                                        produce(value, draft => {
                                            draft[i].field = newField;
                                        })
                                    )}
                                    placeholder="Select"
                                    options={allElements}
                                    theme="orange"
                                />
                                <SelectBox
                                    value={item.operator}
                                    onChange={newField => onChange?.(
                                        produce(value, draft => {
                                            draft[i].operator = newField;
                                        })
                                    )}
                                    options={[
                                        { label: "Empty", value: "empty" },
                                        { label: "Not empty", value: "notempty" },
                                        { label: "Equals", value: "=" },
                                        { label: "Not equals", value: "!=" },
                                        { label: "Contains", value: "contains" },
                                        { label: "Not contain", value: "notcontains" },
                                        { label: "Starts with", value: "startwith" },
                                        { label: "Ends with", value: "endwith" }
                                    ]}
                                    theme="blue"
                                    placeholder="Select"
                                />
                            </div>
                        </div>

                        <BasicShowAnimate
                            show={item.operator !== "empty" && item.operator !== "notempty"}
                            id={`input${i}`}
                        >
                            <InputBox
                                placeholder="Value"
                                className="mt-2"
                                value={item.value}
                                onChange={newField => onChange?.(
                                    produce(value, draft => {
                                        draft[i].value = newField;
                                    })
                                )}
                            />
                        </BasicShowAnimate>
                    </motion.div>
                ))}
            </AnimatePresence>
            <div className={`flex gap-x-3 px-4 pb-3 ${value.length === 0 ? "mt-4" : ""}`}>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-dashed border-gray-400 text-gray-600 font-medium px-3 py-1 rounded-md"
                    onClick={() => onAdd("AND")}
                >
                    AND
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-dashed border-gray-400 text-gray-600 font-medium px-3 py-1 rounded-md"
                    onClick={() => onAdd("OR")}
                >
                    OR
                </motion.button>
                {value.length > 1 && (
                    <motion.button
                        whileHover={{ opacity: 0.7 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-500 font-medium"
                        onClick={onDelete}
                    >
                        Delete
                    </motion.button>
                )}
            </div>
        </div>
    );
};

export default ConditionBox;