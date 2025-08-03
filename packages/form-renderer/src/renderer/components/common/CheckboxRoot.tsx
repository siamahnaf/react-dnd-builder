import { useState, useMemo, useEffect, Fragment } from "react";
import { useEditor } from "../../context/editor.context";
import { TCheckbox } from "../../types/elements";

interface Props {
    value?: string[];
    onChange?: (value: string[]) => void;
    item: TCheckbox;
    isReadOnly: boolean;
    isChoiceSelectable: boolean;
    isChoiceVisible: boolean;
}

const CheckboxRoot = ({ item, value = [], onChange, isReadOnly, isChoiceSelectable, isChoiceVisible }: Props) => {
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
        if (value.includes(item)) {
            onChange?.(value.filter(a => a !== item));
        } else {
            if (item === "none") {
                onChange?.([item]);
            } else if (item === "selectAll") {
                if (sortedOptions.length === value.length) {
                    onChange?.([])
                } else {
                    onChange?.(sortedOptions.map(a => a.value))
                }
            } else {
                onChange?.([...value, item])
            }
        }
    }

    //Effect
    useEffect(() => {
        setChoiceOptions(general?.choices || []);
        onChange?.([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [general?.choices, general?.enableNone, general?.enableSelectAll])

    if (sortedOptions.length === 0 && general?.hideQuestionIfNoChoice) return 0;

    return (
        <Fragment>
            <style jsx>{`
                .checkbox-item {
                    border-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.fieldBorderColor};
                }
                .checkbox-item:checked {
                    border-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.accentBgColor};
                    background: ${theme?.accentBgColor};
                }
                .checkbox-label {
                    color: ${theme?.fieldTextColor};
                }
            `}</style>
            <div className="space-y-1.5" style={{ columns: Number(layout?.columnCount || 1) }}>
                {general?.enableSelectAll &&
                    <div className={`flex items-center gap-2 ${(isReadOnly || !isChoiceSelectable) ? "pointer-events-none" : ""}`}>
                        <div className="relative mt-[2px]">
                            <input
                                type="checkbox"
                                id={`${id}selectAll`}
                                className="peer appearance-none border w-[17px] h-[17px] rounded-sm align-middle block bg-white checkbox-item cursor-pointer"
                                checked={sortedOptions.length === value.length}
                                onChange={() => onSelect("selectAll")}
                            />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-px pointer-events-none opacity-0 invisible peer-checked:opacity-100 peer-checked:visible">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            </span>
                        </div>
                        <label htmlFor={`${id}selectAll`} className="text-base font-medium mt-0.5 text-gray-700 block cursor-pointer select-none checkbox-label">
                            {general.enableSelectAllText || "Select All"}
                        </label>
                    </div>
                }
                {isChoiceVisible && sortedOptions.map((item, i) => (
                    <div className={`flex items-center gap-2 ${(isReadOnly || !isChoiceSelectable) ? "pointer-events-none" : ""}`} key={i}>
                        <div className="relative mt-[2px]">
                            <input
                                type="checkbox"
                                id={`${id}${item.value}${i}`}
                                className="peer appearance-none border w-[17px] h-[17px] rounded-sm align-middle block bg-white checkbox-item cursor-pointer"
                                checked={value?.includes(item.value)}
                                onChange={() => onSelect(item.value)}
                            />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-px pointer-events-none opacity-0 invisible peer-checked:opacity-100 peer-checked:visible">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            </span>
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
                                type="checkbox"
                                id={`${id}noneCheckbox`}
                                className="peer appearance-none border w-[17px] h-[17px] rounded-sm align-middle block bg-white checkbox-item cursor-pointer"
                                checked={value?.includes("none")}
                                onChange={() => onSelect("none")}
                            />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-px pointer-events-none opacity-0 invisible peer-checked:opacity-100 peer-checked:visible">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            </span>
                        </div>
                        <label htmlFor={`${id}noneCheckbox`} className="text-base font-medium mt-0.5 text-gray-700 block cursor-pointer select-none checkbox-label">
                            {general.enableNoneText || "None"}
                        </label>
                    </div>
                }
            </div>
        </Fragment>
    );
};

export default CheckboxRoot;