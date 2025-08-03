"use client"
import { useState, Fragment } from "react";
import { IconCaretRightFilled } from "../../../../icons";
import { produce } from "immer";

//Components
import { BackgroundOption, SelectBox, GroupInput, ColorPicker } from "../../../../components/common/control";
//Store
import { useEditor } from "../../../../context/editor.context";

//Essentials
import { merge, DeepPartial } from "../../../../types/layouts/layout.types";
import { ContainerBlockTypes } from "../../../../types/context/design.types";
import { containResp } from "../../../../utils/container.utils";

const Styles = () => {
    //States
    const [active, setActive] = useState<string | null>("background");

    //Store
    const { design, selected, device } = useEditor();

    //Handler_Helpers
    const findContainer = (nodes: ContainerBlockTypes[]): ContainerBlockTypes | undefined => nodes.reduce<ContainerBlockTypes | undefined>((acc, n) => {
        if (acc) return acc;
        if (n.id === selected.value?.id && n.type === "container") return n;
        if (n.type === "container") return findContainer(n.nodes as ContainerBlockTypes[]);
        return undefined;
    }, undefined);

    const updateContainer = (patch: DeepPartial<Pick<ContainerBlockTypes, "layout" | "style" | "advance">>) => {
        design.setValue(prev =>
            produce(prev, draft => {
                const hit = findContainer(draft.rows);
                if (hit) merge(hit, patch);
            })
        )
    }

    //Handler
    const onActiveChange = (id: string) => {
        setActive(prev => prev === id ? null : id);
    }

    //Target Container
    const target = findContainer(design.value.rows);

    return (
        <div className="mt-4">
            <div className="border-b-2 border-solid border-black/5">
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("background")}>
                    <IconCaretRightFilled size={16} className={`${active === "background" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Background</span>
                </button>
                {active === "background" &&
                    <div className="px-3.5 mb-6 mt-1.5 space-y-5">
                        <BackgroundOption
                            label="Background Type"
                            type={target?.style.background.background_type}
                            onTypeChange={(e) => updateContainer(containResp("style", "background", { background_type: e }))}
                            colorValue={target?.style.background.color || ""}
                            onColorChange={(e) => updateContainer(containResp("style", "background", { color: e }))}
                            imageValue={{
                                url: target?.style.background.image.url || "",
                                alt: target?.style.background.image.props.alt_text || "",
                                caption: target?.style.background.image.props.caption || ""
                            }}
                            onImageChange={(e) => updateContainer(containResp("style", "background", "image", {
                                url: e.url,
                                props: {
                                    alt_text: e.alt,
                                    caption: e.caption
                                }
                            }))}
                        />
                        {target?.style.background.image.url &&
                            <Fragment>
                                <SelectBox
                                    label="Image Size"
                                    options={[
                                        { value: "center center", label: "Default" },
                                        { value: "auto", label: "Auto" },
                                        { value: "cover", label: "Cover" },
                                        { value: "contain", label: "Contain" }
                                    ]}
                                    value={target?.style.background.image.size}
                                    onChange={(e) => updateContainer(containResp("style", "background", "image", { size: e }))}
                                />

                                <SelectBox
                                    label="Position"
                                    value={target?.style.background.image.position}
                                    onChange={(e) => updateContainer(containResp("style", "background", "image", { position: e }))}
                                    options={[
                                        { value: "center center", label: "Center Center" },
                                        { value: "center left", label: "Center Left" },
                                        { value: "center right", label: "Center Right" },
                                        { value: "top center", label: "Top Center" },
                                        { value: "top left", label: "Top Left" },
                                        { value: "top right", label: "Top Right" },
                                        { value: "bottom center", label: "Bottom Center" },
                                        { value: "bottom left", label: "Bottom Left" },
                                        { value: "bottom right", label: "Bottom Right" },
                                    ]}
                                />

                                <SelectBox
                                    label="Repeat"
                                    value={target?.style.background.image.repeat}
                                    onChange={(e) => updateContainer(containResp("style", "background", "image", { repeat: e }))}
                                    options={[
                                        { value: "no-repeat", label: "No Repeat" },
                                        { value: "repeat", label: "Repeat" },
                                        { value: "repeat-x", label: "Repeat-X" },
                                        { value: "repeat-y", label: "Repeat-Y" }
                                    ]}
                                />
                            </Fragment>
                        }
                    </div>
                }
            </div>
            <div>
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("border")}>
                    <IconCaretRightFilled size={16} className={`${active === "border" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Border</span>
                </button>
                {active === "border" &&
                    <div className="px-3.5 mt-2">
                        <SelectBox
                            label="Border type"
                            value={target?.style.border.border_type}
                            onChange={(e) => updateContainer(containResp("style", "border", { border_type: e }))}
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
                                    updateContainer(containResp("style", "border", "border_width", {
                                        [device.value]: {
                                            top: e.value,
                                            left: e.value,
                                            right: e.value,
                                            bottom: e.value
                                        }
                                    }))
                                } else {
                                    updateContainer(containResp("style", "border", "border_width", {
                                        [device.value]: {
                                            [e.direction]: e.value
                                        }
                                    }))
                                }
                            }}
                            unit={target?.style.border.border_width[device.value].unit}
                            onUnitChange={(e) => updateContainer(containResp("style", "border", "border_width", {
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
                            onChange={(e) => updateContainer(containResp("style", "border", { border_color: e }))}
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
                                    updateContainer(containResp("style", "border", "border_radius", {
                                        [device.value]: {
                                            top: e.value,
                                            left: e.value,
                                            right: e.value,
                                            bottom: e.value
                                        }
                                    }))
                                } else {
                                    updateContainer(containResp("style", "border", "border_radius", {
                                        [device.value]: {
                                            [e.direction]: e.value
                                        }
                                    }))
                                }
                            }}
                            unit={target?.style.border.border_radius[device.value].unit}
                            onUnitChange={(e) => updateContainer(containResp("style", "border", "border_radius", {
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