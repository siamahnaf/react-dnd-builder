import { Fragment } from "react";
import Stylus from "../common/Stylus";
import { SelectBox, InputBox, TextareaBox, Checkbox, BasicShowAnimate, OptionBox, ValidationBox, ConditionBox, ChoiceBox } from "../common/control";
import { useEditor } from "../../context/editor.context";
import { produce } from "immer";
import { gridOptions } from "../../data/stylus/grid.data";

//Essentials
import { DeepPartial, merge, selectResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, TSelect } from "@siamahnaf/react-form-renderer";

const SelectStylus = ({ step }: { step: number }) => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): TSelect | undefined => pages
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
                <Stylus.m buttons={["Content", "Choice Options", "Web Service", "Select Options"]}>
                    <Stylus.c type="Content">
                        <SelectBox
                            label="Select Type"
                            options={[
                                { label: "Single Select", value: "single-select" },
                                { label: "Multi Select", value: "multi-select" }
                            ]}
                            value={element.general?.type}
                            onChange={(e) => updateElement(selectResp("general", {
                                type: e
                            }))}
                        />
                        <InputBox
                            label="Label"
                            value={element?.general?.label}
                            onChange={(e) => updateElement(selectResp("general", { label: e }))}
                            placeholder="Type element label"
                            className="mt-5"
                        />
                        <InputBox
                            label="Name"
                            value={element.name}
                            onChange={(e) => updateElement(selectResp({ name: e }))}
                            placeholder="Type element name"
                            className="mt-5"
                            isError={!element.name}
                        />
                        <InputBox
                            label="Placeholder"
                            placeholder="Type element placeholder"
                            className="mt-5"
                            value={element.general?.placeholder}
                            onChange={(e) => updateElement(selectResp("general", { placeholder: e }))}
                        />
                        <TextareaBox
                            label="Tooltip"
                            placeholder="Type element tooltip"
                            className="mt-5"
                            value={element.general?.tooltip}
                            onChange={(e) => updateElement(selectResp("general", { tooltip: e }))}
                        />
                        <InputBox
                            label="Default Value"
                            placeholder="Type default value"
                            className="mt-5"
                            value={element.general?.defaultValue}
                            onChange={(e) => updateElement(selectResp("general", { defaultValue: e }))}
                        />
                    </Stylus.c>
                    <Stylus.c type="Choice Options">
                        <ChoiceBox
                            label="Choices"
                            value={element.general?.choices}
                            onChange={(e) => updateElement(selectResp("general", { choices: e }))}
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
                            onChange={(e) => updateElement(selectResp("general", { choiceOrder: e }))}
                        />
                        <OptionBox
                            label="Search Mode Options"
                            options={[
                                { label: "Contain", value: "contain" },
                                { label: "Start With", value: "endWith" },
                                { label: "End With", value: "startWith" }
                            ]}
                            value={element.general?.searchMode}
                            onChange={(e) => updateElement(selectResp("general", { searchMode: e }))}
                            className="mt-5"
                        />
                        <Checkbox
                            id="allowCustomChoice"
                            label="Allow Custom Choice"
                            value={element.general?.allowCustomChoice}
                            onChange={(e) => updateElement(selectResp("general", { allowCustomChoice: e }))}
                            className="mt-3"
                        />
                        <BasicShowAnimate
                            id="allowCustomerAppear"
                            show={element.general?.allowCustomChoice}
                        >
                            <InputBox
                                label="Min Value form Custom Choice"
                                placeholder="Ex. 3"
                                value={element.general?.minValueForCustom}
                                onChange={(e) => updateElement(selectResp("general", { minValueForCustom: e }))}
                                className="mt-4"
                                inputType="int"
                            />
                            <InputBox
                                label="Max Value form Custom Choice"
                                placeholder="Ex. 8"
                                value={element.general?.maxValueForCustom}
                                onChange={(e) => updateElement(selectResp("general", { maxValueForCustom: e }))}
                                className="mt-5"
                                inputType="int"
                            />
                        </BasicShowAnimate>
                    </Stylus.c>
                    <Stylus.c type="Web Service">
                        <InputBox
                            label="Web Service URL"
                            placeholder="https://api.yourdomain.com/book"
                            value={element.general?.webServiceUrl}
                            onChange={(e) => updateElement(selectResp("general", { webServiceUrl: e }))}
                        />
                        <InputBox
                            label="Path to Data"
                            placeholder="books.fictions"
                            value={element.general?.pathToData}
                            onChange={(e) => updateElement(selectResp("general", { pathToData: e }))}
                            className="mt-5"
                        />
                        <InputBox
                            label="Level Field Key/Name"
                            placeholder="Ex. name"
                            value={element.general?.levelField}
                            onChange={(e) => updateElement(selectResp("general", { levelField: e }))}
                            className="mt-5"
                        />
                        <InputBox
                            label="Value Field Key/Name"
                            placeholder="Ex. id"
                            value={element.general?.valueField}
                            onChange={(e) => updateElement(selectResp("general", { valueField: e }))}
                            className="mt-5"
                        />
                    </Stylus.c>
                    <Stylus.c type="Select Options">
                        <Checkbox
                            id="visible"
                            label="Is visible"
                            value={element.general?.isVisible}
                            onChange={(e) => updateElement(selectResp("general", { isVisible: e }))}
                        />
                        <Checkbox
                            id="clrBtn"
                            label="Show clear button/icon"
                            value={element.general?.clearBtn}
                            onChange={(e) => updateElement(selectResp("general", { clearBtn: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="hideQst"
                            label="Hide question if there is no choice"
                            value={element.general?.hideQuestionIfNoChoice}
                            onChange={(e) => updateElement(selectResp("general", { hideQuestionIfNoChoice: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="readOnly"
                            label="Read Only"
                            value={element.general?.readOnly}
                            onChange={(e) => updateElement(selectResp("general", { readOnly: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showTitle"
                            label="Show title"
                            value={element.general?.showTitle}
                            onChange={(e) => updateElement(selectResp("general", { showTitle: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showDescription"
                            label="Show Description"
                            value={element.general?.showDescription}
                            onChange={(e) => updateElement(selectResp("general", { showDescription: e }))}
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
                        onChange={(e) => updateElement(selectResp("layout", {
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
                        onChange={(e) => updateElement(selectResp("layout", {
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
                        onChange={(e) => updateElement(selectResp("layout", {
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
                        onChange={(e) => updateElement(selectResp("layout", {
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
                        onChange={(e) => updateElement(selectResp("layout", {
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
                        onChange={(e) => updateElement(selectResp("layout", {
                            fieldWidth: {
                                value: e,
                                unit: element.layout?.fieldWidth?.unit || "px"
                            }
                        }))}
                        onUnitChange={(e) => updateElement(selectResp("layout", {
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
                        onChange={(e) => updateElement(selectResp("layout", {
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
                        onChange={(e) => updateElement(selectResp("layout", {
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
                            onChange={(e) => updateElement(selectResp("layout", {
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
                            onChange={(e) => updateElement(selectResp("advance", {
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
                                onChange={(e) => updateElement(selectResp("advance", {
                                    requiredErrorMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                        <ValidationBox
                            label="Validation Rules"
                            className="mt-5"
                            value={element.advance?.validation}
                            onChange={(e) => updateElement(selectResp("advance", {
                                validation: e
                            }))}
                        />
                    </Stylus.c>
                    <Stylus.c type="Condition">
                        <ConditionBox
                            label="Make the question visible if"
                            value={element.advance?.visibleIf}
                            onChange={(e) => updateElement(selectResp("advance", {
                                visibleIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Disable the read-only mode if"
                            className="mt-5"
                            value={element.advance?.readOnlyModeIf}
                            onChange={(e) => updateElement(selectResp("advance", {
                                readOnlyModeIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make the question required if"
                            className="mt-5"
                            value={element.advance?.requiredIf}
                            onChange={(e) => updateElement(selectResp("advance", {
                                requiredIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Reset value if"
                            className="mt-5"
                            value={element.advance?.resetIf}
                            onChange={(e) => updateElement(selectResp("advance", {
                                resetIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Set value if"
                            className="mt-5"
                            value={element.advance?.setValueIf}
                            onChange={(e) => updateElement(selectResp("advance", {
                                setValueIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make choice visible if"
                            className="mt-5"
                            value={element.advance?.choiceVisibleIf}
                            onChange={(e) => updateElement(selectResp("advance", {
                                choiceVisibleIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make choice selectable if"
                            className="mt-5"
                            value={element.advance?.choiceSelectableIf}
                            onChange={(e) => updateElement(selectResp("advance", {
                                choiceSelectableIf: e
                            }))}
                        />
                    </Stylus.c>
                </Stylus.m>
            </Stylus>
        </Fragment>
    );
};

export default SelectStylus;