"use client"
import { useState, Fragment } from "react";
import { IconPlus, IconDeviceFloppy, IconCaretRightFilled, IconX } from "../../../../icons";
import { SelectBox, InputBox, TextareaBox } from "..";
import { useEditor } from "../../../../context/editor.context";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "../../Dialog";
import { ScrollWrapper } from "../../Scrollbar";
import { produce } from "immer";
import { layoutElements } from "../../../../data/layout/layoutelement.data";

//Interface
import { TValidation, TInputElement } from "@siamahnaf/react-form-renderer";
interface Props {
    value?: TValidation[];
    onChange?: (e: TValidation[]) => void;
    label?: string;
    className?: string;
}

const ValidationBox = ({ label, className = "", value = [], onChange }: Props) => {
    //State
    const [open, setOpen] = useState<{ id: string, state: boolean }>({ id: "", state: false });
    const [error, setError] = useState<boolean>(false);

    //Editor
    const { design } = useEditor();

    //Helpers
    const allElements = design.value.pages.flatMap(p => p.elements?.flatMap(el => "elements" in el && el.elements ? [el, ...el.elements] : [el])).filter(el => !layoutElements.includes(el.type)).map((a: TInputElement) => ({
        label: a.general?.label || a.name,
        value: a.name
    }));

    //Handler
    const onAddRules = () => {
        const data = {
            id: crypto.randomUUID(),
            title: "",
            errorMessage: "",
            conditions: [{
                field: "",
                operator: "=",
                value: "",
                option: "value",
            }],
            c: false,
        }
        onChange?.([...value, data]);
        setOpen({ id: data.id, state: true });
    }

    const selected = value.find(a => a.id === open.id);

    //OnClose
    const onClose = () => {
        onChange?.(value.filter(a => a.c));
        setOpen({ id: "", state: false });
        setError(false);
    }

    //Handler
    const updateConditionField = (key: keyof TValidation["conditions"][number], conditionIndex: number, newField: string) => {
        onChange?.(produce(value, draft => {
            const validation = draft.find(v => v.id === selected?.id);
            if (validation && validation.conditions[conditionIndex]) {
                validation.conditions[conditionIndex][key] = newField;
            }
        }));
    };
    const updateValidationField = <K extends keyof Omit<TValidation, "conditions">>(key: K, newField: TValidation[K]) => {
        onChange?.(
            produce(value, draft => {
                const validation = draft.find(v => v.id === selected?.id);
                if (validation) {
                    validation[key] = newField;
                }
            })
        );
    };


    //Animations
    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95, height: 0, margin: 0, padding: 0 },
    };

    const onAdd = (logic: "AND" | "OR") => {
        onChange?.(produce(value, draft => {
            const validation = draft.find(v => v.id === selected?.id);
            if (validation) {
                validation.conditions.push({ logic, operator: "=", option: "value", value: "" });
            }
        }));
    };
    const onDelete = () => {
        onChange?.(produce(value, draft => {
            const validation = draft.find(v => v.id === selected?.id);
            if (validation && validation.conditions.length > 0) {
                validation.conditions.pop();
            }
        }));
    };
    const onRemove = (id: string) => {
        onChange?.(value.filter(a => a.id !== id));
    }

    const onSave = () => {
        const validation = value.find(v => v.id === selected?.id);

        const isValid = validation
            ? validation.title.trim() !== "" &&
            validation.errorMessage.trim() !== "" &&
            validation.conditions.every(c => c.value.trim() !== "")
            : false;

        if (!isValid) {
            setError(true)
            return;
        }
        updateValidationField("c", true);
        setOpen({ id: "", state: false });
        setError(false);
    }

    return (
        <Fragment>
            <div className={`${className}`}>
                <label className="text-base font-medium text-gray-700 block" htmlFor={label}>
                    {label}
                </label>
                <AnimatePresence initial={false}>
                    {value.filter(a => a.c).map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                            className="border border-solid border-gray-200 rounded-md mt-2 flex items-center gap-x-1.5 pr-3"
                        >
                            <div className="flex-2 p-3 flex items-center gap-x-1.5 cursor-pointer select-none" onClick={() => setOpen({ id: item.id, state: true })}>
                                <IconCaretRightFilled size={22} className="text-gray-600" />
                                <div>
                                    <h6 className="text-base font-medium text-gray-600">{item.title}</h6>
                                    <p className="text-sm font-light text-gray-600">{item.conditions.length} Conditions</p>
                                </div>
                            </div>
                            <button className="bg-gray-100 p-[5px] rounded-full text-gray-500 hover:bg-builder hover:text-white transition-all duration-200" onClick={() => onRemove(item.id)}>
                                <IconX size={17} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-x-1.5 bg-builder text-white w-full justify-center py-2 rounded-lg mt-2.5"
                    onClick={onAddRules}
                >
                    <IconPlus size={22} />
                    <span className="mt-0.5">Add Validation Rules</span>
                </motion.button>
            </div>
            <Dialog
                open={open.state}
                onClose={onClose}
                className="w-[600px]"
            >
                <h4 className="px-4 py-3 text-xl font-medium text-gray-600">Validation Rules</h4>
                <hr className="border-gray-200" />
                <ScrollWrapper className="max-h-[80vh] min-h-[200] p-4">
                    {selected &&
                        <Fragment>
                            <AnimatePresence initial={false}>
                                {selected?.conditions.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.2 }}
                                        className={`${i !== 0 ? "border-t border-gray-200 px-4 py-5" : "px-4 pt-2 pb-5"}`}
                                    >
                                        <div className="flex items-center gap-x-2.5">
                                            <p className="whitespace-nowrap text-base font-medium text-gray-600">{i === 0 ? "If Question 1" : item.logic}</p>
                                            <SelectBox
                                                value={item.operator}
                                                onChange={newField => updateConditionField("operator", i, newField)}
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
                                            <SelectBox
                                                value={item.option}
                                                onChange={newField => updateConditionField("option", i, newField)}
                                                options={[
                                                    { label: "Element", value: "element" },
                                                    { label: "Regex", value: "regex" },
                                                    { label: "Value", value: "value" }
                                                ]}
                                                theme="orange"
                                                placeholder="Select"
                                            />
                                        </div>
                                        <div className="mt-2.5">
                                            {(item.option === "regex" || item.option === "value") &&
                                                <InputBox
                                                    value={item.value}
                                                    onChange={newField => updateConditionField("value", i, newField)}
                                                    placeholder={item.option === "regex" ? "Regex" : "Value"}
                                                />
                                            }
                                            {item.option === "element" &&
                                                <SelectBox
                                                    value={item.value}
                                                    onChange={newField => updateConditionField("value", i, newField)}
                                                    placeholder="Select"
                                                    options={allElements}
                                                />
                                            }
                                            {error && !item.value &&
                                                <p className="text-sm text-red-600 mt-1">Please fill the box</p>
                                            }
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div className={`flex gap-x-3 mt-3 ${value.length === 0 ? "mt-4" : ""}`}>
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
                                {selected.conditions.length > 1 && (
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
                            <hr className="border-dashed my-4 border-gray-500" />
                            <InputBox
                                label="Title"
                                placeholder="value"
                                value={selected.title}
                                onChange={(e) => updateValidationField("title", e)}
                            />
                            {error && !selected.title &&
                                <p className="text-sm text-red-600 mt-1">Please fill the box</p>
                            }
                            <TextareaBox
                                label="Error Message"
                                placeholder="error"
                                value={selected.errorMessage}
                                onChange={(e) => updateValidationField("errorMessage", e)}
                                className="mt-4"
                            />
                            {error && !selected.errorMessage &&
                                <p className="text-sm text-red-600 mt-1">Please fill the box</p>
                            }
                        </Fragment>
                    }
                </ScrollWrapper>
                <div className="flex justify-end gap-x-2.5 px-4 py-4">
                    <button className="text-builder border border-solid border-builder px-3 py-1.5 rounded-lg" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="text-white bg-builder px-3 py-1.5 rounded-lg flex gap-x-1.5 items-center" onClick={onSave}>
                        <IconDeviceFloppy size={20} />
                        <span>Save</span>
                    </button>
                </div>
            </Dialog>
        </Fragment>
    );
};

export default ValidationBox;