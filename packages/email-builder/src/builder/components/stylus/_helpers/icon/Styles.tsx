"use client"
import { useState } from "react";
import { IconCaretRightFilled } from "../../../../icons";
import { produce } from "immer";

//Components
import { SliderInput, GroupInput } from "../../../../components/common/control";

//Store
import { useEditor } from "../../../../context/editor.context";

//Essentials
import { merge, DeepPartial } from "../../../../types/layouts/layout.types";
import { ContainerBlockTypes, IconBlockTypes, NodesBlockTypes } from "../../../../types/context/design.types";
import { iconResp } from "../../../../utils/icon.utils";

const Styles = () => {
    //States
    const [active, setActive] = useState<string | null>("icon");

    //Store
    const { design, selected, device } = useEditor();

    //Handler_Helpers
    const findIcon = (nodes: NodesBlockTypes[]): IconBlockTypes | undefined => nodes.reduce<IconBlockTypes | undefined>((acc, n) => {
        if (acc) return acc;
        if (n.id === selected.value?.id) return n as IconBlockTypes;
        if (n.type === "container") return findIcon((n as ContainerBlockTypes).nodes);
        return undefined;
    }, undefined);

    const updateIcon = (patch: DeepPartial<Pick<IconBlockTypes, "content" | "style" | "advance">>) => {
        design.setValue(prev =>
            produce(prev, draft => {
                const hit = findIcon(draft.rows);
                if (hit) merge(hit, patch);
            })
        )
    }

    //Handler
    const onActiveChange = (id: string) => {
        setActive(prev => prev === id ? null : id);
    }

    //Target Container
    const target = findIcon(design.value.rows);

    return (
        <div className="mt-4">
            <div className="border-b-2 border-solid border-black/5">
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("icon")}>
                    <IconCaretRightFilled size={16} className={`${active === "icon" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Icon</span>
                </button>
                {active === "icon" &&
                    <div className="px-3.5 mb-6 mt-1.5">
                        <GroupInput
                            label="Border Radius"
                            values={[
                                { value: target?.style.border_radius[device.value].top || "", direction: "top" },
                                { value: target?.style.border_radius[device.value].right || "", direction: "right" },
                                { value: target?.style.border_radius[device.value].bottom || "", direction: "bottom" },
                                { value: target?.style.border_radius[device.value].left || "", direction: "left" },
                            ]}
                            onChange={(e) => {
                                if (e.direction === "all") {
                                    updateIcon(iconResp("style", "border_radius", {
                                        [device.value]: {
                                            top: e.value,
                                            left: e.value,
                                            right: e.value,
                                            bottom: e.value
                                        }
                                    }))
                                } else {
                                    updateIcon(iconResp("style", "border_radius", {
                                        [device.value]: {
                                            [e.direction]: e.value
                                        }
                                    }))
                                }
                            }}
                            unit={target?.style.border_radius[device.value].unit}
                            onUnitChange={(e) => updateIcon(iconResp("style", "border_radius", {
                                [device.value]: {
                                    unit: e
                                }
                            }))}
                            units={["px", "em", "rem"]}
                        />
                        <SliderInput
                            label="Size"
                            value={target?.style.size[device.value].value}
                            onChange={(e) => updateIcon(iconResp("style", "size", {
                                [device.value]: {
                                    value: e
                                }
                            }))}
                            unit={target?.style.size[device.value].unit}
                            onUnitChange={(e) => updateIcon(iconResp("style", "size", {
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
                            label="Rotate"
                            value={target?.style.rotate[device.value].value}
                            onChange={(e) => updateIcon(iconResp("style", "rotate", {
                                [device.value]: {
                                    value: e
                                }
                            }))}
                            unit={target?.style.rotate[device.value].unit}
                            onUnitChange={(e) => updateIcon(iconResp("style", "rotate", {
                                [device.value]: {
                                    unit: e
                                }
                            }))}
                            options={[
                                { unit: "deg", min: 0, max: 360, step: 1 },
                                { unit: "grad", min: 0, max: 400, step: 1 },
                                { unit: "rad", min: 0, max: 6.283, step: 0.001 },
                                { unit: "turn", min: 0, max: 1, step: 0.01 }
                            ]}
                        />
                    </div>
                }
            </div>

        </div>
    );
};

export default Styles;