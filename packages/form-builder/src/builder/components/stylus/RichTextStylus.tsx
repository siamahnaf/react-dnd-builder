import { Fragment } from "react";
import Stylus from "../common/Stylus";
import { InputBox, TextareaBox, Checkbox, SelectBox, OptionBox, BasicShowAnimate, ConditionBox } from "../common/control";
import { useEditor } from "../../context/editor.context";
import { produce } from "immer";

//Essentials
import { DeepPartial, merge, richResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, TRichText } from "@siamahnaf/react-form-renderer";

const RichTextStylus = ({ step }: { step: number }) => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): TRichText | undefined => pages
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
                            onChange={(e) => updateElement(richResp("general", { label: e }))}
                            placeholder="Type element label"
                        />
                        <InputBox
                            label="Name"
                            value={element.name}
                            onChange={(e) => updateElement(richResp({ name: e }))}
                            placeholder="Type element name"
                            className="mt-5"
                            isError={!element.name}
                        />
                        <InputBox
                            label="Placeholder"
                            placeholder="Type element placeholder"
                            className="mt-5"
                            value={element.general?.placeholder}
                            onChange={(e) => updateElement(richResp("general", { placeholder: e }))}
                        />
                        <TextareaBox
                            label="Tooltip"
                            placeholder="Type element tooltip"
                            className="mt-5"
                            value={element.general?.tooltip}
                            onChange={(e) => updateElement(richResp("general", { tooltip: e }))}
                        />
                        <InputBox
                            label="Default Value"
                            placeholder="Type default value"
                            className="mt-5"
                            value={element.general?.defaultValue}
                            onChange={(e) => updateElement(richResp("general", { defaultValue: e }))}
                        />
                        <InputBox
                            label="Editor Height"
                            placeholder="Editor height"
                            className="mt-5"
                            value={element.general?.minHeight?.value}
                            unit={element.general?.minHeight?.unit}
                            onChange={(e) => updateElement(richResp("general", "minHeight", { value: e }))}
                            onUnitChange={(e) => updateElement(richResp("general", "minHeight", { unit: e }))}
                            suffix="unit"
                        />

                    </Stylus.c>
                    <Stylus.c type="Options">
                        <Checkbox
                            id="visible"
                            label="Is visible"
                            value={element.general?.isVisible}
                            onChange={(e) => updateElement(richResp("general", { isVisible: e }))}
                        />
                        <Checkbox
                            id="readOnly"
                            label="Read Only"
                            value={element.general?.readOnly}
                            onChange={(e) => updateElement(richResp("general", { readOnly: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showCharCount"
                            label="Show character count"
                            value={element.general?.showCharCount}
                            onChange={(e) => updateElement(richResp("general", { showCharCount: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showTitle"
                            label="Show title"
                            value={element.general?.showTitle}
                            onChange={(e) => updateElement(richResp("general", { showTitle: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showDescription"
                            label="Show Description"
                            value={element.general?.showDescription}
                            onChange={(e) => updateElement(richResp("general", { showDescription: e }))}
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
                        onChange={(e) => updateElement(richResp("layout", {
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
                        onChange={(e) => updateElement(richResp("layout", {
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
                        onChange={(e) => updateElement(richResp("layout", {
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
                        onChange={(e) => updateElement(richResp("layout", {
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
                        onChange={(e) => updateElement(richResp("layout", {
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
                        onChange={(e) => updateElement(richResp("layout", {
                            fieldWidth: {
                                value: e,
                                unit: element.layout?.fieldWidth?.unit || "px"
                            }
                        }))}
                        onUnitChange={(e) => updateElement(richResp("layout", {
                            fieldWidth: {
                                unit: e
                            }
                        }))}
                        inputType="int"
                        placeholder="Ex. 100%"
                        suffix="unit"
                    />
                </Stylus.r>
            </Stylus>
            <Stylus render={step === 2}>
                <Stylus.m buttons={["Validation", "Condition"]}>
                    <Stylus.c type="Validation">
                        <Checkbox
                            id="required"
                            label="Is Required"
                            value={element.advance?.isRequired}
                            onChange={(e) => updateElement(richResp("advance", {
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
                                onChange={(e) => updateElement(richResp("advance", {
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
                            onChange={(e) => updateElement(richResp("advance", {
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
                                onChange={(e) => updateElement(richResp("advance", {
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
                            onChange={(e) => updateElement(richResp("advance", {
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
                                onChange={(e) => updateElement(richResp("advance", {
                                    maxLengthErrorMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                    </Stylus.c>
                    <Stylus.c type="Condition">
                        <ConditionBox
                            label="Make the question visible if"
                            value={element.advance?.visibleIf}
                            onChange={(e) => updateElement(richResp("advance", {
                                visibleIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Disable the read-only mode if"
                            className="mt-5"
                            value={element.advance?.readOnlyModeIf}
                            onChange={(e) => updateElement(richResp("advance", {
                                readOnlyModeIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make the question required if"
                            className="mt-5"
                            value={element.advance?.requiredIf}
                            onChange={(e) => updateElement(richResp("advance", {
                                requiredIf: e
                            }))}
                        />
                    </Stylus.c>
                </Stylus.m>
            </Stylus>
        </Fragment>
    );
};

export default RichTextStylus;