"use client"
import { useState } from "react";
import { IconCaretRightFilled } from "../../../../icons";
import { produce } from "immer";

//Components
import { ColorPicker, OptionGroup, SelectBox, SliderInput, GroupInput } from "../../../../components/common/control";
//Store
import { useEditor } from "../../../../context/editor.context";

//Essentials
import { merge, DeepPartial } from "../../../../types/layouts/layout.types";
import { ContainerBlockTypes, ButtonBlockTypes, NodesBlockTypes } from "../../../../types/context/design.types";
import { btnResp } from "../../../../utils/button.utils";

const Styles = () => {
    //States
    const [active, setActive] = useState<string | null>("button");

    //Store
    const { design, selected, device } = useEditor();

    //Handler_Helpers
    const findButton = (nodes: NodesBlockTypes[]): ButtonBlockTypes | undefined => nodes.reduce<ButtonBlockTypes | undefined>((acc, n) => {
        if (acc) return acc;
        if (n.id === selected.value?.id) return n as ButtonBlockTypes;
        if (n.type === "container") return findButton((n as ContainerBlockTypes).nodes);
        return undefined;
    }, undefined);

    const updateBtn = (patch: DeepPartial<Pick<ButtonBlockTypes, "content" | "style" | "advance">>) => {
        design.setValue(prev =>
            produce(prev, draft => {
                const hit = findButton(draft.rows);
                if (hit) merge(hit, patch);
            })
        )
    }

    //Handler
    const onActiveChange = (id: string) => {
        setActive(prev => prev === id ? null : id);
    }

    //Target Container
    const target = findButton(design.value.rows);

    return (
        <div className="mt-4">
            <div className="border-b-2 border-solid border-black/5">
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("button")}>
                    <IconCaretRightFilled size={16} className={`${active === "button" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Button</span>
                </button>
                {active === "button" &&
                    <div className="px-3.5 mb-6 space-y-5">
                        <OptionGroup
                            label="Typography"
                        >
                            <SelectBox
                                label="Font Family"
                                value={target?.style.typography.family}
                                onChange={(e) => updateBtn(btnResp("style", "typography", { family: e }))}
                                options={[
                                    { value: "roboto", label: "Roboto" },
                                    { value: "roboto condensed", label: "Roboto Condensed" },
                                    { value: "roboto flex", label: "Roboto Flex" },
                                    { value: "roboto mono", label: "Roboto Mono" }
                                ]}
                            />
                            <SliderInput
                                label="Font Size"
                                value={target?.style.typography.size[device.value].value}
                                onChange={(e) => updateBtn(btnResp("style", "typography", "size", {
                                    [device.value]: {
                                        value: e
                                    }
                                }))}
                                unit={target?.style.typography.size[device.value].unit}
                                onUnitChange={(e) => updateBtn(btnResp("style", "typography", "size", {
                                    [device.value]: {
                                        unit: e
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
                                value={target?.style.typography.weight}
                                onChange={(e) => updateBtn(btnResp("style", "typography", { weight: e }))}
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
                                value={target?.style.typography.transform}
                                onChange={(e) => updateBtn(btnResp("style", "typography", { transform: e }))}
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
                                value={target?.style.typography.style}
                                onChange={(e) => updateBtn(btnResp("style", "typography", { style: e }))}
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
                                value={target?.style.typography.decoration}
                                onChange={(e) => updateBtn(btnResp("style", "typography", { decoration: e }))}
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
                                value={target?.style.typography.line_height[device.value].value}
                                onChange={(e) => updateBtn(btnResp("style", "typography", "line_height", {
                                    [device.value]: {
                                        value: e
                                    }
                                }))}
                                unit={target?.style.typography.line_height[device.value].unit}
                                onUnitChange={(e) => updateBtn(btnResp("style", "typography", "line_height", {
                                    [device.value]: {
                                        unit: e
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
                                value={target?.style.typography.letter_spacing[device.value].value}
                                onChange={(e) => updateBtn(btnResp("style", "typography", "letter_spacing", {
                                    [device.value]: {
                                        value: e
                                    }
                                }))}
                                unit={target?.style.typography.letter_spacing[device.value].unit}
                                onUnitChange={(e) => updateBtn(btnResp("style", "typography", "letter_spacing", {
                                    [device.value]: {
                                        unit: e
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
                                value={target?.style.typography.word_spacing[device.value].value}
                                onChange={(e) => updateBtn(btnResp("style", "typography", "word_spacing", {
                                    [device.value]: {
                                        value: e
                                    }
                                }))}
                                unit={target?.style.typography.word_spacing[device.value].unit}
                                onUnitChange={(e) => updateBtn(btnResp("style", "typography", "word_spacing", {
                                    [device.value]: {
                                        unit: e
                                    }
                                }))}
                                options={[
                                    { unit: "px", min: 1, max: 200, step: 1 },
                                    { unit: "em", min: 1, max: 10, step: 0.1 },
                                    { unit: "rem", min: 1, max: 10, step: 0.1 },
                                ]}
                            />
                        </OptionGroup>
                        <ColorPicker
                            label="Text Color"
                            value={target?.style.basic_style.text_color}
                            onChange={(e) => updateBtn(btnResp("style", "basic_style", { text_color: e }))}
                        />
                        <ColorPicker
                            label="Background Color"
                            value={target?.style.basic_style.background_color}
                            onChange={(e) => updateBtn(btnResp("style", "basic_style", { background_color: e }))}
                        />
                        <SelectBox
                            label="Border type"
                            value={target?.style.border.border_type}
                            onChange={(e) => updateBtn(btnResp("style", "border", { border_type: e }))}
                            options={[
                                { value: "", label: "Default" },
                                { value: "none", label: "None" },
                                { value: "solid", label: "Solid" },
                                { value: "double", label: "Double" },
                                { value: "dotted", label: "Dotted" },
                                { value: "dashed", label: "Dashed" },
                                { value: "groove", label: "Groove" }
                            ]}
                        />
                        <GroupInput
                            label="Border Width"
                            values={[
                                { value: target?.style.border.border_width[device.value].top || "", direction: "top" },
                                { value: target?.style.border.border_width[device.value].right || "", direction: "right" },
                                { value: target?.style.border.border_width[device.value].bottom || "", direction: "bottom" },
                                { value: target?.style.border.border_width[device.value].left || "", direction: "left" }
                            ]}
                            onChange={(e) => {
                                if (e.direction === "all") {
                                    updateBtn(btnResp("style", "border", "border_width", {
                                        [device.value]: {
                                            top: e.value,
                                            left: e.value,
                                            right: e.value,
                                            bottom: e.value
                                        }
                                    }))
                                } else {
                                    updateBtn(btnResp("style", "border", "border_width", {
                                        [device.value]: {
                                            [e.direction]: e.value
                                        }
                                    }))
                                }
                            }}
                            unit={target?.style.border.border_width[device.value].unit}
                            onUnitChange={(e) => updateBtn(btnResp("style", "border", "border_width", {
                                [device.value]: {
                                    unit: e
                                }
                            }))}
                            units={["px", "em", "rem"]}
                        />
                        <div className="mt-6" />
                        <ColorPicker
                            label="Border Color"
                            value={target?.style.border.border_color}
                            onChange={(e) => updateBtn(btnResp("style", "border", { border_color: e }))}
                        />
                        <GroupInput
                            label="Border Radius"
                            values={[
                                { value: target?.style.border.border_radius[device.value].top || "", direction: "top" },
                                { value: target?.style.border.border_radius[device.value].right || "", direction: "right" },
                                { value: target?.style.border.border_radius[device.value].bottom || "", direction: "bottom" },
                                { value: target?.style.border.border_radius[device.value].left || "", direction: "left" },
                            ]}
                            onChange={(e) => {
                                if (e.direction === "all") {
                                    updateBtn(btnResp("style", "border", "border_radius", {
                                        [device.value]: {
                                            top: e.value,
                                            left: e.value,
                                            right: e.value,
                                            bottom: e.value
                                        }
                                    }))
                                } else {
                                    updateBtn(btnResp("style", "border", "border_radius", {
                                        [device.value]: {
                                            [e.direction]: e.value
                                        }
                                    }))
                                }
                            }}
                            unit={target?.style.border.border_radius[device.value].unit}
                            onUnitChange={(e) => updateBtn(btnResp("style", "border", "border_radius", {
                                [device.value]: {
                                    unit: e
                                }
                            }))}
                            units={["px", "em", "rem"]}
                        />
                        <hr className="border-gray-100 my-5" />
                        <GroupInput
                            label="Padding"
                            values={[
                                { value: target?.style.padding[device.value].top || "", direction: "top" },
                                { value: target?.style.padding[device.value].right || "", direction: "right" },
                                { value: target?.style.padding[device.value].bottom || "", direction: "bottom" },
                                { value: target?.style.padding[device.value].left || "", direction: "left" },
                            ]}
                            onChange={(e) => {
                                if (e.direction === "all") {
                                    updateBtn(btnResp("style", "padding", {
                                        [device.value]: {
                                            top: e.value,
                                            left: e.value,
                                            right: e.value,
                                            bottom: e.value
                                        }
                                    }))
                                } else {
                                    updateBtn(btnResp("style", "padding", {
                                        [device.value]: {
                                            [e.direction]: e.value
                                        }
                                    }))
                                }
                            }}
                            unit={target?.style.padding[device.value].unit}
                            onUnitChange={(e) => updateBtn(btnResp("style", "padding", {
                                [device.value]: {
                                    unit: e
                                }
                            }))}
                            units={["px", "em", "rem"]}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default Styles;