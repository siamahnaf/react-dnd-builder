import { Fragment } from "react";
import Stylus from "../common/Stylus";
import { useEditor } from "../../context/editor.context";
import { gridOptions } from "../../data/stylus/grid.data";
import { produce } from "immer";

//Controls
import { InputBox, TextareaBox, SelectBox, Checkbox, OptionBox, ConditionBox, ValidationBox, BasicShowAnimate } from "../common/control";

//Essentials
import { DeepPartial, merge, textResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, TSingleText } from "@siamahnaf/react-form-renderer";

const TextStylus = ({ step }: { step: number }) => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): TSingleText | undefined => pages
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
                        <SelectBox
                            label="Input Type"
                            options={[
                                { label: "Text", value: "text" },
                                { label: "Number", value: "number" },
                                { label: "Email", value: "email" },
                                { label: "Password", value: "password" },
                                { label: "Phone Number", value: "tel" },
                                { label: "URL", value: "url" }
                            ]}
                            value={element.general?.type}
                            onChange={(e) => updateElement(textResp("general", {
                                type: e
                            }))}
                        />
                        <InputBox
                            label="Label"
                            value={element?.general?.label}
                            onChange={(e) => updateElement(textResp("general", { label: e }))}
                            placeholder="Type element label"
                            className="mt-5"
                        />
                        <InputBox
                            label="Name"
                            value={element.name}
                            onChange={(e) => updateElement(textResp({ name: e }))}
                            placeholder="Type element name"
                            className="mt-5"
                            isError={!element.name}
                        />
                        <InputBox
                            label="Placeholder"
                            placeholder="Type element placeholder"
                            className="mt-5"
                            value={element.general?.placeholder}
                            onChange={(e) => updateElement(textResp("general", { placeholder: e }))}
                        />
                        <TextareaBox
                            label="Tooltip"
                            placeholder="Type element tooltip"
                            className="mt-5"
                            value={element.general?.tooltip}
                            onChange={(e) => updateElement(textResp("general", { tooltip: e }))}
                        />
                        <InputBox
                            label="Default Value"
                            placeholder="Type default value"
                            className="mt-5"
                            value={element.general?.defaultValue}
                            onChange={(e) => updateElement(textResp("general", { defaultValue: e }))}
                        />
                    </Stylus.c>
                    <Stylus.c type="Options">
                        <Checkbox
                            id="visible"
                            label="Is visible"
                            value={element.general?.isVisible}
                            onChange={(e) => updateElement(textResp("general", { isVisible: e }))}
                        />
                        <Checkbox
                            id="readOnly"
                            label="Read Only"
                            value={element.general?.readOnly}
                            onChange={(e) => updateElement(textResp("general", { readOnly: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showTitle"
                            label="Show title"
                            value={element.general?.showTitle}
                            onChange={(e) => updateElement(textResp("general", { showTitle: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showDescription"
                            label="Show Description"
                            value={element.general?.showDescription}
                            onChange={(e) => updateElement(textResp("general", { showDescription: e }))}
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
                        onChange={(e) => updateElement(textResp("layout", {
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
                        onChange={(e) => updateElement(textResp("layout", {
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
                        onChange={(e) => updateElement(textResp("layout", {
                            descriptionAlignment: e
                        }))}
                        options={[
                            { label: "Under the question title", value: "u_t" },
                            { label: "Under the input field", value: "u_i" }
                        ]}
                        className="mt-5"
                    />
                    <OptionBox
                        label="Error message alignment"
                        value={element.layout?.errorMessageAlignment}
                        onChange={(e) => updateElement(textResp("layout", {
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
                        onChange={(e) => updateElement(textResp("layout", {
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
                        onChange={(e) => updateElement(textResp("layout", {
                            fieldWidth: {
                                value: e,
                                unit: element.layout?.fieldWidth?.unit || "px"
                            }
                        }))}
                        onUnitChange={(e) => updateElement(textResp("layout", {
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
                        onChange={(e) => updateElement(textResp("layout", {
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
                        onChange={(e) => updateElement(textResp("layout", {
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
                            onChange={(e) => updateElement(textResp("layout", {
                                questionWidth: e
                            }))}
                            options={gridOptions}
                            className="mt-5"
                        />
                    </BasicShowAnimate>
                </Stylus.r>
            </Stylus>
            <Stylus render={step === 2}>
                <Stylus.m buttons={["Validation", "Condition", "Mask"]}>
                    <Stylus.c type="Validation">
                        <Checkbox
                            id="required"
                            label="Is Required"
                            value={element.advance?.isRequired}
                            onChange={(e) => updateElement(textResp("advance", {
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
                                onChange={(e) => updateElement(textResp("advance", {
                                    requiredErrorMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                        <Checkbox
                            id="isEmail"
                            label="Is Email"
                            value={element.advance?.isEmail}
                            onChange={(e) => updateElement(textResp("advance", {
                                isEmail: e
                            }))}
                            className="mt-5"
                        />
                        <BasicShowAnimate
                            id="isEmailError"
                            show={element.advance?.isEmail}
                        >
                            <TextareaBox
                                placeholder="Error message"
                                rows={3}
                                className="mt-2"
                                value={element.advance?.emailErrorMessage}
                                onChange={(e) => updateElement(textResp("advance", {
                                    emailErrorMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                        <InputBox
                            label="Min Length"
                            placeholder="Value"
                            inputType="int"
                            className="mt-5"
                            value={element.advance?.minLength}
                            onChange={(e) => updateElement(textResp("advance", {
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
                                onChange={(e) => updateElement(textResp("advance", {
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
                            onChange={(e) => updateElement(textResp("advance", {
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
                                onChange={(e) => updateElement(textResp("advance", {
                                    maxLengthErrorMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                        <InputBox
                            label="Pattern (Regex)"
                            placeholder="Value"
                            className="mt-5"
                            value={element.advance?.pattern}
                            onChange={(e) => updateElement(textResp("advance", {
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
                                onChange={(e) => updateElement(textResp("advance", {
                                    patternMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                        <ValidationBox
                            label="Validation Rules"
                            className="mt-5"
                            value={element.advance?.validation}
                            onChange={(e) => updateElement(textResp("advance", {
                                validation: e
                            }))}
                        />
                    </Stylus.c>
                    <Stylus.c type="Condition">
                        <ConditionBox
                            label="Make the question visible if"
                            value={element.advance?.visibleIf}
                            onChange={(e) => updateElement(textResp("advance", {
                                visibleIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Disable the read-only mode if"
                            className="mt-5"
                            value={element.advance?.readOnlyModeIf}
                            onChange={(e) => updateElement(textResp("advance", {
                                readOnlyModeIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make the question required if"
                            className="mt-5"
                            value={element.advance?.requiredIf}
                            onChange={(e) => updateElement(textResp("advance", {
                                requiredIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Reset value if"
                            className="mt-5"
                            value={element.advance?.resetIf}
                            onChange={(e) => updateElement(textResp("advance", {
                                resetIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Set value if"
                            className="mt-5"
                            value={element.advance?.setValueIf}
                            onChange={(e) => updateElement(textResp("advance", {
                                setValueIf: e
                            }))}
                        />
                    </Stylus.c>
                    <Stylus.c type="Mask">
                        <SelectBox
                            label="Input Mask Type"
                            options={[
                                { label: "Pattern", value: "pattern" },
                                { label: "Number", value: "number" },
                                { label: "Currency", value: "currency" }
                            ]}
                            value={element.advance?.inputMaskType}
                            onChange={(e) => updateElement(textResp("advance", {
                                inputMaskType: e
                            }))}
                        />
                        <BasicShowAnimate
                            id="maskPattern"
                            show={element.advance?.inputMaskType === "pattern"}
                        >
                            <InputBox
                                label="Value Pattern"
                                placeholder="Ex. +1(999)999-99"
                                className="mt-5"
                                value={element.advance?.patternMask?.value}
                                onChange={(e) => updateElement(textResp("advance", "patternMask", {
                                    value: e
                                }))}
                            />
                        </BasicShowAnimate>
                        <BasicShowAnimate
                            id="maskNumber"
                            show={element.advance?.inputMaskType === "number"}
                        >
                            <InputBox
                                label="Minimum Value"
                                placeholder="Value"
                                inputType="int"
                                className="mt-5"
                                value={element.advance?.patternNumber?.minValue}
                                onChange={(e) => updateElement(textResp("advance", "patternNumber", {
                                    minValue: e
                                }))}
                            />
                            <InputBox
                                label="Maximum Value"
                                placeholder="Value"
                                inputType="int"
                                className="mt-5"
                                value={element.advance?.patternNumber?.maxValue}
                                onChange={(e) => updateElement(textResp("advance", "patternNumber", {
                                    maxValue: e
                                }))}
                            />
                            <InputBox
                                label="Value Precision"
                                inputType="int"
                                placeholder="Value"
                                className="mt-5"
                                value={element.advance?.patternNumber?.precision}
                                onChange={(e) => updateElement(textResp("advance", "patternNumber", {
                                    precision: e
                                }))}
                            />
                            <Checkbox
                                id="negativeValue"
                                label="Allow negative value"
                                className="mt-4"
                                value={element.advance?.patternNumber?.allowNegative}
                                onChange={(e) => updateElement(textResp("advance", "patternNumber", {
                                    allowNegative: e
                                }))}
                            />
                        </BasicShowAnimate>
                        <BasicShowAnimate
                            id="maskCurrency"
                            show={element.advance?.inputMaskType === "currency"}
                        >
                            <InputBox
                                label="Currency Prefix"
                                placeholder="Ex. $"
                                className="mt-5"
                                value={element.advance?.patternCurrency?.prefix}
                                onChange={(e) => updateElement(textResp("advance", "patternCurrency", {
                                    prefix: e
                                }))}
                            />
                            <InputBox
                                label="Currency Suffix"
                                placeholder="Ex. USD"
                                className="mt-5"
                                value={element.advance?.patternCurrency?.suffix}
                                onChange={(e) => updateElement(textResp("advance", "patternCurrency", {
                                    suffix: e
                                }))}
                            />
                            <InputBox
                                label="Minimum Value"
                                placeholder="Value"
                                inputType="int"
                                className="mt-5"
                                value={element.advance?.patternCurrency?.minValue}
                                onChange={(e) => updateElement(textResp("advance", "patternCurrency", {
                                    minValue: e
                                }))}
                            />
                            <InputBox
                                label="Maximum Value"
                                placeholder="Value"
                                inputType="int"
                                className="mt-5"
                                value={element.advance?.patternCurrency?.maxValue}
                                onChange={(e) => updateElement(textResp("advance", "patternCurrency", {
                                    maxValue: e
                                }))}
                            />
                            <InputBox
                                label="Value Precision"
                                inputType="int"
                                placeholder="Value"
                                className="mt-5"
                                value={element.advance?.patternCurrency?.precision}
                                onChange={(e) => updateElement(textResp("advance", "patternCurrency", {
                                    precision: e
                                }))}
                            />
                            <Checkbox
                                id="negativeValue"
                                label="Allow negative value"
                                className="mt-4"
                                value={element.advance?.patternCurrency?.allowNegative}
                                onChange={(e) => updateElement(textResp("advance", "patternCurrency", {
                                    allowNegative: e
                                }))}
                            />
                        </BasicShowAnimate>
                    </Stylus.c>
                </Stylus.m>
            </Stylus>
        </Fragment>
    );
};

export default TextStylus;