import { Fragment } from "react";
import Stylus from "../common/Stylus";
import { BasicShowAnimate, Checkbox, ColorPick, ConditionBox, InputBox, OptionBox, SelectBox, TextareaBox } from "../common/control";
import { produce } from "immer";
import { useEditor } from "../../context/editor.context";

//Essentials
import { DeepPartial, merge, sigResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, TSignature } from "@siamahnaf/react-form-renderer";

const SigStylus = ({ step }: { step: number }) => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): TSignature | undefined => pages
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
                <Stylus.m buttons={["Content", "Pad Settings"]}>
                    <Stylus.c type="Content">
                        <InputBox
                            label="Label"
                            value={element?.general?.label}
                            onChange={(e) => updateElement(sigResp("general", { label: e }))}
                            placeholder="Type element label"
                        />
                        <InputBox
                            label="Name"
                            value={element.name}
                            onChange={(e) => updateElement(sigResp({ name: e }))}
                            placeholder="Type element name"
                            className="mt-5"
                            isError={!element.name}
                        />
                        <TextareaBox
                            label="Tooltip"
                            placeholder="Type element tooltip"
                            className="mt-5"
                            value={element.general?.tooltip}
                            onChange={(e) => updateElement(sigResp("general", { tooltip: e }))}
                        />
                        <Checkbox
                            id="showClearButton"
                            label="Show clear button"
                            value={element.general?.showClearButton}
                            onChange={(e) => updateElement(sigResp("general", { showClearButton: e }))}
                            className="mt-4"
                        />
                        <Checkbox
                            id="visible"
                            label="Is visible"
                            value={element.general?.isVisible}
                            onChange={(e) => updateElement(sigResp("general", { isVisible: e }))}
                            className="mt-2.5"
                        />
                        <Checkbox
                            id="showTitle"
                            label="Show title"
                            value={element.general?.showTitle}
                            onChange={(e) => updateElement(sigResp("general", { showTitle: e }))}
                            className="mt-2.5"
                        />
                        <Checkbox
                            id="showDescription"
                            label="Show Description"
                            value={element.general?.showDescription}
                            onChange={(e) => updateElement(sigResp("general", { showDescription: e }))}
                            className="mt-2.5"
                        />
                    </Stylus.c>
                    <Stylus.c type="Pad Settings">
                        <OptionBox
                            label="Storage Format"
                            options={[
                                { label: "PNG", value: "image/png" },
                                { label: "JPG/JPEG", value: "image/jpeg" },
                                { label: "SVG", value: "image/svg+xml" }
                            ]}
                            value={element.general?.storeFormat}
                            onChange={(e) => updateElement(sigResp("general", { storeFormat: e }))}
                        />
                        <Checkbox
                            id="autoScaleArea"
                            label="Auto scale the signature area"
                            value={element.general?.autoScaleArea}
                            onChange={(e) => updateElement(sigResp("general", { autoScaleArea: e }))}
                            className="mt-4"
                        />
                        <BasicShowAnimate
                            id="scaleAppear"
                            show={!element.general?.autoScaleArea}
                        >
                            <InputBox
                                label="Signature Area Width"
                                placeholder="Ex. 300px"
                                inputType="int"
                                value={element.general?.areaWidth}
                                onChange={(e) => updateElement(sigResp("general", { areaWidth: e }))}
                                className="mt-5"
                            />
                            <InputBox
                                label="Signature Area Height"
                                placeholder="Ex. 300px"
                                inputType="int"
                                value={element.general?.areaHeight}
                                onChange={(e) => updateElement(sigResp("general", { areaHeight: e }))}
                                className="mt-5"
                            />
                        </BasicShowAnimate>
                        <ColorPick
                            label="Background Color"
                            value={element.general?.backgroundColor}
                            onChange={(e) => updateElement(sigResp("general", { backgroundColor: e }))}
                            className="mt-5"
                        />
                        <InputBox
                            label="Stroke Width"
                            placeholder="Value"
                            value={element.general?.strokeWidth}
                            onChange={(e) => updateElement(sigResp("general", { strokeWidth: e }))}
                            className="mt-5"
                        />
                        <ColorPick
                            label="Stroke Color"
                            value={element.general?.strokeColor}
                            onChange={(e) => updateElement(sigResp("general", { strokeColor: e }))}
                            className="mt-5"
                        />
                    </Stylus.c>
                </Stylus.m>
            </Stylus>
            <Stylus render={step === 1}>
                <Stylus.r>
                    <OptionBox
                        label="Question box collapse state"
                        value={element.layout?.collapseState}
                        onChange={(e) => updateElement(sigResp("layout", {
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
                        onChange={(e) => updateElement(sigResp("layout", {
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
                        onChange={(e) => updateElement(sigResp("layout", {
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
                        onChange={(e) => updateElement(sigResp("layout", {
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
                        onChange={(e) => updateElement(sigResp("layout", {
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
                        onChange={(e) => updateElement(sigResp("layout", {
                            fieldWidth: {
                                value: e,
                                unit: element.layout?.fieldWidth?.unit || "px"
                            }
                        }))}
                        onUnitChange={(e) => updateElement(sigResp("layout", {
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
                            onChange={(e) => updateElement(sigResp("advance", {
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
                                onChange={(e) => updateElement(sigResp("advance", {
                                    requiredErrorMessage: e
                                }))}
                            />
                        </BasicShowAnimate>
                    </Stylus.c>
                    <Stylus.c type="Condition">
                        <ConditionBox
                            label="Make the question visible if"
                            value={element.advance?.visibleIf}
                            onChange={(e) => updateElement(sigResp("advance", {
                                visibleIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Disable the read-only mode if"
                            className="mt-5"
                            value={element.advance?.readOnlyModeIf}
                            onChange={(e) => updateElement(sigResp("advance", {
                                readOnlyModeIf: e
                            }))}
                        />
                        <ConditionBox
                            label="Make the question required if"
                            className="mt-5"
                            value={element.advance?.requiredIf}
                            onChange={(e) => updateElement(sigResp("advance", {
                                requiredIf: e
                            }))}
                        />
                    </Stylus.c>
                </Stylus.m>
            </Stylus>
        </Fragment>
    );
};

export default SigStylus;