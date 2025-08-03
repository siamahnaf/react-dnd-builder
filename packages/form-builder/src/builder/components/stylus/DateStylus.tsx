import { Fragment } from "react";
import Stylus from "../common/Stylus";
import { BasicShowAnimate, CalendarPick, Checkbox, ConditionBox, InputBox, OptionBox, SelectBox, TextareaBox } from "../common/control";
import { produce } from "immer";
import { useEditor } from "../../context/editor.context";
import { gridOptions } from "../../data/stylus/grid.data";

//Essentials
import { DeepPartial, merge, dateResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, TDatetime } from "@siamahnaf/react-form-renderer";

const DateStylus = ({ step }: { step: number }) => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): TDatetime | undefined => pages
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
                            label="Selection Type"
                            options={[
                                { label: "Date", value: "date" },
                                { label: "Date Range", value: "date-range" },
                                { label: "Time", value: "time" },
                                { label: "Month", value: "month" },
                                { label: "Year", value: "year" }
                            ]}
                            value={element.general?.type}
                            onChange={(e) => updateElement(dateResp("general", { type: e }))}
                        />
                        <InputBox
                            label="Label"
                            value={element?.general?.label}
                            onChange={(e) => updateElement(dateResp("general", { label: e }))}
                            placeholder="Type element label"
                            className="mt-5"
                        />
                        <InputBox
                            label="Name"
                            value={element.name}
                            onChange={(e) => updateElement(dateResp({ name: e }))}
                            placeholder="Type element name"
                            className="mt-5"
                            isError={!element.name}
                        />
                        <InputBox
                            label="Placeholder"
                            placeholder="Type element placeholder"
                            className="mt-5"
                            value={element.general?.placeholder}
                            onChange={(e) => updateElement(dateResp("general", { placeholder: e }))}
                        />
                        <TextareaBox
                            label="Tooltip"
                            placeholder="Type element tooltip"
                            className="mt-5"
                            value={element.general?.tooltip}
                            onChange={(e) => updateElement(dateResp("general", { tooltip: e }))}
                        />
                        <BasicShowAnimate
                            id="dateAppear"
                            show={element.general?.type === "date" || element.general?.type === "date-range"}
                        >
                            <SelectBox
                                label="Date Format"
                                options={[
                                    { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
                                    { label: "DD-MM-YYYY", value: "DD-MM-YYYY" },
                                    { label: "MM-DD-YYYY", value: "MM-DD-YYYY" },
                                    { label: "MMMM D, YYYY", value: "MMMM D, YYYY" },
                                    { label: "D MMMM, YYYY", value: "D MMMM, YYYY" },
                                    { label: "ddd, MMM D, YYYY", value: "ddd, MMM D, YYYY" },
                                    { label: "Do MMM YYYY", value: "Do MMM YYYY" },
                                    { label: "YYYY/MM/DD", value: "YYYY/MM/DD" },
                                    { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
                                    { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
                                    { label: "YYYY.MM.DD", value: "YYYY.MM.DD" },
                                    { label: "DD.MM.YYYY", value: "DD.MM.YYYY" },
                                    { label: "dddd, MMMM Do YYYY", value: "dddd, MMMM Do YYYY" }
                                ]}
                                value={element.general?.dateFormat}
                                onChange={(e) => updateElement(dateResp("general", { dateFormat: e }))}
                                className="mt-5"
                            />
                            <CalendarPick
                                label="Minimum Date"
                                value={element.general?.minDate}
                                onChange={(e) => updateElement(dateResp("general", { minDate: e }))}
                                className="mt-5"
                            />
                            <CalendarPick
                                label="Maximum Date"
                                value={element.general?.maxDate}
                                onChange={(e) => updateElement(dateResp("general", { maxDate: e }))}
                                className="mt-5"
                            />
                            <Checkbox
                                id="showTime"
                                label="Show time select options"
                                value={element.general?.showTime}
                                onChange={(e) => updateElement(dateResp("general", { showTime: e }))}
                                className="mt-4"
                            />
                        </BasicShowAnimate>
                        <BasicShowAnimate
                            id="timeAppearAppear"
                            show={element.general?.type === "time" || element.general?.showTime}
                        >
                            <SelectBox
                                label="Time Format"
                                options={[
                                    { label: "HH:mm", value: "HH:mm" },
                                    { label: "hh:mm A", value: "hh:mm A" },
                                    { label: "h:mm A", value: "h:mm A" }
                                ]}
                                value={element.general?.timeFormat}
                                onChange={(e) => updateElement(dateResp("general", { timeFormat: e }))}
                                className="mt-5"
                            />
                        </BasicShowAnimate>
                        <BasicShowAnimate
                            id="monthAppear"
                            show={element.general?.type === "month"}
                        >
                            <SelectBox
                                label="Month Format"
                                options={[
                                    { label: "MMMM", value: "MMMM" },
                                    { label: "MMM", value: "MMM" },
                                    { label: "MM", value: "MM" },
                                    { label: "M", value: "M" }
                                ]}
                                value={element.general?.monthFormat}
                                onChange={(e) => updateElement(dateResp("general", { monthFormat: e }))}
                                className="mt-5"
                            />
                        </BasicShowAnimate>
                        <BasicShowAnimate
                            id="yearAppear"
                            show={element.general?.type === "year"}
                        >
                            <SelectBox
                                label="Year Format"
                                options={[
                                    { label: "YYYY", value: "YYYY" },
                                    { label: "YY", value: "YY" }
                                ]}
                                value={element.general?.yearFormat}
                                onChange={(e) => updateElement(dateResp("general", { yearFormat: e }))}
                                className="mt-5"
                            />
                        </BasicShowAnimate>
                    </Stylus.c>
                    <Stylus.c type="Options">
                        <Checkbox
                            id="visible"
                            label="Is visible"
                            value={element.general?.isVisible}
                            onChange={(e) => updateElement(dateResp("general", { isVisible: e }))}
                        />
                        <Checkbox
                            id="readOnly"
                            label="Read Only"
                            value={element.general?.readOnly}
                            onChange={(e) => updateElement(dateResp("general", { readOnly: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showTitle"
                            label="Show title"
                            value={element.general?.showTitle}
                            onChange={(e) => updateElement(dateResp("general", { showTitle: e }))}
                            className="mt-2"
                        />
                        <Checkbox
                            id="showDescription"
                            label="Show Description"
                            value={element.general?.showDescription}
                            onChange={(e) => updateElement(dateResp("general", { showDescription: e }))}
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
                        onChange={(e) => updateElement(dateResp("layout", {
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
                        onChange={(e) => updateElement(dateResp("layout", {
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
                        onChange={(e) => updateElement(dateResp("layout", {
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
                        onChange={(e) => updateElement(dateResp("layout", {
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
                        onChange={(e) => updateElement(dateResp("layout", {
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
                        onChange={(e) => updateElement(dateResp("layout", {
                            fieldWidth: {
                                value: e,
                                unit: element.layout?.fieldWidth?.unit || "px"
                            }
                        }))}
                        onUnitChange={(e) => updateElement(dateResp("layout", {
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
                        onChange={(e) => updateElement(dateResp("layout", {
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
                        onChange={(e) => updateElement(dateResp("layout", {
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
                            onChange={(e) => updateElement(dateResp("layout", {
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
                            onChange={(e) => updateElement(dateResp("advance", {
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
                                onChange={(e) => updateElement(dateResp("advance", {
                                    requiredErrorMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                    </Stylus.c>
                    <Stylus.c type="Condition">
                        <ConditionBox
                            label="Make the question visible if"
                            value={element.advance?.visibleIf}
                            onChange={(e) => updateElement(dateResp("advance", {
                                visibleIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Disable the read-only mode if"
                            className="mt-5"
                            value={element.advance?.readOnlyModeIf}
                            onChange={(e) => updateElement(dateResp("advance", {
                                readOnlyModeIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make the question required if"
                            className="mt-5"
                            value={element.advance?.requiredIf}
                            onChange={(e) => updateElement(dateResp("advance", {
                                requiredIf: e
                            }))}
                        />
                    </Stylus.c>
                </Stylus.m>
            </Stylus>
        </Fragment>
    );
};

export default DateStylus;