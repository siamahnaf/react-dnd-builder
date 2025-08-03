import { useState, ChangeEvent } from "react";
import { TSingleText } from "../../types/elements";
import { useEditor } from "../../context/editor.context";
import { IconPlus, IconMinus } from "../../icons";
import { Collapse, ErrorMessage } from "../common";
import { errorMessages, validateAll, useConditionalProps } from "../../utils";

//Interface
interface Props {
    item: TSingleText;
}

const Input = ({ item }: Props) => {
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

    //Creating Mask
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        const type = advance?.inputMaskType;

        if (type === "pattern" && advance?.patternMask?.value) {
            try {
                const regex = new RegExp(advance.patternMask.value);
                if (!regex.test(value)) {
                    value = value.slice(0, -1);
                }
            } catch { }
        }

        else if (type === "number" && advance?.patternNumber) {
            const { minValue, maxValue, precision, allowNegative } = advance.patternNumber;
            if (!/^-?\d*\.?\d*$/.test(value)) {
                value = value.slice(0, -1);
            }
            if (!allowNegative && value.startsWith("-")) {
                value = value.replace("-", "");
            }
            if (precision && value.includes(".")) {
                const [intPart, decimalPart] = value.split(".");
                value = `${intPart}.${decimalPart.slice(0, Number(precision))}`;
            }
            const numeric = Number(value);
            if (minValue && numeric < Number(minValue)) value = minValue;
            if (maxValue && numeric > Number(maxValue)) value = maxValue;
        }

        else if (type === "currency" && advance?.patternCurrency) {
            const { minValue, maxValue, precision, prefix = "", suffix = "", allowNegative } = advance.patternCurrency;
            let raw = value.replace(prefix, "").replace(suffix, "").replace(/[^0-9.-]/g, "");

            if (!/^-?\d*\.?\d*$/.test(raw)) {
                raw = raw.slice(0, -1);
            }

            if (!allowNegative && raw.startsWith("-")) {
                raw = raw.replace("-", "");
            }
            if (precision && raw.includes(".")) {
                const [intPart, decimalPart] = raw.split(".");
                raw = `${intPart}.${decimalPart.slice(0, Number(precision))}`;
            }
            const numeric = Number(raw);
            if (minValue && numeric < Number(minValue)) raw = minValue;
            if (maxValue && numeric > Number(maxValue)) raw = maxValue;

            value = `${prefix}${raw}${suffix}`;
        }

        e.target.value = value;
    };

    //Inputs
    const onInputProps = advance?.inputMaskType ? { onInput: handleInput } : {};

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
                .SingleLineText {
                    background: ${theme?.fieldBgColor};
                    border-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.fieldBorderColor};
                    color: ${theme?.fieldTextColor};
                    width: ${layout?.fieldWidth?.value || 100}${layout?.fieldWidth?.unit || "%"};
                    text-align: ${layout?.valueAlignment || "auto"};
                }
                .SingleLineText:focus {
                    outline-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.accentBgColor}
                }
                .SingleLineTextBorderLess {
                    outline-style: none;
                }
                .SingleLineTextUnderline:focus {
                    outline-style: none;
                    box-shadow: ${theme?.accentBgColor} 0px 2px;
                    border-color: transparent;
                }
            `}</style>
            <Collapse open={open}>
                {layout?.errorMessageAlignment === "top" &&
                    <ErrorMessage message={form?.errors?.[name]?.message?.toString()} className="mb-1" />
                }
                <div>
                    <input
                        id={item.id}
                        type={general?.type || "text"}
                        className={`${getTheme()} px-3 h-[48px] text-base placeholder:font-light SingleLineText ${theme?.theme === "border-less" && "SingleLineTextBorderLess"} ${theme?.theme === "underline" && "SingleLineTextUnderline"}`}
                        placeholder={general?.placeholder}
                        readOnly={isReadOnly}
                        defaultValue={general?.defaultValue}
                        {...onInputProps}
                        {...form?.register?.(name, {
                            required: {
                                value: isRequired,
                                message: advance?.requiredErrorMessage || errorMessages.required
                            },
                            pattern: advance?.isEmail
                                ? {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: advance.emailErrorMessage || errorMessages.emailMessage,
                                }
                                : advance?.pattern
                                    ? {
                                        value: new RegExp(advance.pattern),
                                        message: advance.patternMessage || errorMessages.patternMessage,
                                    }
                                    : undefined,
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

export default Input;