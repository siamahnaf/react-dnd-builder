import { Fragment } from "react";
import Stylus from "../common/Stylus";
import { BasicShowAnimate, Checkbox, ConditionBox, InputBox, OptionBox, SelectBox, TextareaBox, ValidationBox, TickBox } from "../common/control";
import { produce } from "immer";
import { useEditor } from "../../context/editor.context";
import { gridOptions } from "../../data/stylus/grid.data";

//Essentials
import { DeepPartial, merge, rangeResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, TRange } from "@siamahnaf/react-form-renderer";

const RangeStylus = ({ step }: { step: number }) => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): TRange | undefined => pages
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

    const min = Number(element.general?.minValue) || 0;
    const max = Number(element.general?.maxValue) || 300;

    //Creating Ticks
    const tickCount = 6;
    const tickStep = (max - min) / (tickCount - 1);
    const ticks = Array.from({ length: tickCount }, (_, i) => Math.round(min + i * tickStep)).map(a => ({ value: a, text: `${a}` }));

    return (
        <Fragment>
            <Stylus render={step === 0}>
                <Stylus.m buttons={["Content", "Range Settings", "Options"]}>
                    <Stylus.c type="Content">
                        <InputBox
                            label="Label"
                            value={element?.general?.label}
                            onChange={(e) => updateElement(rangeResp("general", { label: e }))}
                            placeholder="Type element label"
                        />
                        <InputBox
                            label="Name"
                            value={element.name}
                            onChange={(e) => updateElement(rangeResp({ name: e }))}
                            placeholder="Type element name"
                            className="mt-5"
                            isError={!element.name}
                        />
                        <TextareaBox
                            label="Tooltip"
                            placeholder="Type element tooltip"
                            className="mt-5"
                            value={element.general?.tooltip}
                            onChange={(e) => updateElement(rangeResp("general", { tooltip: e }))}
                        />
                    </Stylus.c>
                    <Stylus.c type="Range Settings">
                        <OptionBox
                            label="Slider Type"
                            subtile="Choose the slider type with single value or range"
                            options={[
                                { label: "Single Value", value: "single" },
                                { label: "Range", value: "range" }
                            ]}
                            value={element.general?.type}
                            onChange={(e) => updateElement(rangeResp("general", { type: e }))}
                        />
                        <InputBox
                            label="Minimum Value"
                            inputType="int"
                            className="mt-5"
                            value={element.general?.minValue}
                            onChange={(e) => updateElement(rangeResp("general", { minValue: e }))}
                            placeholder="Ex. 5"
                        />
                        <InputBox
                            label="Maximum Value"
                            inputType="int"
                            className="mt-5"
                            value={element.general?.maxValue}
                            onChange={(e) => updateElement(rangeResp("general", { maxValue: e }))}
                            placeholder="Ex. 10"
                        />
                        <InputBox
                            label="Step"
                            inputType="float-2"
                            className="mt-5"
                            value={element.general?.step}
                            onChange={(e) => updateElement(rangeResp("general", { step: e }))}
                            placeholder="Ex. 1.2"
                        />
                        <BasicShowAnimate
                            id="rangeAppear"
                            show={element.general?.type === "range"}
                        >
                            <InputBox
                                label="Minimum Range Length"
                                inputType="int"
                                className="mt-5"
                                value={element.general?.minRangeLength}
                                onChange={(e) => updateElement(rangeResp("general", { minRangeLength: e }))}
                                placeholder="Ex. 14"
                            />
                            <InputBox
                                label="Maximum Range Length"
                                inputType="int"
                                className="mt-5"
                                value={element.general?.maxRangeLength}
                                onChange={(e) => updateElement(rangeResp("general", { maxRangeLength: e }))}
                                placeholder="Ex. 26"
                            />
                        </BasicShowAnimate>
                        <Checkbox
                            id="showScale"
                            label="Show Scale"
                            value={element.general?.showScale}
                            onChange={(e) => updateElement(rangeResp("general", { showScale: e, scaleLabelConf: "auto", scaleLabels: ticks }))}
                            className="mt-4"
                        />
                        <BasicShowAnimate
                            id="showScaleAppear"
                            show={element.general?.showScale}
                        >
                            <OptionBox
                                label="Slider Type"
                                subtile="Choose the slider type with single value or range"
                                options={[
                                    { label: "Auto Generated", value: "auto" },
                                    { label: "Manual", value: "manual" }
                                ]}
                                value={element.general?.scaleLabelConf}
                                onChange={(e) => updateElement(rangeResp("general", {
                                    scaleLabelConf: e,

                                }))}
                                className="mt-5"
                            />
                        </BasicShowAnimate>
                        <BasicShowAnimate
                            id="showScaleAppearConf"
                            show={element.general?.scaleLabelConf === "manual"}
                        >
                            <TickBox
                                label="Custom Scale Labels"
                                value={element.general?.scaleLabels}
                                onChange={(e) => updateElement(rangeResp("general", { scaleLabels: e }))}
                                className="mt-5"
                            />
                        </BasicShowAnimate>
                        <Checkbox
                            id="showTooltip"
                            label="Show tooltips"
                            value={element.general?.showTooltip}
                            onChange={(e) => updateElement(rangeResp("general", { showTooltip: e }))}
                            className="mt-5"
                        />
                        <Checkbox
                            id="allowThumb"
                            label="Allow thumb crossing"
                            value={element.general?.allowThumbCrossing}
                            onChange={(e) => updateElement(rangeResp("general", { allowThumbCrossing: e }))}
                            className="mt-2"
                        />
                    </Stylus.c>
                    <Stylus.c type="Options">
                        <Checkbox
                            id="visible"
                            label="Is visible"
                            value={element.general?.isVisible}
                            onChange={(e) => updateElement(rangeResp("general", { isVisible: e }))}
                        />
                        <Checkbox
                            id="readOnly"
                            label="Read Only"
                            value={element.general?.readOnly}
                            onChange={(e) => updateElement(rangeResp("general", { readOnly: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showTitle"
                            label="Show title"
                            value={element.general?.showTitle}
                            onChange={(e) => updateElement(rangeResp("general", { showTitle: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showDescription"
                            label="Show Description"
                            value={element.general?.showDescription}
                            onChange={(e) => updateElement(rangeResp("general", { showDescription: e }))}
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
                        onChange={(e) => updateElement(rangeResp("layout", {
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
                        onChange={(e) => updateElement(rangeResp("layout", {
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
                        onChange={(e) => updateElement(rangeResp("layout", {
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
                        onChange={(e) => updateElement(rangeResp("layout", {
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
                        onChange={(e) => updateElement(rangeResp("layout", {
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
                        onChange={(e) => updateElement(rangeResp("layout", {
                            fieldWidth: {
                                value: e,
                                unit: element.layout?.fieldWidth?.unit || "px"
                            }
                        }))}
                        onUnitChange={(e) => updateElement(rangeResp("layout", {
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
                        onChange={(e) => updateElement(rangeResp("layout", {
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
                            onChange={(e) => updateElement(rangeResp("layout", {
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
                            onChange={(e) => updateElement(rangeResp("advance", {
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
                                onChange={(e) => updateElement(rangeResp("advance", {
                                    requiredErrorMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                        <ValidationBox
                            label="Validation Rules"
                            className="mt-5"
                            value={element.advance?.validation}
                            onChange={(e) => updateElement(rangeResp("advance", {
                                validation: e
                            }))}
                        />
                    </Stylus.c>
                    <Stylus.c type="Condition">
                        <ConditionBox
                            label="Make the question visible if"
                            value={element.advance?.visibleIf}
                            onChange={(e) => updateElement(rangeResp("advance", {
                                visibleIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Disable the read-only mode if"
                            className="mt-5"
                            value={element.advance?.readOnlyModeIf}
                            onChange={(e) => updateElement(rangeResp("advance", {
                                readOnlyModeIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make the question required if"
                            className="mt-5"
                            value={element.advance?.requiredIf}
                            onChange={(e) => updateElement(rangeResp("advance", {
                                requiredIf: e
                            }))}
                        />
                    </Stylus.c>
                </Stylus.m>
            </Stylus>
        </Fragment>
    );
};

export default RangeStylus;