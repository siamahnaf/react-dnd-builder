import { useState } from "react";
import { TLongText } from "../../types/elements";
import { useEditor } from "../../context/editor.context";
import { IconPlus, IconMinus } from "../../icons";
import { Collapse, ErrorMessage } from "../common";
import { errorMessages, validateAll, useConditionalProps } from "../../utils";

//Interface
interface Props {
    item: TLongText;
}

const LongText = ({ item }: Props) => {
    //Editor
    const { settings, form } = useEditor();

    //Data
    const { id, name, general, layout, advance } = item;
    const { theme, global } = settings;

    //State
    const [open, setOpen] = useState<boolean>(layout?.collapseState === "collapsed" ? false : true);

    //Hook
    const { isVisible, isRequired, isReadOnly } = useConditionalProps({
        watch: form?.watch,
        setValue: form?.setValue,
        fieldName: name,
        visibleIf: advance?.visibleIf,
        requiredIf: advance?.requiredIf,
        readOnlyModeIf: advance?.readOnlyModeIf,
        resetIf: advance?.resetIf,
        setValueIf: advance?.setValueIf,
        base: { isVisible: general?.isVisible, isReadOnly: general?.readOnly, isRequired: advance?.isRequired }
    })

    if (!isVisible) return null;
    if (!name) return <p className="text-sm text-red-600 font-light">Please add a name</p>


    //Handler
    const getElementValue = (name: string) => {
        return form?.getValues?.(name);
    };

    //Theme
    const getTheme = () => {
        switch (theme?.theme) {
            case "border":
                return "border border-solid rounded-lg";
            case "border-less":
                return "rounded-lg";
            case "underline":
                return "border-b border-solid"
        }
    }

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
                .LongText {
                    background: ${theme?.fieldBgColor};
                    border-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.fieldBorderColor};
                    color: ${theme?.fieldTextColor};
                    width: ${layout?.fieldWidth?.value || 100}${layout?.fieldWidth?.unit || "%"};
                    text-align: ${layout?.valueAlignment || "auto"};
                }
                .LongText:focus {
                    outline-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.accentBgColor}
                }
                .LongTextBorderLess {
                    outline-style: none;
                }
                .LongTextUnderline:focus {
                    outline-style: none;
                    box-shadow: ${theme?.accentBgColor} 0px 2px;
                    border-color: transparent;
                }
            `}</style>
            <Collapse open={open}>
                {layout?.errorMessageAlignment === "top" &&
                    <ErrorMessage message={form?.errors?.[name]?.message?.toString()} className="mb-1" />
                }
                <div className="relative">
                    <textarea
                        id={item.id}
                        className={`${getTheme()} px-2 py-2.5 ${general?.resizeable || "resize-none"} text-base placeholder:font-light LongText ${theme?.theme === "border-less" && "LongTextBorderLess"} ${theme?.theme === "underline" && "LongTextUnderline"}`}
                        placeholder={general?.placeholder}
                        readOnly={isReadOnly}
                        defaultValue={general?.defaultValue}
                        rows={general?.rows ? Number(general?.rows) : undefined}
                        cols={general?.cols ? Number(general?.cols) : undefined}
                        {...form?.register?.(name, {
                            required: {
                                value: isRequired,
                                message: advance?.requiredErrorMessage || errorMessages.required
                            },
                            pattern: advance?.pattern ? {
                                value: new RegExp(advance.pattern),
                                message: advance.patternMessage || errorMessages.patternMessage,
                            } : undefined,
                            minLength: advance?.minLength ? {
                                value: Number(advance.minLength),
                                message: advance.minLengthErrorMessage || errorMessages.minLengthErrorMessage
                            } : undefined,
                            maxLength: advance?.maxLength ? {
                                value: Number(advance.maxLength),
                                message: advance.maxLengthErrorMessage || errorMessages.maxLengthErrorMessage
                            } : undefined,
                            validate: (value) => validateAll(value, advance?.validation || [], getElementValue)
                        })}
                    />
                    {general?.showCharCount &&
                        <span className="absolute bottom-2.5 text-sm right-2">
                            {form?.watch?.()?.[name]?.length || 0} Char
                        </span>
                    }
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

export default LongText;