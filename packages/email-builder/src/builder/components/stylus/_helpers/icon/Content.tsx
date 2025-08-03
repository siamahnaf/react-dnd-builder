"use client"
import { useState, Fragment } from "react";
import { IconCaretRightFilled } from "../../../../icons";
import { produce } from "immer";

//Components
import { InputFlowBox, CheckBox, SelectBox, IconButton, IconPicker } from "../../../../components/common/control";

//Store
import { useEditor } from "../../../../context/editor.context";

//Essentials
import { merge, DeepPartial } from "../../../../types/layouts/layout.types";
import { ContainerBlockTypes, IconBlockTypes, NodesBlockTypes } from "../../../../types/context/design.types";
import { iconResp } from "../../../../utils/icon.utils";

const Content = () => {
    //States
    const [active, setActive] = useState<string | null>("icon");
    const [linkSetting, setLinkSettings] = useState<boolean>(false);

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
                        <IconPicker
                            value={target?.content.content}
                            onChange={(e) => updateIcon(iconResp("content", { content: e }))}
                        />
                        <div className="mt-5" />
                        <SelectBox
                            label="Shape"
                            value={target?.content.shape}
                            onChange={(e) => updateIcon(iconResp("content", { shape: e }))}
                            options={[
                                { value: "square", label: "Square" },
                                { value: "circle", label: "Circle" }
                            ]}
                        />
                        <div className="mt-4" />
                        <InputFlowBox
                            label="Link"
                            placeholder="Enter url here"
                            onSettings={() => setLinkSettings(!linkSetting)}
                            value={target?.content.link.url}
                            onChange={(e) => updateIcon(iconResp("content", "link", { url: e }))}
                        />
                        {linkSetting &&
                            <Fragment>
                                <CheckBox
                                    id="target"
                                    label="Open in new window"
                                    value={target?.content.link.open_in_new_window}
                                    onChange={(e) => updateIcon(iconResp("content", "link", { open_in_new_window: e }))}
                                />
                                <CheckBox
                                    id="nofollow"
                                    label="Add nofollow"
                                    value={target?.content.link.open_no_follow}
                                    onChange={(e) => updateIcon(iconResp("content", "link", { open_no_follow: e }))}
                                />
                            </Fragment>
                        }
                        <div className="mt-6" />
                        <IconButton
                            label="Alignment"
                            iconSets="imgAlign"
                            value={target?.content.alignment[device.value]}
                            onChange={(e) => updateIcon(iconResp("content", "alignment", {
                                [device.value]: e
                            }))}
                        />
                    </div>
                }
            </div>

        </div>
    );
};

export default Content;