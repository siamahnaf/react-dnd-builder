"use client"
import { useState } from "react";
import { IconCaretRightFilled } from "../../../../icons";
import { produce } from "immer";

//Components
import { InputBox, GroupInput, Switcher, CodeEditor, BackgroundOption, SelectBox, ColorPicker } from "../../../../components/common/control";

//Store
import { useEditor } from "../../../../context/editor.context";

//Essentials
import { merge, DeepPartial } from "../../../../types/layouts/layout.types";
import { ContainerBlockTypes, IconBlockTypes, NodesBlockTypes } from "../../../../types/context/design.types";
import { iconResp } from "../../../../utils/icon.utils";

const Advance = () => {
    //States
    const [active, setActive] = useState<string | null>("layout");

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
                                    updateIcon(iconResp("advance", "layout", "margin", {
                                        [device.value]: {
                                            top: e.value,
                                            left: e.value,
                                            right: e.value,
                                            bottom: e.value
                                        }
                                    }))
                                } else {
                                    updateIcon(iconResp("advance", "layout", "margin", {
                                        [device.value]: {
                                            [e.direction]: e.value
                                        }
                                    }))
                                }
                            }}
                            unit={target?.advance.layout.margin[device.value].unit}
                            onUnitChange={(e) => updateIcon(iconResp("advance", "layout", "margin", {
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
                                    updateIcon(iconResp("advance", "layout", "padding", {
                                        [device.value]: {
                                            top: e.value,
                                            left: e.value,
                                            right: e.value,
                                            bottom: e.value
                                        }
                                    }))
                                } else {
                                    updateIcon(iconResp("advance", "layout", "padding", {
                                        [device.value]: {
                                            [e.direction]: e.value
                                        }
                                    }))
                                }
                            }}
                            unit={target?.advance.layout.padding[device.value].unit}
                            onUnitChange={(e) => updateIcon(iconResp("advance", "layout", "padding", {
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
                            onChange={(e) => updateIcon(iconResp("advance", "layout", { css_id: e }))}
                        />
                        <InputBox
                            label="CSS Classes"
                            value={target?.advance.layout.css_class || ""}
                            onChange={(e) => updateIcon(iconResp("advance", "layout", { css_class: e }))}
                        />
                    </div>
                }
            </div>
            <div>
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("background")}>
                    <IconCaretRightFilled size={16} className={`${active === "background" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Background</span>
                </button>
                {active === "background" &&
                    <div className="px-3.5 mt-4">
                        <BackgroundOption
                            label="Background Type"
                            type={target?.advance.background.background_type}
                            onTypeChange={(e) => updateIcon(iconResp("advance", "background", { background_type: e }))}
                            colorValue={target?.advance.background.color || ""}
                            onColorChange={(e) => updateIcon(iconResp("advance", "background", { color: e }))}
                            imageValue={{
                                url: target?.advance.background.image.url || "",
                                alt: target?.advance.background.image.props.alt_text || "",
                                caption: target?.advance.background.image.props.caption || ""
                            }}
                            onImageChange={(e) => updateIcon(iconResp("advance", "background", "image", {
                                url: e.url,
                                props: {
                                    alt_text: e.alt,
                                    caption: e.caption
                                }
                            }))}
                        />
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
                            value={target?.advance.border.border_type}
                            onChange={(e) => updateIcon(iconResp("advance", "border", { border_type: e }))}
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
                                { value: target?.advance.border.border_width[device.value].top || "", direction: "top" },
                                { value: target?.advance.border.border_width[device.value].right || "", direction: "right" },
                                { value: target?.advance.border.border_width[device.value].bottom || "", direction: "bottom" },
                                { value: target?.advance.border.border_width[device.value].left || "", direction: "left" }
                            ]}
                            onChange={(e) => {
                                if (e.direction === "all") {
                                    updateIcon(iconResp("advance", "border", "border_width", {
                                        [device.value]: {
                                            top: e.value,
                                            left: e.value,
                                            right: e.value,
                                            bottom: e.value
                                        }
                                    }))
                                } else {
                                    updateIcon(iconResp("advance", "border", "border_width", {
                                        [device.value]: {
                                            [e.direction]: e.value
                                        }
                                    }))
                                }
                            }}
                            unit={target?.advance.border.border_width[device.value].unit}
                            onUnitChange={(e) => updateIcon(iconResp("advance", "border", "border_width", {
                                [device.value]: {
                                    unit: e
                                }
                            }))}
                            units={["px", "em", "rem"]}
                        />
                        <div className="mt-6" />
                        <ColorPicker
                            label="Border Color"
                            value={target?.advance.border.border_color}
                            onChange={(e) => updateIcon(iconResp("advance", "border", { border_color: e }))}
                        />
                        <GroupInput
                            label="Border Radius"
                            values={[
                                { value: target?.advance.border.border_radius[device.value].top || "", direction: "top" },
                                { value: target?.advance.border.border_radius[device.value].right || "", direction: "right" },
                                { value: target?.advance.border.border_radius[device.value].bottom || "", direction: "bottom" },
                                { value: target?.advance.border.border_radius[device.value].left || "", direction: "left" },
                            ]}
                            onChange={(e) => {
                                if (e.direction === "all") {
                                    updateIcon(iconResp("advance", "border", "border_radius", {
                                        [device.value]: {
                                            top: e.value,
                                            left: e.value,
                                            right: e.value,
                                            bottom: e.value
                                        }
                                    }))
                                } else {
                                    updateIcon(iconResp("advance", "border", "border_radius", {
                                        [device.value]: {
                                            [e.direction]: e.value
                                        }
                                    }))
                                }
                            }}
                            unit={target?.advance.border.border_radius[device.value].unit}
                            onUnitChange={(e) => updateIcon(iconResp("advance", "border", "border_radius", {
                                [device.value]: {
                                    unit: e
                                }
                            }))}
                            units={["px", "em", "rem"]}
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
                            onChange={(e) => updateIcon(iconResp("advance", "responsive", { desktop: e }))}
                        />
                        <Switcher
                            label="Hide On Tablet"
                            value={target?.advance.responsive.tablet}
                            onChange={(e) => updateIcon(iconResp("advance", "responsive", { tablet: e }))}
                        />
                        <Switcher
                            label="Hide On Mobile"
                            value={target?.advance.responsive.mobile}
                            onChange={(e) => updateIcon(iconResp("advance", "responsive", { mobile: e }))}
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
                            onChange={(e) => updateIcon(iconResp("advance", { custom_css: e }))}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default Advance;