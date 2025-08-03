"use client"
import { useState } from "react";
import { IconCaretRightFilled } from "../../../../icons";
import { produce } from "immer";

//Components
import { ColorPicker, OptionGroup, SelectBox, SliderInput, IconButton } from "../../../../components/common/control";
//Store
import { useEditor } from "../../../../context/editor.context";

//Essentials
import { merge, DeepPartial } from "../../../../types/layouts/layout.types";
import { ContainerBlockTypes, DividerBlockTypes, NodesBlockTypes } from "../../../../types/context/design.types";
import { divideResp } from "../../../../utils/divider.utils";

const Styles = () => {
    //States
    const [active, setActive] = useState<string | null>("divider");

    //Store
    const { design, selected, device } = useEditor();

    //Handler_Helpers
    const findDivider = (nodes: NodesBlockTypes[]): DividerBlockTypes | undefined => nodes.reduce<DividerBlockTypes | undefined>((acc, n) => {
        if (acc) return acc;
        if (n.id === selected.value?.id) return n as DividerBlockTypes;
        if (n.type === "container") return findDivider((n as ContainerBlockTypes).nodes);
        return undefined;
    }, undefined);

    const updateDivider = (patch: DeepPartial<Pick<DividerBlockTypes, "content" | "style" | "advance">>) => {
        design.setValue(prev =>
            produce(prev, draft => {
                const hit = findDivider(draft.rows);
                if (hit) merge(hit, patch);
            })
        )
    }

    //Handler
    const onActiveChange = (id: string) => {
        setActive(prev => prev === id ? null : id);
    }

    //Target Container
    const target = findDivider(design.value.rows);

    return (
        <div className="mt-4">
            <div className="border-b-2 border-solid border-black/5">
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("divider")}>
                    <IconCaretRightFilled size={16} className={`${active === "divider" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Divider</span>
                </button>
                {active === "divider" &&
                    <div className="px-3.5 mb-6 space-y-5">
                        <ColorPicker
                            label="Color"
                            value={target?.style.divider.color || ""}
                            onChange={(e) => updateDivider(divideResp("style", "divider", { color: e }))}
                        />
                        <SliderInput
                            label="Weight"
                            value={target?.style.divider.weight}
                            onChange={(e) => updateDivider(divideResp("style", "divider", { weight: e }))}
                            isDevice={false}
                        />
                        <hr className="border-gray-100" />
                        <SliderInput
                            label="Gap"
                            value={target?.style.divider.gap[device.value]}
                            onChange={(e) => updateDivider(divideResp("style", "divider", "gap", {
                                [device.value]: e
                            }))}
                        />
                    </div>
                }
            </div>
            {target?.content.element_type === "text" &&
                <div className="border-b-2 border-solid border-black/5">
                    <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("text")}>
                        <IconCaretRightFilled size={16} className={`${active === "text" ? "rotate-90" : "rotate-0"}`} />
                        <span className="text-sm font-medium text-gray-700">Text</span>
                    </button>
                    {active === "text" &&
                        <div className="px-3.5 mb-6 space-y-5">
                            <ColorPicker
                                label="Color"
                                value={target?.style.text.color || ""}
                                onChange={(e) => updateDivider(divideResp("style", "text", { color: e }))}
                            />
                            <OptionGroup
                                label="Typography"
                            >
                                <SelectBox
                                    label="Font Family"
                                    value={target?.style.text.typography.family}
                                    onChange={(e) => updateDivider(divideResp("style", "text", "typography", { family: e }))}
                                    options={[
                                        { value: "roboto", label: "Roboto" },
                                        { value: "roboto condensed", label: "Roboto Condensed" },
                                        { value: "roboto flex", label: "Roboto Flex" },
                                        { value: "roboto mono", label: "Roboto Mono" }
                                    ]}
                                />
                                <SliderInput
                                    label="Font Size"
                                    value={target?.style.text.typography.size[device.value].value}
                                    onChange={(e) => updateDivider(divideResp("style", "text", "typography", {
                                        size: {
                                            [device.value]: {
                                                value: e
                                            }
                                        }
                                    }))}
                                    unit={target?.style.text.typography.size[device.value].unit}
                                    onUnitChange={(e) => updateDivider(divideResp("style", "text", "typography", {
                                        size: {
                                            [device.value]: {
                                                unit: e
                                            }
                                        }
                                    }))}
                                    options={[
                                        { unit: "px", min: 1, max: 200, step: 1 },
                                        { unit: "em", min: 1, max: 10, step: 0.1 },
                                        { unit: "rem", min: 1, max: 10, step: 0.1 },
                                    ]}
                                />
                                <div className="mt-5" />
                                <SelectBox
                                    label="Font Weight"
                                    value={target?.style.text.typography.weight}
                                    onChange={(e) => updateDivider(divideResp("style", "text", "typography", { weight: e }))}
                                    options={[
                                        { value: "100", label: "100 (Thin)" },
                                        { value: "200", label: "200 (Extra Light)" },
                                        { value: "300", label: "300 (Light)" },
                                        { value: "400", label: "400 (Normal)" },
                                        { value: "500", label: "500 (Medium)" },
                                        { value: "600", label: "600 (Semi Bold)" },
                                        { value: "700", label: "700 (Bold)" },
                                        { value: "800", label: "800 (Extra Bold)" },
                                        { value: "900", label: "900 (Black)" },
                                        { value: "400", label: "Default" },
                                        { value: "400", label: "Normal" },
                                        { value: "700", label: "Bold" }
                                    ]}
                                />
                                <div className="mt-5" />
                                <SelectBox
                                    label="Transform"
                                    value={target?.style.text.typography.transform}
                                    onChange={(e) => updateDivider(divideResp("style", "text", "typography", { transform: e }))}
                                    options={[
                                        { value: "", label: "Default" },
                                        { value: "uppercase", label: "Uppercase" },
                                        { value: "lowercase", label: "Lowercase" },
                                        { value: "capitalize", label: "Capitalize" },
                                        { value: "", label: "Normal" }
                                    ]}
                                />
                                <div className="mt-5" />
                                <SelectBox
                                    label="Style"
                                    value={target?.style.text.typography.style}
                                    onChange={(e) => updateDivider(divideResp("style", "text", "typography", { style: e }))}
                                    options={[
                                        { value: "", label: "Default" },
                                        { value: "normal", label: "Normal" },
                                        { value: "italic", label: "Italic" },
                                        { value: "oblique", label: "Oblique" }
                                    ]}
                                />
                                <div className="mt-5" />
                                <SelectBox
                                    label="Decorations"
                                    value={target?.style.text.typography.decoration}
                                    onChange={(e) => updateDivider(divideResp("style", "text", "typography", { decoration: e }))}
                                    options={[
                                        { value: "", label: "Default" },
                                        { value: "underline", label: "Underline" },
                                        { value: "overline", label: "Overline" },
                                        { value: "line-through", label: "Line Through" },
                                        { value: "", label: "None" }
                                    ]}
                                />
                                <SliderInput
                                    label="Line Height"
                                    value={target?.style.text.typography.line_height[device.value].value}
                                    onChange={(e) => updateDivider(divideResp("style", "text", "typography", {
                                        line_height: {
                                            [device.value]: {
                                                value: e
                                            }
                                        }
                                    }))}
                                    unit={target?.style.text.typography.line_height[device.value].unit}
                                    onUnitChange={(e) => updateDivider(divideResp("style", "text", "typography", {
                                        line_height: {
                                            [device.value]: {
                                                unit: e
                                            }
                                        }
                                    }))}
                                    options={[
                                        { unit: "px", min: 1, max: 200, step: 1 },
                                        { unit: "em", min: 1, max: 10, step: 0.1 },
                                        { unit: "rem", min: 1, max: 10, step: 0.1 },
                                    ]}
                                />
                                <SliderInput
                                    label="Letter Spacing"
                                    value={target?.style.text.typography.letter_spacing[device.value].value}
                                    onChange={(e) => updateDivider(divideResp("style", "text", "typography", {
                                        letter_spacing: {
                                            [device.value]: {
                                                value: e
                                            }
                                        }
                                    }))}
                                    unit={target?.style.text.typography.letter_spacing[device.value].unit}
                                    onUnitChange={(e) => updateDivider(divideResp("style", "text", "typography", {
                                        letter_spacing: {
                                            [device.value]: {
                                                unit: e
                                            }
                                        }
                                    }))}
                                    options={[
                                        { unit: "px", min: 1, max: 200, step: 1 },
                                        { unit: "em", min: 1, max: 10, step: 0.1 },
                                        { unit: "rem", min: 1, max: 10, step: 0.1 },
                                    ]}
                                />
                                <SliderInput
                                    label="Word Spacing"
                                    value={target?.style.text.typography.word_spacing[device.value].value}
                                    onChange={(e) => updateDivider(divideResp("style", "text", "typography", {
                                        word_spacing: {
                                            [device.value]: {
                                                value: e
                                            }
                                        }
                                    }))}
                                    unit={target?.style.text.typography.word_spacing[device.value].unit}
                                    onUnitChange={(e) => updateDivider(divideResp("style", "text", "typography", {
                                        word_spacing: {
                                            [device.value]: {
                                                unit: e
                                            }
                                        }
                                    }))}
                                    options={[
                                        { unit: "px", min: 1, max: 200, step: 1 },
                                        { unit: "em", min: 1, max: 10, step: 0.1 },
                                        { unit: "rem", min: 1, max: 10, step: 0.1 },
                                    ]}
                                />
                            </OptionGroup>
                            <IconButton
                                label="Position"
                                value={target.style.text.position}
                                onChange={(e) => updateDivider(divideResp("style", "text", { position: e }))}
                                iconSets="dividePosition"
                                isDevice={false}
                            />
                            <SliderInput
                                label="Spacing"
                                value={target?.style.text.spacing[device.value]}
                                onChange={(e) => updateDivider(divideResp("style", "text", "spacing", {
                                    [device.value]: e
                                }))}
                            />
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default Styles;