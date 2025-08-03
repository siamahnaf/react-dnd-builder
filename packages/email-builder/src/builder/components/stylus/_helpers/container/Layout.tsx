"use client"
import { Fragment, useState } from "react";
import { IconCaretRightFilled } from "../../../../icons";
import { produce } from "immer";

//Components
import { SelectBox, SliderInput, IconButton, IconFlowButton, GroupInput, GridSelector } from "../../../../components/common/control";

//Store
import { useEditor } from "../../../../context/editor.context";

//Essentials
import { merge, DeepPartial } from "../../../../types/layouts/layout.types";
import { ContainerBlockTypes } from "../../../../types/context/design.types";
import { containResp } from "../../../../utils/container.utils";

const Layout = () => {
    //States
    const [active, setActive] = useState<string | null>("container");

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
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("container")}>
                    <IconCaretRightFilled size={16} className={`${active === "container" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Container</span>
                </button>
                {active === "container" &&
                    <div className="px-3.5 mb-6 mt-1.5">
                        <SliderInput
                            label="Width"
                            value={target?.layout.container.width[device.value].value}
                            onChange={(e) => updateContainer(containResp("layout", "container", "width", {
                                [device.value]: {
                                    value: e
                                }
                            }))}
                            unit={target?.layout.container.width[device.value].unit}
                            onUnitChange={(e) => updateContainer(containResp("layout", "container", "width", {
                                [device.value]: {
                                    unit: e
                                }
                            }))}
                            options={[
                                { unit: "px", min: 300, max: 600, step: 1 },
                                { unit: "%", min: 0, max: 100, step: 1 },
                                { unit: "em", min: 0, max: 5, step: 0.1 },
                                { unit: "rem", min: 0, max: 5, step: 0.1 },
                                { unit: "vw", min: 0, max: 100, step: 1 }
                            ]}
                        />
                        <SliderInput
                            label="Height"
                            value={target?.layout.container.min_height[device.value].value}
                            onChange={(e) => updateContainer(containResp("layout", "container", "min_height", {
                                [device.value]: {
                                    value: e
                                }
                            }))}
                            unit={target?.layout.container.min_height[device.value].unit}
                            onUnitChange={(e) => updateContainer(containResp("layout", "container", "min_height", {
                                [device.value]: {
                                    unit: e
                                }
                            }))}
                            options={[
                                { unit: "px", min: 0, max: 1440, step: 1 },
                                { unit: "em", min: 0, max: 10, step: 0.1 },
                                { unit: "rem", min: 0, max: 10, step: 0.1 },
                                { unit: "vh", min: 0, max: 100, step: 1 }
                            ]}
                        />
                        <p className="text-sm mt-4 text-gray-600 italic font-light">To achieve full height Container use 100vh.</p>
                        <div className="mt-6" />
                        <SelectBox
                            label="Display Type"
                            value={target?.layout.container.display_type[device.value]}
                            onChange={(e) => updateContainer(containResp("layout", "container", "display_type", {
                                [device.value]: e
                            }))}
                            options={[
                                { value: "inline-block", label: "Inline Block" },
                                { value: "block", label: "Block" },
                                { value: "flex", label: "Flex" },
                                { value: "grid", label: "Grid" },
                            ]}
                        />
                        {target?.layout.container.display_type[device.value] === "flex" &&
                            <IconButton
                                label="Flex Direction"
                                value={target?.layout.container.display_direction[device.value]}
                                onChange={(e) => updateContainer(containResp("layout", "container", "display_direction", {
                                    [device.value]: e
                                }))}
                            />
                        }
                        {target?.layout.container.display_type[device.value] === "grid" &&
                            <GridSelector
                                label="Grid Template"
                                value={target.layout.container.grid_type[device.value]}
                                onChange={(e) => updateContainer(containResp("layout", "container", "grid_type", {
                                    [device.value]: e
                                }))}
                            />
                        }
                        {(target?.layout.container.display_type[device.value] === "grid" || target?.layout.container.display_type[device.value] === "flex") &&
                            <Fragment>
                                <IconFlowButton
                                    label="Justify Content"
                                    value={target?.layout.container.justify_content[device.value]}
                                    onChange={(e) => updateContainer(containResp("layout", "container", "justify_content", {
                                        [device.value]: e
                                    }))}
                                />
                                <IconButton
                                    label="Align Items"
                                    iconSets="aligns"
                                    value={target?.layout.container.align_items[device.value]}
                                    onChange={(e) => updateContainer(containResp("layout", "container", "align_items", {
                                        [device.value]: e
                                    }))}
                                />
                                <GroupInput
                                    label="Gap"
                                    values={[
                                        { value: target?.layout.container.gaps[device.value].column || "", direction: "column" },
                                        { value: target?.layout.container.gaps[device.value].row || "", direction: "row" },
                                    ]}
                                    onChange={(e) => {
                                        if (e.direction === "all") {
                                            updateContainer(containResp("layout", "container", "gaps", {
                                                [device.value]: {
                                                    column: e.value,
                                                    row: e.value
                                                }
                                            }))
                                        } else {
                                            updateContainer(containResp("layout", "container", "gaps", {
                                                [device.value]: {
                                                    [e.direction]: e.value
                                                }
                                            }))
                                        }
                                    }}
                                    unit={target?.layout.container.gaps[device.value].unit}
                                    onUnitChange={(e) => updateContainer(containResp("layout", "container", "gaps", {
                                        [device.value]: {
                                            unit: e
                                        }
                                    }))}
                                    units={["px", "%", "em"]}
                                />
                            </Fragment>
                        }
                    </div>
                }
            </div>
            <div>
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("additional")}>
                    <IconCaretRightFilled size={16} className={`${active === "additional" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Additional Options</span>
                </button>
                {active === "additional" &&
                    <div className="px-3.5 mt-4">
                        <SelectBox
                            label="HTML Tag"
                            value={target?.layout.additional_options.html_tag}
                            onChange={(e) => updateContainer(containResp("layout", "additional_options", { html_tag: e }))}
                            options={[
                                { value: "div", label: "Default" },
                                { value: "header", label: "header" },
                                { value: "footer", label: "footer" },
                                { value: "main", label: "main" },
                                { value: "article", label: "article" },
                                { value: "section", label: "section" },
                                { value: "aside", label: "aside" },
                                { value: "nav", label: "nav" },
                                { value: "a", label: "a (link)" }
                            ]}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default Layout;