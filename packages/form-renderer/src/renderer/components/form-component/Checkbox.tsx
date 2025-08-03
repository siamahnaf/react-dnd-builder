import { useState } from "react";
import { Controller } from "react-hook-form";
import { TCheckbox } from "../../types/elements";
import { useEditor } from "../../context/editor.context";
import { IconPlus, IconMinus } from "../../icons";
import { Collapse, ErrorMessage, CheckboxRoot } from "../common";
import { errorMessages, validateAll, useConditionalProps } from "../../utils";

//Interface
interface Props {
    item: TCheckbox;
}

const Checkbox = ({ item }: Props) => {
    //Editor
    const { settings, form } = useEditor();

    //Data
    const { id, name, general, layout, advance } = item;
    const { theme, global } = settings;

    //State
    const [open, setOpen] = useState<boolean>(layout?.collapseState === "collapsed" ? false : true);

    //Hook
    const { isVisible, isRequired, isReadOnly, isChoiceSelectable, isChoiceVisible } = useConditionalProps({
        watch: form?.watch,
        setValue: form?.setValue,
        fieldName: name,
        visibleIf: advance?.visibleIf,
        requiredIf: advance?.requiredIf,
        readOnlyModeIf: advance?.readOnlyModeIf,
        setValueIf: advance?.setValueIf,
        resetIf: advance?.resetIf,
        choiceVisibleIf: advance?.choiceVisibleIf,
        choiceSelectableIf: advance?.choiceSelectableIf,
        base: { isVisible: general?.isVisible, isReadOnly: general?.readOnly, isRequired: advance?.isRequired }
    })

    if (!isVisible) return null;
    if (!name) return <p className="text-sm text-red-600 font-light">Please add a name</p>


    //Handler
    const getElementValue = (name: string) => {
        return form?.getValues?.(name);
    };

    return (
        <div
            className={`${theme?.appearance === "box" ? "border border-solid px-5 py-4 rounded-lg" : ""} ${layout?.questionAlignment === "inline" ? layout.questionWidth : "col-span-12"}`}
            style={{
                background: theme?.appearance === "box" ? theme.boxColor : "transparent",
                borderColor: theme?.enableBoxBorder ? theme.boxBorderColor : "transparent",
                marginLeft: layout?.innerIndent || "0px",
                opacity: Number(theme?.boxOpacity || 100) / 100
            }}
        >
            {general?.label && general.showTitle && (!layout?.titleAlignment || layout.titleAlignment === "top") &&
                <div className="mb-1 flex items-center gap-x-2">
                    {layout?.collapseState === "collapsed" &&
                        <button className="-mt-0.5" onClick={() => setOpen(!open)}>
                            {open ? <IconMinus size={16} /> : <IconPlus size={16} />}
                        </button>
                    }
                    <label htmlFor={id} className="block text-[17px] font-medium">{general.label}{isRequired ? global?.requiredQuestionSymbol : ""}</label>
                </div>
            }
            {general?.tooltip && general.showDescription && (!layout?.descriptionAlignment || layout?.descriptionAlignment === "u_t") &&
                <p className="text-[15px] font-light -mt-1 mb-2">{general.tooltip}</p>
            }
            <style jsx>{`

            `}</style>
            <Collapse open={open}>
                {layout?.errorMessageAlignment === "top" &&
                    <ErrorMessage message={form?.errors?.[name]?.message?.toString()} className="mb-1" />
                }
                <div style={{ width: `${layout?.fieldWidth?.value || 100}${layout?.fieldWidth?.unit || "%"}` }}>
                    <Controller
                        control={form?.control}
                        name={name}
                        rules={{
                            required: {
                                value: isRequired,
                                message: advance?.requiredErrorMessage || errorMessages.required
                            },
                            validate: {
                                ...((value) => validateAll(value, advance?.validation || [], getElementValue)),
                                minSelected: (value: string[]) => {
                                    const min = parseInt(general?.minSelect || "0", 10);
                                    if (min && value.length < min) {
                                        return `Please select at least ${min} options.`;
                                    }
                                    return true;
                                },
                                maxSelected: (value: string[]) => {
                                    const max = parseInt(general?.maxSelect || "0", 10);
                                    if (max && value.length > max) {
                                        return `You can select up to ${max} options.`;
                                    }
                                    return true;
                                }
                            }
                        }}
                        defaultValue={general?.defaultValue}
                        render={({ field: { value, onChange } }) => (
                            <CheckboxRoot
                                item={item}
                                value={value}
                                onChange={onChange}
                                isReadOnly={isReadOnly}
                                isChoiceSelectable={isChoiceSelectable}
                                isChoiceVisible={isChoiceVisible}
                            />
                        )}
                    />
                </div>
                {layout?.errorMessageAlignment === "bottom" &&
                    <ErrorMessage message={form?.errors?.[name]?.message?.toString()} className="mt-1" />
                }
            </Collapse>
            {general?.tooltip && general.showDescription && layout?.descriptionAlignment === "u_i" &&
                <p className="text-[15px] font-light -mb-1 mt-2">
                    {general.tooltip}
                </p>
            }
            {general?.label && general.showTitle && layout?.titleAlignment === "bottom" &&
                <label htmlFor={id} className="block text-[17px] font-medium mt-1">{general.label}</label>
            }
        </div>
    );
};

export default Checkbox;