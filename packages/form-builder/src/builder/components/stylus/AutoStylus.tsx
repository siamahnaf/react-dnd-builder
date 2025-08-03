import { Fragment } from "react";
import Stylus from "../common/Stylus";
import { InputBox, SelectBox, TextareaBox, Checkbox, OptionBox, BasicShowAnimate, ValidationBox, ConditionBox, ChoiceBox } from "../common/control";
import { produce } from "immer";
import { useEditor } from "../../context/editor.context";
import { gridOptions } from "../../data/stylus/grid.data";

//Essentials
import { DeepPartial, merge, autoResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, TAutocomplete } from "@siamahnaf/react-form-renderer";

const AutoStylus = ({ step }: { step: number }) => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): TAutocomplete | undefined => pages
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
                        <InputBox
                            label="Label"
                            value={element?.general?.label}
                            onChange={(e) => updateElement(autoResp("general", { label: e }))}
                            placeholder="Type element label"
                        />
                        <InputBox
                            label="Name"
                            value={element.name}
                            onChange={(e) => updateElement(autoResp({ name: e }))}
                            placeholder="Type element name"
                            className="mt-5"
                            isError={!element.name}
                        />
                        <InputBox
                            label="Placeholder"
                            placeholder="Type element placeholder"
                            className="mt-5"
                            value={element.general?.placeholder}
                            onChange={(e) => updateElement(autoResp("general", { placeholder: e }))}
                        />
                        <TextareaBox
                            label="Tooltip"
                            placeholder="Type element tooltip"
                            className="mt-5"
                            value={element.general?.tooltip}
                            onChange={(e) => updateElement(autoResp("general", { tooltip: e }))}
                        />
                        <InputBox
                            label="Default Value"
                            placeholder="Type default value"
                            className="mt-5"
                            value={element.general?.defaultValue}
                            onChange={(e) => updateElement(autoResp("general", { defaultValue: e }))}
                        />
                    </Stylus.c>
                    <Stylus.c type="Choice Options">
                        <SelectBox
                            label="Choice Type"
                            options={[
                                { label: "Country", value: "country" },
                                { label: "Currency", value: "currency" },
                                { label: "Calling Code", value: "calling-code" },
                                { label: "Custom", value: "custom" }
                            ]}
                            value={element.general?.choiceType}
                            onChange={(e) => updateElement(autoResp("general", { choiceType: e }))}
                        />
                        <BasicShowAnimate
                            id="choiceCountry"
                            show={element.general?.choiceType === "country"}
                        >
                            <OptionBox
                                label="Country Display Type"
                                options={[
                                    { label: "Name", value: "name" },
                                    { label: "Code", value: "code" }
                                ]}
                                value={element.general?.country?.type}
                                onChange={(e) => updateElement(autoResp("general", "country", { type: e }))}
                                className="mt-5"
                            />
                            <InputBox
                                label="Exclude Country"
                                placeholder="UK,USA,BD"
                                value={element.general?.country?.exclude}
                                onChange={(e) => updateElement(autoResp("general", "country", { exclude: e }))}
                                className="mt-5"
                            />
                            <InputBox
                                label="Include Country"
                                placeholder="UK,USA,BD"
                                value={element.general?.country?.include}
                                onChange={(e) => updateElement(autoResp("general", "country", { include: e }))}
                                className="mt-5"
                            />
                        </BasicShowAnimate>
                        <BasicShowAnimate
                            id="choiceCurrency"
                            show={element.general?.choiceType === "currency"}
                        >
                            <OptionBox
                                label="Currency Display Type"
                                options={[
                                    { label: "Symbol", value: "symbol" },
                                    { label: "Code", value: "code" }
                                ]}
                                value={element.general?.currency?.type}
                                onChange={(e) => updateElement(autoResp("general", "currency", { type: e }))}
                                className="mt-5"
                            />
                            <InputBox
                                label="Exclude Currency"
                                placeholder="GBP,BDT"
                                value={element.general?.currency?.exclude}
                                onChange={(e) => updateElement(autoResp("general", "currency", { exclude: e }))}
                                className="mt-5"
                            />
                            <InputBox
                                label="Include Currency"
                                placeholder="GBP,BDT"
                                value={element.general?.currency?.include}
                                onChange={(e) => updateElement(autoResp("general", "currency", { include: e }))}
                                className="mt-5"
                            />
                        </BasicShowAnimate>
                        <BasicShowAnimate
                            id="choiceCurrency"
                            show={element.general?.choiceType === "calling-code"}
                        >
                            <InputBox
                                label="Exclude Code"
                                placeholder="44,88"
                                value={element.general?.callingCode?.exclude}
                                onChange={(e) => updateElement(autoResp("general", "callingCode", { exclude: e }))}
                                className="mt-5"
                            />
                            <InputBox
                                label="Include Code"
                                placeholder="44,88"
                                value={element.general?.callingCode?.include}
                                onChange={(e) => updateElement(autoResp("general", "callingCode", { include: e }))}
                                className="mt-5"
                            />
                            <Checkbox
                                id="addPlusText"
                                label="Show (+) on Code"
                                value={element.general?.callingCode?.addPlusText}
                                onChange={(e) => updateElement(autoResp("general", "callingCode", { addPlusText: e }))}
                                className="mt-4"
                            />
                        </BasicShowAnimate>
                        <BasicShowAnimate
                            id="choiceCustom"
                            show={element.general?.choiceType === "custom"}
                        >
                            <ChoiceBox
                                label="Custom Choice"
                                value={element.general?.customChoice}
                                onChange={(e) => updateElement(autoResp("general", { customChoice: e }))}
                                className="mt-5"
                            />
                        </BasicShowAnimate>
                        <hr className="border-gray-200 my-5" />
                        <SelectBox
                            label="Choice Order"
                            options={[
                                { label: "None", value: "none" },
                                { label: "Ascending", value: "asc" },
                                { label: "Descending", value: "desc" }
                            ]}
                            value={element.general?.choiceOrder}
                            onChange={(e) => updateElement(autoResp("general", { choiceOrder: e }))}
                        />
                        <OptionBox
                            label="Search Mode Options"
                            options={[
                                { label: "Contain", value: "contain" },
                                { label: "Start With", value: "endWith" },
                                { label: "End With", value: "startWith" }
                            ]}
                            value={element.general?.searchMode}
                            onChange={(e) => updateElement(autoResp("general", { searchMode: e }))}
                            className="mt-5"
                        />
                    </Stylus.c>
                    <Stylus.c type="Web Service">
                        <InputBox
                            label="Web Service URL"
                            placeholder="https://api.yourdomain.com/book"
                            value={element.general?.webServiceUrl}
                            onChange={(e) => updateElement(autoResp("general", { webServiceUrl: e }))}
                        />
                        <InputBox
                            label="Path to Data"
                            placeholder="books.fictions"
                            value={element.general?.pathToData}
                            onChange={(e) => updateElement(autoResp("general", { pathToData: e }))}
                            className="mt-5"
                        />
                        <InputBox
                            label="Label Field"
                            placeholder="Ex. name"
                            value={element.general?.levelField}
                            onChange={(e) => updateElement(autoResp("general", { levelField: e }))}
                            className="mt-5"
                        />
                        <InputBox
                            label="Value Field"
                            placeholder="Ex. name"
                            value={element.general?.valueField}
                            onChange={(e) => updateElement(autoResp("general", { valueField: e }))}
                            className="mt-5"
                        />
                    </Stylus.c>
                    <Stylus.c type="Select Options">
                        <Checkbox
                            id="visible"
                            label="Is visible"
                            value={element.general?.isVisible}
                            onChange={(e) => updateElement(autoResp("general", { isVisible: e }))}
                        />
                        <Checkbox
                            id="clrBtn"
                            label="Show clear button/icon"
                            value={element.general?.clearBtn}
                            onChange={(e) => updateElement(autoResp("general", { clearBtn: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="customInput"
                            label="Allow custom input"
                            value={element.general?.allowCustomInput}
                            onChange={(e) => updateElement(autoResp("general", { allowCustomInput: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="readOnly"
                            label="Read Only"
                            value={element.general?.readOnly}
                            onChange={(e) => updateElement(autoResp("general", { readOnly: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showTitle"
                            label="Show title"
                            value={element.general?.showTitle}
                            onChange={(e) => updateElement(autoResp("general", { showTitle: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showDescription"
                            label="Show Description"
                            value={element.general?.showDescription}
                            onChange={(e) => updateElement(autoResp("general", { showDescription: e }))}
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
                        onChange={(e) => updateElement(autoResp("layout", {
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
                        onChange={(e) => updateElement(autoResp("layout", {
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
                        onChange={(e) => updateElement(autoResp("layout", {
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
                        onChange={(e) => updateElement(autoResp("layout", {
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
                        onChange={(e) => updateElement(autoResp("layout", {
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
                        onChange={(e) => updateElement(autoResp("layout", {
                            fieldWidth: {
                                value: e,
                                unit: element.layout?.fieldWidth?.unit || "px"
                            }
                        }))}
                        onUnitChange={(e) => updateElement(autoResp("layout", {
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
                        onChange={(e) => updateElement(autoResp("layout", {
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
                        onChange={(e) => updateElement(autoResp("layout", {
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
                            onChange={(e) => updateElement(autoResp("layout", {
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
                            onChange={(e) => updateElement(autoResp("advance", {
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
                                onChange={(e) => updateElement(autoResp("advance", {
                                    requiredErrorMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                        <ValidationBox
                            label="Validation Rules"
                            className="mt-5"
                            value={element.advance?.validation}
                            onChange={(e) => updateElement(autoResp("advance", {
                                validation: e
                            }))}
                        />
                    </Stylus.c>
                    <Stylus.c type="Condition">
                        <ConditionBox
                            label="Make the question visible if"
                            value={element.advance?.visibleIf}
                            onChange={(e) => updateElement(autoResp("advance", {
                                visibleIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Disable the read-only mode if"
                            className="mt-5"
                            value={element.advance?.readOnlyModeIf}
                            onChange={(e) => updateElement(autoResp("advance", {
                                readOnlyModeIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make the question required if"
                            className="mt-5"
                            value={element.advance?.requiredIf}
                            onChange={(e) => updateElement(autoResp("advance", {
                                requiredIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Reset value if"
                            className="mt-5"
                            value={element.advance?.resetIf}
                            onChange={(e) => updateElement(autoResp("advance", {
                                resetIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Set value if"
                            className="mt-5"
                            value={element.advance?.setValueIf}
                            onChange={(e) => updateElement(autoResp("advance", {
                                setValueIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make choice visible if"
                            className="mt-5"
                            value={element.advance?.choiceVisibleIf}
                            onChange={(e) => updateElement(autoResp("advance", {
                                choiceVisibleIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make choice selectable if"
                            className="mt-5"
                            value={element.advance?.choiceSelectableIf}
                            onChange={(e) => updateElement(autoResp("advance", {
                                choiceSelectableIf: e
                            }))}
                        />
                    </Stylus.c>
                </Stylus.m>
            </Stylus>
        </Fragment>
    );
};

export default AutoStylus;