"use client"
import { useState } from "react";
import { IconCaretRightFilled } from "../../../../icons";
import { produce } from "immer";

//Components
import { InputBox, SelectBox, IconButton, SliderInput } from "../../../../components/common/control";

//Store
import { useEditor } from "../../../../context/editor.context";

//Essentials
import { merge, DeepPartial } from "../../../../types/layouts/layout.types";
import { ContainerBlockTypes, DividerBlockTypes, NodesBlockTypes } from "../../../../types/context/design.types";
import { divideResp } from "../../../../utils/divider.utils";

const Content = () => {
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
                    <div className="px-3.5 mb-6 mt-1.5">
                        <SelectBox
                            label="Style"
                            value={target?.content.style}
                            onChange={(e) => updateDivider(divideResp("content", { style: e }))}
                            options={[
                                { value: "solid", label: "Solid" },
                                { value: "dotted", label: "Dotted" },
                                { value: "dashed", label: "Dashed" },
                            ]}
                        />
                        <SliderInput
                            label="Width"
                            value={target?.content.width[device.value].value}
                            onChange={(e) => updateDivider(divideResp("content", "width", {
                                [device.value]: {
                                    value: e
                                }
                            }))}
                            unit={target?.content.width[device.value].unit}
                            onUnitChange={(e) => updateDivider(divideResp("content", "width", {
                                [device.value]: {
                                    unit: e
                                }
                            }))}
                            options={[
                                { unit: "px", min: 300, max: 600, step: 1 },
                                { unit: "%", min: 0, max: 100, step: 1 },
                                { unit: "em", min: 0, max: 5, step: 0.1 },
                                { unit: "rem", min: 0, max: 5, step: 0.1 }
                            ]}
                        />
                        <IconButton
                            label="Alignment"
                            iconSets="imgAlign"
                            value={target?.content.alignment[device.value]}
                            onChange={(e) => updateDivider(divideResp("content", "alignment", {
                                [device.value]: e
                            }))}
                        />
                        <hr className="border-gray-100 my-5" />
                        <IconButton
                            label="Add Element"
                            iconSets="divideEl"
                            value={target?.content.element_type}
                            onChange={(e) => updateDivider(divideResp("content", {
                                element_type: e
                            }))}
                            isDevice={false}
                        />
                        {target?.content.element_type === "text" &&
                            <InputBox
                                label="Text"
                                value={target.content.text}
                                onChange={(e) => updateDivider(divideResp("content", { text: e }))}
                            />
                        }
                    </div>
                }
            </div>

        </div>
    );
};

export default Content;