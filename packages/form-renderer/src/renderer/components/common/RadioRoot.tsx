import { useState, useMemo, useEffect, Fragment } from "react";
import { useEditor } from "../../context/editor.context";
import { TRadio } from "../../types/elements";

interface Props {
    value?: string;
    onChange?: (value: string) => void;
    item: TRadio;
    isReadOnly: boolean;
    isChoiceSelectable: boolean;
    isChoiceVisible: boolean;
}

const RadioRoot = ({ item, value = "", onChange, isReadOnly, isChoiceSelectable, isChoiceVisible }: Props) => {
    //Reading Options
    const { settings, form } = useEditor();
    const { theme } = settings;
    const { id, name, general, layout } = item;

    //State
    const [choiceOptions, setChoiceOptions] = useState(general?.choices || []);

    // Memoize sorted options
    const sortedOptions = useMemo(() => {
        const options = [...choiceOptions];
        if (general?.choiceOrder === "asc") {
            options.sort((a, b) => a.label.localeCompare(b.label));
        } else if (general?.choiceOrder === "desc") {
            options.sort((a, b) => b.label.localeCompare(a.label));
        }
        return options;
    }, [choiceOptions, general?.choiceOrder]);

    //Handler
    const onSelect = (item: string) => {
        if (value === item) {
            onChange?.("");
        } else {
            if (item === "none") {
                onChange?.(item);
            } else {
                onChange?.(item)
            }
        }
    }

    //Effect
    useEffect(() => {
        setChoiceOptions(general?.choices || []);
        onChange?.("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [general?.choices, general?.enableNone])

    if (sortedOptions.length === 0 && general?.hideQuestionIfNoChoice) return 0;

    return (
        <Fragment>
            <style jsx>{`
                .checkbox-item {
                    border-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.fieldBorderColor};
                }
                .checkbox-item:checked {
                    border-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.accentBgColor};
                }
                .radioSelector {
                    background: ${theme?.accentBgColor};
                }
                .checkbox-label {
                    color: ${theme?.fieldTextColor};
                }
            `}</style>
            <div className="space-y-1.5" style={{ columns: Number(layout?.columnCount || 1) }}>
                {isChoiceVisible && sortedOptions.map((item, i) => (
                    <div className={`flex items-center gap-2 ${(isReadOnly || !isChoiceSelectable) ? "pointer-events-none" : ""}`} key={i}>
                        <div className="relative mt-[2px]">
                            <input
                                type="radio"
                                id={`${id}${item.value}${i}`}
                                className="peer appearance-none border w-[17px] h-[17px] rounded-full align-middle block bg-white checkbox-item cursor-pointer"
                                checked={value === item.value}
                                onChange={() => onSelect(item.value)}
                            />
                            <span className="absolute radioSelector top-[3px] bottom-[3px] left-[3px] right-[3px] rounded-full pointer-events-none opacity-0 invisible peer-checked:opacity-100 peer-checked:visible" />
                        </div>
                        <label htmlFor={`${id}${item.value}${i}`} className="text-base font-medium mt-0.5 text-gray-700 block cursor-pointer select-none checkbox-label">
                            {item.label}
                        </label>
                    </div>
                ))}
                {general?.enableNone &&
                    <div className={`flex items-center gap-2 ${(isReadOnly || !isChoiceSelectable) ? "pointer-events-none" : ""}`}>
                        <div className="relative mt-[2px]">
                            <input
                                type="radio"
                                id={`${id}NoneRadio`}
                                className="peer appearance-none border w-[17px] h-[17px] rounded-full align-middle block bg-white checkbox-item cursor-pointer"
                                checked={value === "none"}
                                onChange={() => onSelect("none")}
                            />
                            <span className="absolute radioSelector top-[3px] bottom-[3px] left-[3px] right-[3px] rounded-full pointer-events-none opacity-0 invisible peer-checked:opacity-100 peer-checked:visible" />
                        </div>
                        <label htmlFor={`${id}NoneRadio`} className="text-base font-medium mt-0.5 text-gray-700 block cursor-pointer select-none checkbox-label">
                            {general.enableNoneText || "None"}
                        </label>
                    </div>
                }
            </div>
        </Fragment>
    );
};

export default RadioRoot;