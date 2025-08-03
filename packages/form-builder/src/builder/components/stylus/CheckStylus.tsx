import { Fragment } from "react";
import Stylus from "../common/Stylus";
import { BasicShowAnimate, Checkbox, ChoiceBox, ConditionBox, InputBox, OptionBox, SelectBox, TextareaBox, ValidationBox } from "../common/control";
import { produce } from "immer";
import { useEditor } from "../../context/editor.context";
import { gridOptions } from "../../data/stylus/grid.data";

//Essentials
import { DeepPartial, merge, checkResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, TCheckbox } from "@siamahnaf/react-form-renderer";

const CheckStylus = ({ step }: { step: number }) => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): TCheckbox | undefined => pages
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
                            onChange={(e) => updateElement(checkResp("general", { label: e }))}
                            placeholder="Type element label"
                        />
                        <InputBox
                            label="Name"
                            value={element.name}
                            onChange={(e) => updateElement(checkResp({ name: e }))}
                            placeholder="Type element name"
                            className="mt-5"
                            isError={!element.name}
                        />
                        <TextareaBox
                            label="Tooltip"
                            placeholder="Type element tooltip"
                            className="mt-5"
                            value={element.general?.tooltip}
                            onChange={(e) => updateElement(checkResp("general", { tooltip: e }))}
                        />
                        <InputBox
                            label="Default Value"
                            placeholder="Type default value"
                            className="mt-5"
                            value={element.general?.defaultValue}
                            onChange={(e) => updateElement(checkResp("general", { defaultValue: e }))}
                        />
                    </Stylus.c>
                    <Stylus.c type="Choice Options">
                        <ChoiceBox
                            label="Choices"
                            value={element.general?.choices}
                            onChange={(e) => updateElement(checkResp("general", { choices: e }))}
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
                            onChange={(e) => updateElement(checkResp("general", { choiceOrder: e }))}
                        />
                        <Checkbox
                            id="enableNone"
                            label='Enable "None" Options'
                            value={element.general?.enableNone}
                            onChange={(e) => updateElement(checkResp("general", { enableNone: e }))}
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
                                onChange={(e) => updateElement(checkResp("general", { enableNoneText: e }))}
                                className="mt-4"
                            />
                        </BasicShowAnimate>
                        <Checkbox
                            id="enableSelect"
                            label='Enable "Select All" Options'
                            value={element.general?.enableSelectAll}
                            onChange={(e) => updateElement(checkResp("general", { enableSelectAll: e }))}
                            className="mt-3"
                        />
                        <BasicShowAnimate
                            id="allowSelectAppear"
                            show={element.general?.enableSelectAll}
                        >
                            <InputBox
                                label='Text for "Select All" Option'
                                placeholder="Ex. Select All"
                                value={element.general?.enableSelectAllText}
                                onChange={(e) => updateElement(checkResp("general", { enableSelectAllText: e }))}
                                className="mt-5"
                            />
                        </BasicShowAnimate>
                        <InputBox
                            label="Minimum choice to select"
                            placeholder="Ex. 4"
                            value={element.general?.minSelect}
                            onChange={(e) => updateElement(checkResp("general", { minSelect: e }))}
                            inputType="int"
                            className="mt-5"
                        />
                        <InputBox
                            label="Maximum choice to select"
                            placeholder="Ex. 7"
                            value={element.general?.maxSelect}
                            onChange={(e) => updateElement(checkResp("general", { maxSelect: e }))}
                            inputType="int"
                            className="mt-5"
                        />
                    </Stylus.c>
                    <Stylus.c type="Options">
                        <Checkbox
                            id="visible"
                            label="Is visible"
                            value={element.general?.isVisible}
                            onChange={(e) => updateElement(checkResp("general", { isVisible: e }))}
                        />
                        <Checkbox
                            id="hideQst"
                            label="Hide question if there is no choice"
                            value={element.general?.hideQuestionIfNoChoice}
                            onChange={(e) => updateElement(checkResp("general", { hideQuestionIfNoChoice: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="readOnly"
                            label="Read Only"
                            value={element.general?.readOnly}
                            onChange={(e) => updateElement(checkResp("general", { readOnly: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showTitle"
                            label="Show title"
                            value={element.general?.showTitle}
                            onChange={(e) => updateElement(checkResp("general", { showTitle: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showDescription"
                            label="Show Description"
                            value={element.general?.showDescription}
                            onChange={(e) => updateElement(checkResp("general", { showDescription: e }))}
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
                        onChange={(e) => updateElement(checkResp("layout", {
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
                        onChange={(e) => updateElement(checkResp("layout", {
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
                        onChange={(e) => updateElement(checkResp("layout", {
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
                        onChange={(e) => updateElement(checkResp("layout", {
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
                        onChange={(e) => updateElement(checkResp("layout", {
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
                        onChange={(e) => updateElement(checkResp("layout", {
                            fieldWidth: {
                                value: e,
                                unit: element.layout?.fieldWidth?.unit || "px"
                            }
                        }))}
                        onUnitChange={(e) => updateElement(checkResp("layout", {
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
                        onChange={(e) => updateElement(checkResp("layout", {
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
                            onChange={(e) => updateElement(checkResp("layout", {
                                questionWidth: e
                            }))}
                            options={gridOptions}
                            className="mt-5"
                        />
                    </BasicShowAnimate>
                    <SelectBox
                        label="Options Column Count"
                        value={element.layout?.columnCount}
                        onChange={(e) => updateElement(checkResp("layout", {
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
                            onChange={(e) => updateElement(checkResp("advance", {
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
                                onChange={(e) => updateElement(checkResp("advance", {
                                    requiredErrorMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                        <ValidationBox
                            label="Validation Rules"
                            className="mt-5"
                            value={element.advance?.validation}
                            onChange={(e) => updateElement(checkResp("advance", {
                                validation: e
                            }))}
                        />
                    </Stylus.c>
                    <Stylus.c type="Condition">
                        <ConditionBox
                            label="Make the question visible if"
                            value={element.advance?.visibleIf}
                            onChange={(e) => updateElement(checkResp("advance", {
                                visibleIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Disable the read-only mode if"
                            className="mt-5"
                            value={element.advance?.readOnlyModeIf}
                            onChange={(e) => updateElement(checkResp("advance", {
                                readOnlyModeIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make the question required if"
                            className="mt-5"
                            value={element.advance?.requiredIf}
                            onChange={(e) => updateElement(checkResp("advance", {
                                requiredIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Reset value if"
                            className="mt-5"
                            value={element.advance?.resetIf}
                            onChange={(e) => updateElement(checkResp("advance", {
                                resetIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Set value if"
                            className="mt-5"
                            value={element.advance?.setValueIf}
                            onChange={(e) => updateElement(checkResp("advance", {
                                setValueIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make choice visible if"
                            className="mt-5"
                            value={element.advance?.choiceVisibleIf}
                            onChange={(e) => updateElement(checkResp("advance", {
                                choiceVisibleIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make choice selectable if"
                            className="mt-5"
                            value={element.advance?.choiceSelectableIf}
                            onChange={(e) => updateElement(checkResp("advance", {
                                choiceSelectableIf: e
                            }))}
                        />
                    </Stylus.c>
                </Stylus.m>
            </Stylus>
        </Fragment>
    );
};

export default CheckStylus;