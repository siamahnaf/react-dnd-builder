"use client"
import { useState } from "react";
import { IconCaretRightFilled } from "../../../../icons";
import { produce } from "immer";

//Components
import { InputBox, GroupInput, Switcher, CodeEditor } from "../../../../components/common/control";

//Store
import { useEditor } from "../../../../context/editor.context";

//Essentials
import { merge, DeepPartial } from "../../../../types/layouts/layout.types";
import { ContainerBlockTypes } from "../../../../types/context/design.types";
import { containResp } from "../../../../utils/container.utils";

const Advance = () => {
    //States
    const [active, setActive] = useState<string | null>("layout");

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
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("layout")}>
                    <IconCaretRightFilled size={16} className={`${active === "layout" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Layout</span>
                </button>
                {active === "layout" &&
                    <div className="px-3.5 mb-6 mt-1.5">
                        <GroupInput
                            label="Margin"
                            values={[
                                { value: target?.advance.layout.margin[device.value].top || "", direction: "top" },
                                { value: target?.advance.layout.margin[device.value].right || "", direction: "right" },
                                { value: target?.advance.layout.margin[device.value].bottom || "", direction: "bottom" },
                                { value: target?.advance.layout.margin[device.value].left || "", direction: "left" },
                            ]}
                            onChange={(e) => {
                                if (e.direction === "all") {
                                    updateContainer(containResp("advance", "layout", "margin", {
                                        [device.value]: {
                                            top: e.value,
                                            left: e.value,
                                            right: e.value,
                                            bottom: e.value
                                        }
                                    }))
                                } else {
                                    updateContainer(containResp("advance", "layout", "margin", {
                                        [device.value]: {
                                            [e.direction]: e.value
                                        }
                                    }))
                                }
                            }}
                            unit={target?.advance.layout.margin[device.value].unit}
                            onUnitChange={(e) => updateContainer(containResp("advance", "layout", "margin", {
                                [device.value]: {
                                    unit: e
                                }
                            }))}
                            units={["px", "em", "rem"]}
                        />
                        <GroupInput
                            label="Padding"
                            values={[
                                { value: target?.advance.layout.padding[device.value].top || "", direction: "top" },
                                { value: target?.advance.layout.padding[device.value].right || "", direction: "right" },
                                { value: target?.advance.layout.padding[device.value].bottom || "", direction: "bottom" },
                                { value: target?.advance.layout.padding[device.value].left || "", direction: "left" },
                            ]}
                            onChange={(e) => {
                                if (e.direction === "all") {
                                    updateContainer(containResp("advance", "layout", "padding", {
                                        [device.value]: {
                                            top: e.value,
                                            left: e.value,
                                            right: e.value,
                                            bottom: e.value
                                        }
                                    }))
                                } else {
                                    updateContainer(containResp("advance", "layout", "padding", {
                                        [device.value]: {
                                            [e.direction]: e.value
                                        }
                                    }))
                                }
                            }}
                            unit={target?.advance.layout.padding[device.value].unit}
                            onUnitChange={(e) => updateContainer(containResp("advance", "layout", "padding", {
                                [device.value]: {
                                    unit: e
                                }
                            }))}
                            units={["px", "em", "rem"]}
                        />
                        <p className="text-xs italic text-gray-600 mt-7">You can use your custom css id or classes from here.</p>
                        <InputBox
                            label="CSS ID"
                            value={target?.advance.layout.css_id || ""}
                            onChange={(e) => updateContainer(containResp("advance", "layout", { css_id: e }))}
                        />
                        <InputBox
                            label="CSS Classes"
                            value={target?.advance.layout.css_class || ""}
                            onChange={(e) => updateContainer(containResp("advance", "layout", { css_class: e }))}
                        />
                    </div>
                }
            </div>
            <div>
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("responsive")}>
                    <IconCaretRightFilled size={16} className={`${active === "responsive" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Responsive</span>
                </button>
                {active === "responsive" &&
                    <div className="px-3.5 mt-4 mb-5">
                        <Switcher
                            label="Hide On Desktop"
                            value={target?.advance.responsive.desktop}
                            onChange={(e) => updateContainer(containResp("advance", "responsive", { desktop: e }))}
                        />
                        <Switcher
                            label="Hide On Tablet"
                            value={target?.advance.responsive.tablet}
                            onChange={(e) => updateContainer(containResp("advance", "responsive", { tablet: e }))}
                        />
                        <Switcher
                            label="Hide On Mobile"
                            value={target?.advance.responsive.mobile}
                            onChange={(e) => updateContainer(containResp("advance", "responsive", { mobile: e }))}
                        />
                    </div>
                }
            </div>
            <div>
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("custom_css")}>
                    <IconCaretRightFilled size={16} className={`${active === "custom_css" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Custom CSS</span>
                </button>
                {active === "custom_css" &&
                    <div className="px-3.5 mt-4">
                        <CodeEditor
                            value={target?.advance.custom_css}
                            onChange={(e) => updateContainer(containResp("advance", { custom_css: e }))}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default Advance;