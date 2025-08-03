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
import { ContainerBlockTypes, TextBlockTypes, NodesBlockTypes } from "../../../../types/context/design.types";
import { textResp } from "../../../../utils/text.utils";

const Styles = () => {
    //States
    const [active, setActive] = useState<string | null>("title");

    //Store
    const { design, selected, device } = useEditor();

    //Handler_Helpers
    const findText = (nodes: NodesBlockTypes[]): TextBlockTypes | undefined => nodes.reduce<TextBlockTypes | undefined>((acc, n) => {
        if (acc) return acc;
        if (n.id === selected.value?.id) return n as TextBlockTypes;
        if (n.type === "container") return findText((n as ContainerBlockTypes).nodes);
        return undefined;
    }, undefined);

    const updateText = (patch: DeepPartial<Pick<TextBlockTypes, "content" | "style" | "advance">>) => {
        design.setValue(prev =>
            produce(prev, draft => {
                const hit = findText(draft.rows);
                if (hit) merge(hit, patch);
            })
        )
    }

    //Handler
    const onActiveChange = (id: string) => {
        setActive(prev => prev === id ? null : id);
    }

    //Target Container
    const target = findText(design.value.rows);

    return (
        <div className="mt-4">
            <div className="border-b-2 border-solid border-black/5">
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("title")}>
                    <IconCaretRightFilled size={16} className={`${active === "title" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Title</span>
                </button>
                {active === "title" &&
                    <div className="px-3.5 mb-6 space-y-5">
                        <IconButton
                            label="Alignment"
                            iconSets="alignment"
                            value={target?.style.alignment[device.value]}
                            onChange={(e) => updateText(textResp("style", "alignment", {
                                [device.value]: e
                            }))}
                        />

                        <ColorPicker
                            label="Text Color"
                            value={target?.style.text_color}
                            onChange={(e) => updateText(textResp("style", { text_color: e }))}
                        />
                        <OptionGroup
                            label="Typography"
                        >
                            <SelectBox
                                label="Font Family"
                                value={target?.style.typography.family}
                                onChange={(e) => updateText(textResp("style", "typography", { family: e }))}
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
                                onChange={(e) => updateText(textResp("style", "typography", "size", {
                                    [device.value]: {
                                        value: e
                                    }
                                }))}
                                unit={target?.style.typography.size[device.value].unit}
                                onUnitChange={(e) => updateText(textResp("style", "typography", "size", {
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
                                onChange={(e) => updateText(textResp("style", "typography", { weight: e }))}
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
                                onChange={(e) => updateText(textResp("style", "typography", { transform: e }))}
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
                                onChange={(e) => updateText(textResp("style", "typography", { style: e }))}
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
                                onChange={(e) => updateText(textResp("style", "typography", { decoration: e }))}
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
                                onChange={(e) => updateText(textResp("style", "typography", "line_height", {
                                    [device.value]: {
                                        value: e
                                    }
                                }))}
                                unit={target?.style.typography.line_height[device.value].unit}
                                onUnitChange={(e) => updateText(textResp("style", "typography", "line_height", {
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
                                onChange={(e) => updateText(textResp("style", "typography", "letter_spacing", {
                                    [device.value]: {
                                        value: e
                                    }
                                }))}
                                unit={target?.style.typography.letter_spacing[device.value].unit}
                                onUnitChange={(e) => updateText(textResp("style", "typography", "letter_spacing", {
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
                                onChange={(e) => updateText(textResp("style", "typography", "word_spacing", {
                                    [device.value]: {
                                        value: e
                                    }
                                }))}
                                unit={target?.style.typography.word_spacing[device.value].unit}
                                onUnitChange={(e) => updateText(textResp("style", "typography", "word_spacing", {
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
                    </div>
                }
            </div>
        </div>
    );
};

export default Styles;