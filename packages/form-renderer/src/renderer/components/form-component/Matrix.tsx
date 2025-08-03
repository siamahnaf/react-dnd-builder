import { useState } from "react";
import { Controller } from "react-hook-form";
import { TMatrix } from "../../types/elements";
import { useEditor } from "../../context/editor.context";
import { IconPlus, IconMinus } from "../../icons";
import { Collapse, ErrorMessage, MatrixRoot } from "../common";
import { errorMessages, useConditionalProps } from "../../utils";

//Interface
interface Props {
    item: TMatrix;
}

const Matrix = ({ item }: Props) => {
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
        base: { isVisible: general?.isVisible, isReadOnly: general?.readOnly, isRequired: advance?.isRequired }
    })

    if (!isVisible) return null;
    if (!name) return <p className="text-sm text-red-600 font-light">Please add a name</p>;
    if (general?.rowsData?.length === 0 && general.hideQuestionIfNoRows) return null;

    return (
        <div
            className={`${theme?.appearance === "box" ? "border border-solid px-5 py-4 rounded-lg" : ""} col-span-12`}
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
                            }
                        }}
                        render={({ field: { value, onChange } }) => (
                            <MatrixRoot
                                item={item}
                                value={value}
                                onChange={onChange}
                                isReadOnly={isReadOnly}
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

export default Matrix;