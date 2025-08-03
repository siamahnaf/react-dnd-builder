"use client"
import { useState } from "react";
import { IconCaretRightFilled } from "../../../../icons";
import { produce } from "immer";

//Components
import { ColorPicker, GroupInput, SelectBox, SliderInput } from "../../../../components/common/control";
//Store
import { useEditor } from "../../../../context/editor.context";

//Essentials
import { merge, DeepPartial } from "../../../../types/layouts/layout.types";
import { ContainerBlockTypes, ImageBlockTypes, NodesBlockTypes } from "../../../../types/context/design.types";
import { imgResp } from "../../../../utils/image.utils";

const Styles = () => {
    //States
    const [active, setActive] = useState<string | null>("image");

    //Store
    const { design, selected, device } = useEditor();

    //Handler_Helpers
    const findImg = (nodes: NodesBlockTypes[]): ImageBlockTypes | undefined => nodes.reduce<ImageBlockTypes | undefined>((acc, n) => {
        if (acc) return acc;
        if (n.id === selected.value?.id) return n as ImageBlockTypes;
        if (n.type === "container") return findImg((n as ContainerBlockTypes).nodes);
        return undefined;
    }, undefined);

    const updateImg = (patch: DeepPartial<Pick<ImageBlockTypes, "content" | "style" | "advance">>) => {
        design.setValue(prev =>
            produce(prev, draft => {
                const hit = findImg(draft.rows);
                if (hit) merge(hit, patch);
            })
        )
    }

    //Handler
    const onActiveChange = (id: string) => {
        setActive(prev => prev === id ? null : id);
    }

    //Target Container
    const target = findImg(design.value.rows);

    return (
        <div className="mt-4">
            <div className="border-b-2 border-solid border-black/5">
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("image")}>
                    <IconCaretRightFilled size={16} className={`${active === "image" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Image</span>
                </button>
                {active === "image" &&
                    <div className="px-3.5 mb-6 space-y-5">
                        <SliderInput
                            label="Width"
                            value={target?.style.width[device.value].value}
                            onChange={(e) => updateImg(imgResp("style", "width", {
                                [device.value]: {
                                    value: e
                                }
                            }))}
                            unit={target?.style.width[device.value].unit}
                            onUnitChange={(e) => updateImg(imgResp("style", "width", {
                                [device.value]: {
                                    unit: e
                                }
                            }))}
                            options={[
                                { unit: "%", min: 1, max: 100, step: 1 },
                                { unit: "px", min: 1, max: 1000, step: 1 },
                                { unit: "em", min: 1, max: 10, step: 0.1 },
                                { unit: "rem", min: 1, max: 10, step: 0.1 },
                            ]}
                        />
                        <SliderInput
                            label="Height"
                            value={target?.style.height[device.value].value}
                            onChange={(e) => updateImg(imgResp("style", "height", {
                                [device.value]: {
                                    value: e
                                }
                            }))}
                            unit={target?.style.height[device.value].unit}
                            onUnitChange={(e) => updateImg(imgResp("style", "height", {
                                [device.value]: {
                                    unit: e
                                }
                            }))}
                            options={[
                                { unit: "%", min: 1, max: 100, step: 1 },
                                { unit: "px", min: 1, max: 1000, step: 1 },
                                { unit: "em", min: 1, max: 10, step: 0.1 },
                                { unit: "rem", min: 1, max: 10, step: 0.1 },
                            ]}
                        />
                        <SelectBox
                            label="Object Fit"
                            value={target?.style.object_fit[device.value]}
                            onChange={(e) => updateImg(imgResp("style", "object_fit", {
                                [device.value]: e
                            }))}
                            options={[
                                { value: "", label: "Default" },
                                { value: "fill", label: "Cover" },
                                { value: "contain", label: "Content" },
                                { value: "cover", label: "Cover" }
                            ]}
                            isDevice
                        />
                        <div className="mt-6" />
                        <SliderInput
                            label="Opacity"
                            value={target?.style.opacity}
                            onChange={(e) => updateImg(imgResp("style", {
                                opacity: e
                            }))}
                            isDevice={false}
                            options={{
                                min: 0,
                                max: 1,
                                step: 0.01
                            }}
                        />
                        <hr className="border-gray-100 my-6" />
                        <SelectBox
                            label="Border type"
                            value={target?.style.border.border_type}
                            onChange={(e) => updateImg(imgResp("style", "border", { border_type: e }))}
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
                                    updateImg(imgResp("style", "border", "border_width", {
                                        [device.value]: {
                                            top: e.value,
                                            left: e.value,
                                            right: e.value,
                                            bottom: e.value
                                        }
                                    }))
                                } else {
                                    updateImg(imgResp("style", "border", "border_width", {
                                        [device.value]: {
                                            [e.direction]: e.value
                                        }
                                    }))
                                }
                            }}
                            unit={target?.style.border.border_width[device.value].unit}
                            onUnitChange={(e) => updateImg(imgResp("style", "border", "border_width", {
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
                            onChange={(e) => updateImg(imgResp("style", "border", { border_color: e }))}
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
                                    updateImg(imgResp("style", "border", "border_radius", {
                                        [device.value]: {
                                            top: e.value,
                                            left: e.value,
                                            right: e.value,
                                            bottom: e.value
                                        }
                                    }))
                                } else {
                                    updateImg(imgResp("style", "border", "border_radius", {
                                        [device.value]: {
                                            [e.direction]: e.value
                                        }
                                    }))
                                }
                            }}
                            unit={target?.style.border.border_radius[device.value].unit}
                            onUnitChange={(e) => updateImg(imgResp("style", "border", "border_radius", {
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