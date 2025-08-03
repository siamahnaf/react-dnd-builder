"use client"
import { useState, Fragment } from "react";
import { IconCaretRightFilled } from "../../../../icons";
import { produce } from "immer";

//Components
import { TextareaBox, InputFlowBox, CheckBox, SelectBox, IconButton } from "../../../../components/common/control";

//Store
import { useEditor } from "../../../../context/editor.context";

//Essentials
import { merge, DeepPartial } from "../../../../types/layouts/layout.types";
import { ContainerBlockTypes, HeadingBlockTypes, NodesBlockTypes } from "../../../../types/context/design.types";
import { headResp } from "../../../../utils/heading.utils";

const Content = () => {
    //States
    const [active, setActive] = useState<string | null>("title");
    const [linkSetting, setLinkSettings] = useState<boolean>(false);

    //Store
    const { design, selected, device } = useEditor();

    //Handler_Helpers
    const findHeading = (nodes: NodesBlockTypes[]): HeadingBlockTypes | undefined => nodes.reduce<HeadingBlockTypes | undefined>((acc, n) => {
        if (acc) return acc;
        if (n.id === selected.value?.id) return n as HeadingBlockTypes;
        if (n.type === "container") return findHeading((n as ContainerBlockTypes).nodes);
        return undefined;
    }, undefined);

    const updateHeading = (patch: DeepPartial<Pick<HeadingBlockTypes, "content" | "style" | "advance">>) => {
        design.setValue(prev =>
            produce(prev, draft => {
                const hit = findHeading(draft.rows);
                if (hit) merge(hit, patch);
            })
        )
    }

    //Handler
    const onActiveChange = (id: string) => {
        setActive(prev => prev === id ? null : id);
    }

    //Target Container
    const target = findHeading(design.value.rows);

    return (
        <div className="mt-4">
            <div className="border-b-2 border-solid border-black/5">
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("title")}>
                    <IconCaretRightFilled size={16} className={`${active === "title" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Title</span>
                </button>
                {active === "title" &&
                    <div className="px-3.5 mb-6 mt-1.5">
                        <TextareaBox
                            value={target?.content.content}
                            onChange={(e) => updateHeading(headResp("content", { content: e }))}
                        />
                        <InputFlowBox
                            label="Link"
                            placeholder="Enter url here"
                            onSettings={() => setLinkSettings(!linkSetting)}
                            value={target?.content.link.url}
                            onChange={(e) => updateHeading(headResp("content", "link", { url: e }))}
                        />
                        {linkSetting &&
                            <Fragment>
                                <CheckBox
                                    id="target"
                                    label="Open in new window"
                                    value={target?.content.link.open_in_new_window}
                                    onChange={(e) => updateHeading(headResp("content", "link", { open_in_new_window: e }))}
                                />
                                <CheckBox
                                    id="nofollow"
                                    label="Add nofollow"
                                    value={target?.content.link.open_no_follow}
                                    onChange={(e) => updateHeading(headResp("content", "link", { open_no_follow: e }))}
                                />
                            </Fragment>
                        }
                        <div className="mt-5" />
                        <SelectBox
                            label="Size"
                            value={target?.content.size}
                            onChange={(e) => updateHeading(headResp("content", { size: e }))}
                            options={[
                                { value: "26px", label: "Default" },
                                { value: "15px", label: "Small" },
                                { value: "19px", label: "Medium" },
                                { value: "29px", label: "Large" },
                                { value: "39px", label: "XL" },
                                { value: "59px", label: "XXL" }
                            ]}
                        />
                        <div className="mt-5" />
                        <SelectBox
                            label="HTML Tag"
                            value={target?.content.html_tag}
                            onChange={(e) => updateHeading(headResp("content", { html_tag: e }))}
                            options={[
                                { value: "h1", label: "H1" },
                                { value: "h2", label: "H2" },
                                { value: "h3", label: "H3" },
                                { value: "h4", label: "H4" },
                                { value: "h5", label: "H5" },
                                { value: "h6", label: "H6" },
                                { value: "div", label: "div" },
                                { value: "span", label: "span" },
                                { value: "p", label: "p" }
                            ]}
                        />
                        <IconButton
                            label="Alignment"
                            iconSets="alignment"
                            value={target?.content.alignment[device.value]}
                            onChange={(e) => updateHeading(headResp("content", "alignment", {
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