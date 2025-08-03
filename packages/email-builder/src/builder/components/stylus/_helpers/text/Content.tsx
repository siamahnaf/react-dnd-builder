"use client"
import { useState } from "react";
import { IconCaretRightFilled } from "../../../../icons";
import { produce } from "immer";

//Components
import { TextareaBox, SliderInput, SelectBox } from "../../../../components/common/control";

//Store
import { useEditor } from "../../../../context/editor.context";

//Essentials
import { merge, DeepPartial } from "../../../../types/layouts/layout.types";
import { ContainerBlockTypes, TextBlockTypes, NodesBlockTypes } from "../../../../types/context/design.types";
import { textResp } from "../../../../utils/text.utils";

const Content = () => {
    //States
    const [active, setActive] = useState<string | null>("content");

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
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("content")}>
                    <IconCaretRightFilled size={16} className={`${active === "content" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Text Editor</span>
                </button>
                {active === "content" &&
                    <div className="px-3.5 mb-6 mt-1.5">
                        <TextareaBox
                            value={target?.content.content}
                            onChange={(e) => updateText(textResp("content", { content: e }))}
                            rows={6}
                        />
                        <div className="mt-4" />
                        <SelectBox
                            label="Columns"
                            value={target?.content.column[device.value]}
                            onChange={(e) => updateText(textResp("content", "column", {
                                [device.value]: e
                            }))}
                            options={[
                                { value: "1", label: "1" },
                                { value: "2", label: "2" },
                                { value: "3", label: "3" },
                                { value: "4", label: "4" },
                                { value: "5", label: "5" },
                                { value: "6", label: "6" },
                                { value: "7", label: "7" },
                                { value: "8", label: "8" },
                                { value: "9", label: "9" },
                                { value: "10", label: "10" },
                                { value: "", label: "Default" }
                            ]}
                            isDevice
                        />
                        <SliderInput
                            label="Column Gap"
                            value={target?.content.column_gaps[device.value].value}
                            onChange={(e) => updateText(textResp("content", "column_gaps", {
                                [device.value]: {
                                    value: e
                                }
                            }))}
                            unit={target?.content.column_gaps[device.value].unit}
                            onUnitChange={(e) => updateText(textResp("content", "column_gaps", {
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
                    </div>
                }
            </div>

        </div>
    );
};

export default Content;