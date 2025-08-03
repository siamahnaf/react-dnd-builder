import { Fragment } from "react";
import Stylus from "../common/Stylus";
import { BasicShowAnimate, Checkbox, ChoiceBox, ConditionBox, InputBox, OptionBox, SelectBox, TextareaBox, ValidationBox } from "../common/control";
import { produce } from "immer";
import { useEditor } from "../../context/editor.context";
import { gridOptions } from "../../data/stylus/grid.data";

//Essentials
import { DeepPartial, merge, radioResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, TRadio } from "@siamahnaf/react-form-renderer";

const RadioStylus = ({ step }: { step: number }) => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): TRadio | undefined => pages
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
                <Stylus.m buttons={["Content", "Choice Options", "Options"]}>
                    <Stylus.c type="Content">
                        <InputBox
                            label="Label"
                            value={element?.general?.label}
                            onChange={(e) => updateElement(radioResp("general", { label: e }))}
                            placeholder="Type element label"
                        />
                        <InputBox
                            label="Name"
                            value={element.name}
                            onChange={(e) => updateElement(radioResp({ name: e }))}
                            placeholder="Type element name"
                            className="mt-5"
                            isError={!element.name}
                        />
                        <TextareaBox
                            label="Tooltip"
                            placeholder="Type element tooltip"
                            className="mt-5"
                            value={element.general?.tooltip}
                            onChange={(e) => updateElement(radioResp("general", { tooltip: e }))}
                        />
                        <InputBox
                            label="Default Value"
                            placeholder="Type default value"
                            className="mt-5"
                            value={element.general?.defaultValue}
                            onChange={(e) => updateElement(radioResp("general", { defaultValue: e }))}
                        />
                    </Stylus.c>
                    <Stylus.c type="Choice Options">
                        <ChoiceBox
                            label="Choices"
                            value={element.general?.choices}
                            onChange={(e) => updateElement(radioResp("general", { choices: e }))}
                        />
                        <SelectBox
                            label="Choice Order"
                            options={[
                                { label: "None", value: "none" },
                                { label: "Ascending", value: "asc" },
                                { label: "Descending", value: "desc" }
                            ]}
                            className="mt-5"
                            value={element.general?.choiceOrder}
                            onChange={(e) => updateElement(radioResp("general", { choiceOrder: e }))}
                        />
                        <Checkbox
                            id="enableNone"
                            label='Enable "None" Options'
                            value={element.general?.enableNone}
                            onChange={(e) => updateElement(radioResp("general", { enableNone: e }))}
                            className="mt-3"
                        />
                        <BasicShowAnimate
                            id="allowNoneAppear"
                            show={element.general?.enableNone}
                        >
                            <InputBox
                                label='Text for "None" Option'
                                placeholder="Ex. None"
                                value={element.general?.enableNoneText}
                                onChange={(e) => updateElement(radioResp("general", { enableNoneText: e }))}
                                className="mt-4"
                            />
                        </BasicShowAnimate>
                    </Stylus.c>
                    <Stylus.c type="Options">
                        <Checkbox
                            id="visible"
                            label="Is visible"
                            value={element.general?.isVisible}
                            onChange={(e) => updateElement(radioResp("general", { isVisible: e }))}
                        />
                        <Checkbox
                            id="hideQst"
                            label="Hide question if there is no choice"
                            value={element.general?.hideQuestionIfNoChoice}
                            onChange={(e) => updateElement(radioResp("general", { hideQuestionIfNoChoice: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="readOnly"
                            label="Read Only"
                            value={element.general?.readOnly}
                            onChange={(e) => updateElement(radioResp("general", { readOnly: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showTitle"
                            label="Show title"
                            value={element.general?.showTitle}
                            onChange={(e) => updateElement(radioResp("general", { showTitle: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showDescription"
                            label="Show Description"
                            value={element.general?.showDescription}
                            onChange={(e) => updateElement(radioResp("general", { showDescription: e }))}
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
                        onChange={(e) => updateElement(radioResp("layout", {
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
                        onChange={(e) => updateElement(radioResp("layout", {
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
                        onChange={(e) => updateElement(radioResp("layout", {
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
                        onChange={(e) => updateElement(radioResp("layout", {
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
                        onChange={(e) => updateElement(radioResp("layout", {
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
                        onChange={(e) => updateElement(radioResp("layout", {
                            fieldWidth: {
                                value: e,
                                unit: element.layout?.fieldWidth?.unit || "px"
                            }
                        }))}
                        onUnitChange={(e) => updateElement(radioResp("layout", {
                            fieldWidth: {
                                unit: e
                            }
                        }))}
                        inputType="int"
                        placeholder="Ex. 100%"
                        suffix="unit"
                    />
                    <OptionBox
                        label="Question Alignment"
                        subtile="Adjust the width of the entire column"
                        value={element.layout?.questionAlignment}
                        onChange={(e) => updateElement(radioResp("layout", {
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
                            onChange={(e) => updateElement(radioResp("layout", {
                                questionWidth: e
                            }))}
                            options={gridOptions}
                            className="mt-5"
                        />
                    </BasicShowAnimate>
                    <SelectBox
                        label="Options Column Count"
                        value={element.layout?.columnCount}
                        onChange={(e) => updateElement(radioResp("layout", {
                            columnCount: e
                        }))}
                        options={[
                            { label: "1", value: "1" },
                            { label: "2", value: "2" },
                            { label: "3", value: "3" },
                            { label: "4", value: "4" }
                        ]}
                        className="mt-5"
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
                            onChange={(e) => updateElement(radioResp("advance", {
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
                                onChange={(e) => updateElement(radioResp("advance", {
                                    requiredErrorMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                        <ValidationBox
                            label="Validation Rules"
                            className="mt-5"
                            value={element.advance?.validation}
                            onChange={(e) => updateElement(radioResp("advance", {
                                validation: e
                            }))}
                        />
                    </Stylus.c>
                    <Stylus.c type="Condition">
                        <ConditionBox
                            label="Make the question visible if"
                            value={element.advance?.visibleIf}
                            onChange={(e) => updateElement(radioResp("advance", {
                                visibleIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Disable the read-only mode if"
                            className="mt-5"
                            value={element.advance?.readOnlyModeIf}
                            onChange={(e) => updateElement(radioResp("advance", {
                                readOnlyModeIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make the question required if"
                            className="mt-5"
                            value={element.advance?.requiredIf}
                            onChange={(e) => updateElement(radioResp("advance", {
                                requiredIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Reset value if"
                            className="mt-5"
                            value={element.advance?.resetIf}
                            onChange={(e) => updateElement(radioResp("advance", {
                                resetIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Set value if"
                            className="mt-5"
                            value={element.advance?.setValueIf}
                            onChange={(e) => updateElement(radioResp("advance", {
                                setValueIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make choice visible if"
                            className="mt-5"
                            value={element.advance?.choiceVisibleIf}
                            onChange={(e) => updateElement(radioResp("advance", {
                                choiceVisibleIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make choice selectable if"
                            className="mt-5"
                            value={element.advance?.choiceSelectableIf}
                            onChange={(e) => updateElement(radioResp("advance", {
                                choiceSelectableIf: e
                            }))}
                        />
                    </Stylus.c>
                </Stylus.m>
            </Stylus>
        </Fragment>
    );
};

export default RadioStylus;