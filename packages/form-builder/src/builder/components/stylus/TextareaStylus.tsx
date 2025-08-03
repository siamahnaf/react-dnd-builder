import { Fragment } from "react";
import Stylus from "../common/Stylus";
import { InputBox, TextareaBox, Checkbox, SelectBox, OptionBox, BasicShowAnimate, ValidationBox, ConditionBox } from "../common/control";
import { useEditor } from "../../context/editor.context";
import { gridOptions } from "../../data/stylus/grid.data";
import { produce } from "immer";

//Essentials
import { DeepPartial, merge, longResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, TLongText } from "@siamahnaf/react-form-renderer";

const TextareaStylus = ({ step }: { step: number }) => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): TLongText | undefined => pages
        .flatMap(p => p.elements.flatMap(e => "elements" in e && e.elements ? [e, ...e.elements] : [e]))
        .find(e => e.id === selected.value?.id);
    const updateElement = (patch: DeepPartial<TDesignElement>) =>
        design.setValue(prev =>
            produce(prev, draft => {
                const el = findElement(draft.pages);
                if (el) merge(el, patch);
            })
        );
    const element = findElement(design.value.pages);

    if (!element) return null;

    return (
        <Fragment>
            <Stylus render={step === 0}>
                <Stylus.m buttons={["Content", "Options"]}>
                    <Stylus.c type="Content">
                        <InputBox
                            label="Label"
                            value={element?.general?.label}
                            onChange={(e) => updateElement(longResp("general", { label: e }))}
                            placeholder="Type element label"
                        />
                        <InputBox
                            label="Name"
                            value={element.name}
                            onChange={(e) => updateElement(longResp({ name: e }))}
                            placeholder="Type element name"
                            className="mt-5"
                            isError={!element.name}
                        />
                        <InputBox
                            label="Placeholder"
                            placeholder="Type element placeholder"
                            className="mt-5"
                            value={element.general?.placeholder}
                            onChange={(e) => updateElement(longResp("general", { placeholder: e }))}
                        />
                        <TextareaBox
                            label="Tooltip"
                            placeholder="Type element tooltip"
                            className="mt-5"
                            value={element.general?.tooltip}
                            onChange={(e) => updateElement(longResp("general", { tooltip: e }))}
                        />
                        <InputBox
                            label="Default Value"
                            placeholder="Type default value"
                            className="mt-5"
                            value={element.general?.defaultValue}
                            onChange={(e) => updateElement(longResp("general", { defaultValue: e }))}
                        />
                        <InputBox
                            label="Row Count"
                            placeholder="Ex. 4"
                            inputType="int"
                            className="mt-5"
                            value={element.general?.rows}
                            onChange={(e) => updateElement(longResp("general", { rows: e }))}
                        />
                        <InputBox
                            label="Column Count"
                            placeholder="Ex. 5"
                            inputType="int"
                            className="mt-5"
                            value={element.general?.cols}
                            onChange={(e) => updateElement(longResp("general", { cols: e }))}
                        />
                        <SelectBox
                            label="Resize Options"
                            placeholder="Select"
                            className="mt-5"
                            options={[
                                { label: "None", value: "resize-none" },
                                { label: "Both", value: "resize" },
                                { label: "Horizontal", value: "resize-x" },
                                { label: "Vertical", value: "resize-y" },
                            ]}
                            value={element.general?.resizeable}
                            onChange={(e) => updateElement(longResp("general", {
                                resizeable: e
                            }))}
                        />
                    </Stylus.c>
                    <Stylus.c type="Options">
                        <Checkbox
                            id="visible"
                            label="Is visible"
                            value={element.general?.isVisible}
                            onChange={(e) => updateElement(longResp("general", { isVisible: e }))}
                        />
                        <Checkbox
                            id="readOnly"
                            label="Read Only"
                            value={element.general?.readOnly}
                            onChange={(e) => updateElement(longResp("general", { readOnly: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showCharCount"
                            label="Show Character Count"
                            value={element.general?.showCharCount}
                            onChange={(e) => updateElement(longResp("general", { showCharCount: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showTitle"
                            label="Show title"
                            value={element.general?.showTitle}
                            onChange={(e) => updateElement(longResp("general", { showTitle: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showDescription"
                            label="Show Description"
                            value={element.general?.showDescription}
                            onChange={(e) => updateElement(longResp("general", { showDescription: e }))}
                            className="mt-2"
                        />
                    </Stylus.c>
                </Stylus.m>
            </Stylus>
            <Stylus render={step === 1}>
                <Stylus.r>
                    <OptionBox
                        label="Question box collapse state"
                        value={element.layout?.collapseState}
                        onChange={(e) => updateElement(longResp("layout", {
                            collapseState: e
                        }))}
                        options={[
                            { label: "Locked", value: "locked" },
                            { label: "Collapsed", value: "collapsed" },
                            { label: "Expanded", value: "expanded" },
                        ]}
                    />
                    <SelectBox
                        label="Question title alignment"
                        value={element.layout?.titleAlignment}
                        onChange={(e) => updateElement(longResp("layout", {
                            titleAlignment: e
                        }))}
                        options={[
                            { label: "Top", value: "top" },
                            { label: "Bottom", value: "bottom" }
                        ]}
                        className="mt-5"
                    />
                    <SelectBox
                        label="Question description alignment"
                        value={element.layout?.descriptionAlignment}
                        onChange={(e) => updateElement(longResp("layout", {
                            descriptionAlignment: e
                        }))}
                        options={[
                            { label: "Under the input field", value: "u_i" },
                            { label: "Under the question title", value: "u_t" }
                        ]}
                        className="mt-5"
                    />
                    <OptionBox
                        label="Error message alignment"
                        value={element.layout?.errorMessageAlignment}
                        onChange={(e) => updateElement(longResp("layout", {
                            errorMessageAlignment: e
                        }))}
                        options={[
                            { label: "Top", value: "top" },
                            { label: "Bottom", value: "bottom" }
                        ]}
                        className="mt-5"
                    />
                    <OptionBox
                        label="Increase the inner indent"
                        value={element.layout?.innerIndent}
                        onChange={(e) => updateElement(longResp("layout", {
                            innerIndent: e
                        }))}
                        options={[
                            { label: "0", value: "0px" },
                            { label: "1", value: "8px" },
                            { label: "2", value: "16px" },
                            { label: "3", value: "24px" },
                            { label: "4", value: "32px" }
                        ]}
                        className="mt-5"
                    />
                    <InputBox
                        label="Question Field Width"
                        className="mt-5"
                        value={element.layout?.fieldWidth?.value}
                        unit={element.layout?.fieldWidth?.unit}
                        onChange={(e) => updateElement(longResp("layout", {
                            fieldWidth: {
                                value: e,
                                unit: element.layout?.fieldWidth?.unit || "px"
                            }
                        }))}
                        onUnitChange={(e) => updateElement(longResp("layout", {
                            fieldWidth: {
                                unit: e
                            }
                        }))}
                        inputType="int"
                        placeholder="Ex. 100%"
                        suffix="unit"
                    />
                    <OptionBox
                        label="Input value alignment"
                        subtile="Adjust input value alignment"
                        value={element.layout?.valueAlignment}
                        onChange={(e) => updateElement(longResp("layout", {
                            valueAlignment: e
                        }))}
                        options={[
                            { label: "Left", value: "left" },
                            { label: "Right", value: "right" },
                            { label: "Auto", value: "auto" }
                        ]}
                        className="mt-5"
                    />
                    <OptionBox
                        label="Question Alignment"
                        subtile="Adjust the width of the entire column"
                        value={element.layout?.questionAlignment}
                        onChange={(e) => updateElement(longResp("layout", {
                            questionAlignment: e
                        }))}
                        options={[
                            { label: "Auto", value: "auto" },
                            { label: "Inline", value: "inline" },
                            { label: "New line", value: "newline" }
                        ]}
                        className="mt-5"
                    />
                    <BasicShowAnimate
                        id="inlineQuestionWidth"
                        show={element.layout?.questionAlignment === "inline"}
                    >
                        <SelectBox
                            label="Inline question width"
                            placeholder="Column"
                            value={element.layout?.questionWidth}
                            onChange={(e) => updateElement(longResp("layout", {
                                questionWidth: e
                            }))}
                            options={gridOptions}
                            className="mt-5"
                        />
                    </BasicShowAnimate>
                </Stylus.r>
            </Stylus>
            <Stylus render={step === 2}>
                <Stylus.m buttons={["Validation", "Condition"]}>
                    <Stylus.c type="Validation">
                        <Checkbox
                            id="required"
                            label="Is Required"
                            value={element.advance?.isRequired}
                            onChange={(e) => updateElement(longResp("advance", {
                                isRequired: e
                            }))}
                        />
                        <BasicShowAnimate
                            id="isRequiredError"
                            show={element.advance?.isRequired}
                        >
                            <TextareaBox
                                placeholder="Error message"
                                rows={3}
                                className="mt-2"
                                value={element.advance?.requiredErrorMessage}
                                onChange={(e) => updateElement(longResp("advance", {
                                    requiredErrorMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                        <InputBox
                            label="Min Length"
                            placeholder="Value"
                            inputType="int"
                            className="mt-5"
                            value={element.advance?.minLength}
                            onChange={(e) => updateElement(longResp("advance", {
                                minLength: e
                            }))}
                        />
                        <BasicShowAnimate
                            id="minLenError"
                            show={!!element.advance?.minLength?.length}
                        >
                            <TextareaBox
                                placeholder="Error message"
                                rows={3}
                                className="mt-2"
                                value={element.advance?.minLengthErrorMessage}
                                onChange={(e) => updateElement(longResp("advance", {
                                    minLengthErrorMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                        <InputBox
                            label="Max Length"
                            placeholder="Value"
                            inputType="int"
                            className="mt-5"
                            value={element.advance?.maxLength}
                            onChange={(e) => updateElement(longResp("advance", {
                                maxLength: e
                            }))}
                        />
                        <BasicShowAnimate
                            id="maxLengthError"
                            show={!!element.advance?.maxLength}
                        >
                            <TextareaBox
                                placeholder="Error message"
                                rows={3}
                                className="mt-2"
                                value={element.advance?.maxLengthErrorMessage}
                                onChange={(e) => updateElement(longResp("advance", {
                                    maxLengthErrorMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                        <InputBox
                            label="Pattern (Regex)"
                            placeholder="Value"
                            className="mt-5"
                            value={element.advance?.pattern}
                            onChange={(e) => updateElement(longResp("advance", {
                                pattern: e
                            }))}
                        />
                        <BasicShowAnimate
                            id="patternError"
                            show={!!element.advance?.pattern}
                        >
                            <TextareaBox
                                placeholder="Error message"
                                rows={3}
                                className="mt-2"
                                value={element.advance?.patternMessage}
                                onChange={(e) => updateElement(longResp("advance", {
                                    patternMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                        <ValidationBox
                            label="Validation Rules"
                            className="mt-5"
                            value={element.advance?.validation}
                            onChange={(e) => updateElement(longResp("advance", {
                                validation: e
                            }))}
                        />
                    </Stylus.c>
                    <Stylus.c type="Condition">
                        <ConditionBox
                            label="Make the question visible if"
                            value={element.advance?.visibleIf}
                            onChange={(e) => updateElement(longResp("advance", {
                                visibleIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Disable the read-only mode if"
                            className="mt-5"
                            value={element.advance?.readOnlyModeIf}
                            onChange={(e) => updateElement(longResp("advance", {
                                readOnlyModeIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make the question required if"
                            className="mt-5"
                            value={element.advance?.requiredIf}
                            onChange={(e) => updateElement(longResp("advance", {
                                requiredIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Reset value if"
                            className="mt-5"
                            value={element.advance?.resetIf}
                            onChange={(e) => updateElement(longResp("advance", {
                                resetIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Set value if"
                            className="mt-5"
                            value={element.advance?.setValueIf}
                            onChange={(e) => updateElement(longResp("advance", {
                                setValueIf: e
                            }))}
                        />
                    </Stylus.c>
                </Stylus.m>
            </Stylus>
        </Fragment>
    );
};

export default TextareaStylus;