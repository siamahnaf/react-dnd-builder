import { Fragment } from "react";
import Stylus from "../common/Stylus";
import { BasicShowAnimate, Checkbox, ConditionBox, InputBox, OptionBox, SelectBox, TextareaBox, ValidationBox, TickBox, ColorPick } from "../common/control";
import { produce } from "immer";
import { useEditor } from "../../context/editor.context";
import { gridOptions } from "../../data/stylus/grid.data";

//Essentials
import { DeepPartial, merge, rateResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, TRating } from "@siamahnaf/react-form-renderer";

const RatingStylus = ({ step }: { step: number }) => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): TRating | undefined => pages
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
    const ratingCount = Number(element.general?.ratingCount) || 5;
    const stepValue = Number(element.general?.step) || 1;

    const result = Array.from(
        { length: Math.floor((ratingCount - 1) / stepValue) + 1 },
        (_, i) => {
            const value = +(1 + i * stepValue).toFixed(2);
            return { value, text: `${value}` };
        }
    );

    return (
        <Fragment>
            <Stylus render={step === 0}>
                <Stylus.m buttons={["Content", "Element Settings", "Options"]}>
                    <Stylus.c type="Content">
                        <InputBox
                            label="Label"
                            value={element?.general?.label}
                            onChange={(e) => updateElement(rateResp("general", { label: e }))}
                            placeholder="Type element label"
                        />
                        <InputBox
                            label="Name"
                            value={element.name}
                            onChange={(e) => updateElement(rateResp({ name: e }))}
                            placeholder="Type element name"
                            className="mt-5"
                            isError={!element.name}
                        />
                        <TextareaBox
                            label="Tooltip"
                            placeholder="Type element tooltip"
                            className="mt-5"
                            value={element.general?.tooltip}
                            onChange={(e) => updateElement(rateResp("general", { tooltip: e }))}
                        />
                        <InputBox
                            label="Default Value"
                            inputType="int"
                            className="mt-5"
                            value={element.general?.defaultValue}
                            onChange={(e) => updateElement(rateResp("general", { defaultValue: e }))}
                            placeholder="Value"
                        />
                    </Stylus.c>
                    <Stylus.c type="Element Settings">
                        <OptionBox
                            label="Rating Icon"
                            options={[
                                { label: "Labels", value: "label" },
                                { label: "Stars", value: "star" },
                                { label: "Smileys", value: "smile" }
                            ]}
                            value={element.general?.ratingIcon}
                            onChange={(e) => updateElement(rateResp("general", {
                                ratingIcon: e,
                                ratingConf: e === "label" ? "auto" : "",
                                ratingTicks: result
                            }))}
                            className="mt-5"
                        />
                        <InputBox
                            label="Rating Count"
                            placeholder="Ex. 7"
                            inputType="int"
                            value={element.general?.ratingCount}
                            onChange={(e) => updateElement(rateResp("general", { ratingCount: e, ratingTicks: result }))}
                            className="mt-5"
                        />
                        <InputBox
                            label="Step Value"
                            placeholder="Ex. 1.5"
                            inputType="float-1"
                            value={element.general?.step}
                            onChange={(e) => updateElement(rateResp("general", { step: e, ratingTicks: result }))}
                            className="mt-5"
                        />
                        <BasicShowAnimate
                            id="labelConfAppear"
                            show={element.general?.ratingIcon === "label"}
                        >
                            <OptionBox
                                label="Rating Configurations"
                                options={[
                                    { label: "Auto Generated", value: "auto" },
                                    { label: "Manual", value: "manual" }
                                ]}
                                value={element.general?.ratingConf}
                                onChange={(e) => updateElement(rateResp("general", { ratingConf: e, ratingTicks: result }))}
                                className="mt-5"
                            />
                        </BasicShowAnimate>
                        <BasicShowAnimate
                            id="labelConfManual"
                            show={element.general?.ratingConf === "manual"}
                        >
                            <TickBox
                                label="Rating Ticks"
                                value={element.general?.ratingTicks}
                                onChange={(e) => updateElement(rateResp("general", { ratingTicks: e }))}
                                className="mt-5"
                                onRefresh={() => updateElement(rateResp("general", { ratingTicks: result }))}
                            />
                        </BasicShowAnimate>
                        <OptionBox
                            label="Tooltip Type"
                            options={[
                                { label: "None", value: "none" },
                                { label: "Tooltip", value: "tooltip" },
                                { label: "Label", value: "label" }
                            ]}
                            value={element.general?.tooltipType}
                            onChange={(e) => updateElement(rateResp("general", { tooltipType: e }))}
                            className="mt-5"
                        />
                        <BasicShowAnimate
                            id="labelConfManual"
                            show={element.general?.tooltipType === "label"}
                        >
                            <InputBox
                                label="Minimum Value Label"
                                placeholder="Value"
                                value={element.general?.minValueLabel}
                                onChange={(e) => updateElement(rateResp("general", { minValueLabel: e }))}
                                className="mt-5"
                            />
                            <InputBox
                                label="Maximum Value Label"
                                placeholder="Value"
                                value={element.general?.maxValueLabel}
                                onChange={(e) => updateElement(rateResp("general", { maxValueLabel: e }))}
                                className="mt-5"
                            />
                            <SelectBox
                                label="Label Alignment"
                                options={[
                                    { label: "Left and Right", value: "left-right" },
                                    { label: "Top and Bottom", value: "top-bottom" }
                                ]}
                                className="mt-5"
                                value={element.general?.labelAlignment}
                                onChange={(e) => updateElement(rateResp("general", { labelAlignment: e }))}
                            />
                        </BasicShowAnimate>
                        <ColorPick
                            label="Fill Color"
                            value={element.general?.fillColor}
                            onChange={(e) => updateElement(rateResp("general", { fillColor: e }))}
                            className="mt-5"
                        />
                        <ColorPick
                            label="Empty Color"
                            value={element.general?.emptyColor}
                            onChange={(e) => updateElement(rateResp("general", { emptyColor: e }))}
                            className="mt-4"
                        />
                    </Stylus.c>
                    <Stylus.c type="Options">
                        <Checkbox
                            id="visible"
                            label="Is visible"
                            value={element.general?.isVisible}
                            onChange={(e) => updateElement(rateResp("general", { isVisible: e }))}
                        />
                        <Checkbox
                            id="readOnly"
                            label="Read Only"
                            value={element.general?.readOnly}
                            onChange={(e) => updateElement(rateResp("general", { readOnly: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showTitle"
                            label="Show title"
                            value={element.general?.showTitle}
                            onChange={(e) => updateElement(rateResp("general", { showTitle: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showDescription"
                            label="Show Description"
                            value={element.general?.showDescription}
                            onChange={(e) => updateElement(rateResp("general", { showDescription: e }))}
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
                        onChange={(e) => updateElement(rateResp("layout", {
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
                        onChange={(e) => updateElement(rateResp("layout", {
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
                        onChange={(e) => updateElement(rateResp("layout", {
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
                        onChange={(e) => updateElement(rateResp("layout", {
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
                        onChange={(e) => updateElement(rateResp("layout", {
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
                        onChange={(e) => updateElement(rateResp("layout", {
                            fieldWidth: {
                                value: e,
                                unit: element.layout?.fieldWidth?.unit || "px"
                            }
                        }))}
                        onUnitChange={(e) => updateElement(rateResp("layout", {
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
                        onChange={(e) => updateElement(rateResp("layout", {
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
                            onChange={(e) => updateElement(rateResp("layout", {
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
                            onChange={(e) => updateElement(rateResp("advance", {
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
                                onChange={(e) => updateElement(rateResp("advance", {
                                    requiredErrorMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                        <ValidationBox
                            label="Validation Rules"
                            className="mt-5"
                            value={element.advance?.validation}
                            onChange={(e) => updateElement(rateResp("advance", {
                                validation: e
                            }))}
                        />
                    </Stylus.c>
                    <Stylus.c type="Condition">
                        <ConditionBox
                            label="Make the question visible if"
                            value={element.advance?.visibleIf}
                            onChange={(e) => updateElement(rateResp("advance", {
                                visibleIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Disable the read-only mode if"
                            className="mt-5"
                            value={element.advance?.readOnlyModeIf}
                            onChange={(e) => updateElement(rateResp("advance", {
                                readOnlyModeIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make the question required if"
                            className="mt-5"
                            value={element.advance?.requiredIf}
                            onChange={(e) => updateElement(rateResp("advance", {
                                requiredIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Reset value if"
                            className="mt-5"
                            value={element.advance?.resetIf}
                            onChange={(e) => updateElement(rateResp("advance", {
                                resetIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Set value if"
                            className="mt-5"
                            value={element.advance?.setValueIf}
                            onChange={(e) => updateElement(rateResp("advance", {
                                setValueIf: e
                            }))}
                        />
                    </Stylus.c>
                </Stylus.m>
            </Stylus>
        </Fragment>
    );
};

export default RatingStylus;