"use client"
import { useState, Fragment } from "react";
import { IconCaretRightFilled } from "../../../../icons";
import { produce } from "immer";

//Components
import { SelectBox, InputBox, InputFlowBox, CheckBox, IconButton } from "../../../../components/common/control";

//Store
import { useEditor } from "../../../../context/editor.context";

//Essentials
import { merge, DeepPartial } from "../../../../types/layouts/layout.types";
import { ContainerBlockTypes, NodesBlockTypes, ButtonBlockTypes } from "../../../../types/context/design.types";
import { btnResp } from "../../../../utils/button.utils";

const Content = () => {
    //States
    const [active, setActive] = useState<string | null>("button");
    const [linkSetting, setLinkSettings] = useState<boolean>(false);

    //Store
    const { design, selected, device } = useEditor();

    //Handler_Helpers
    const findButton = (nodes: NodesBlockTypes[]): ButtonBlockTypes | undefined => nodes.reduce<ButtonBlockTypes | undefined>((acc, n) => {
        if (acc) return acc;
        if (n.id === selected.value?.id) return n as ButtonBlockTypes;
        if (n.type === "container") return findButton((n as ContainerBlockTypes).nodes);
        return undefined;
    }, undefined);

    const updateBtn = (patch: DeepPartial<Pick<ButtonBlockTypes, "content" | "style" | "advance">>) => {
        design.setValue(prev =>
            produce(prev, draft => {
                const hit = findButton(draft.rows);
                if (hit) merge(hit, patch);
            })
        )
    }

    //Handler
    const onActiveChange = (id: string) => {
        setActive(prev => prev === id ? null : id);
    }

    //Target Container
    const target = findButton(design.value.rows);

    return (
        <div className="mt-4">
            <div className="border-b-2 border-solid border-black/5">
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("button")}>
                    <IconCaretRightFilled size={16} className={`${active === "button" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Button</span>
                </button>
                {active === "button" &&
                    <div className="px-3.5 mb-6 mt-1.5">
                        <SelectBox
                            label="Type"
                            value={target?.content.type}
                            onChange={(e) => updateBtn(btnResp("content", { type: e }))}
                            options={[
                                { value: "", label: "Default" },
                                { value: "info", label: "Info" },
                                { value: "success", label: "Success" },
                                { value: "warning", label: "Warning" },
                                { value: "danger", label: "Danger" }
                            ]}
                        />
                        <InputBox
                            label="Text"
                            value={target?.content.content}
                            onChange={(e) => updateBtn(btnResp("content", { content: e }))}
                        />
                        <div className="mt-4" />
                        <InputFlowBox
                            label="Link"
                            placeholder="Enter url here"
                            onSettings={() => setLinkSettings(!linkSetting)}
                            value={target?.content.link.url}
                            onChange={(e) => updateBtn(btnResp("content", "link", { url: e }))}
                        />
                        {linkSetting &&
                            <Fragment>
                                <CheckBox
                                    id="target"
                                    label="Open in new window"
                                    value={target?.content.link.open_in_new_window}
                                    onChange={(e) => updateBtn(btnResp("content", "link", { open_in_new_window: e }))}
                                />
                                <CheckBox
                                    id="nofollow"
                                    label="Add nofollow"
                                    value={target?.content.link.open_no_follow}
                                    onChange={(e) => updateBtn(btnResp("content", "link", { open_no_follow: e }))}
                                />
                            </Fragment>
                        }
                        <IconButton
                            label="Alignment"
                            iconSets="btnAlign"
                            value={target?.content.alignment[device.value]}
                            onChange={(e) => updateBtn(btnResp("content", "alignment", {
                                [device.value]: e
                            }))}
                        />
                        <div className="mt-5" />
                        <SelectBox
                            label="Size"
                            value={target?.content.size}
                            onChange={(e) => updateBtn(btnResp("content", { size: e }))}
                            options={[
                                { value: "10px 20px", label: "Extra Small" },
                                { value: "12px 24px", label: "Small" },
                                { value: "15px 30px", label: "Medium" },
                                { value: "20px 40px", label: "Large" },
                                { value: "25px 50px", label: "Extra Large" }
                            ]}
                        />
                        <hr className="border-gray-100 my-4" />
                        <InputBox
                            label="Button ID"
                            value={target?.content.buttonId}
                            onChange={(e) => updateBtn(btnResp("content", { buttonId: e }))}
                        />
                        <p className="text-xs italic whitespace-pre-wrap mt-5">Please make sure the ID is unique and not used elsewhere on the page this form is displayed. This field allows A-z 0-9 & underscore chars without spaces.</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default Content;