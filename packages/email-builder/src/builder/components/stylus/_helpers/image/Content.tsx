"use client"
import { useState, Fragment } from "react";
import { IconCaretRightFilled } from "../../../../icons";
import { produce } from "immer";

//Components
import { InputFlowBox, CheckBox, SelectBox, IconButton, InputBox, ImageHandler } from "../../../../components/common/control";

//Store
import { useEditor } from "../../../../context/editor.context";

//Essentials
import { merge, DeepPartial } from "../../../../types/layouts/layout.types";
import { ContainerBlockTypes, ImageBlockTypes, NodesBlockTypes } from "../../../../types/context/design.types";
import { imgResp } from "../../../../utils/image.utils";

const Content = () => {
    //States
    const [active, setActive] = useState<string | null>("image");
    const [linkSetting, setLinkSettings] = useState<boolean>(false);

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
                    <div className="px-3.5 mb-6 mt-1.5">
                        <ImageHandler
                            value={{
                                url: target?.content.content || "",
                                alt: target?.content.alt_text || "",
                                caption: target?.content.caption || ""
                            }}
                            onChange={(e) => updateImg(imgResp("content", {
                                content: e.url,
                                alt_text: e.alt,
                                caption: e.caption
                            }))}
                        />
                        <div className="mt-5" />
                        <SelectBox
                            label="Content Width"
                            value={target?.content.size}
                            onChange={(e) => updateImg(imgResp("content", { size: e }))}
                            options={[
                                { value: "150×150", label: "Thumbnail - 150 × 150" },
                                { value: "300×300", label: "Medium - 300 × 300" },
                                { value: "768×768", label: "Medium Large - 768 × 768" },
                                { value: "1024×1024", label: "Large - 1024 × 1024" },
                                { value: "1536×1536", label: "1536 × 1536" },
                                { value: "2048×2048", label: "2048 × 2048" },
                                { value: "2048×2048", label: "2048 × 2048" },
                                { value: "400×250", label: "Et-pb-post-main-image - 400 x 250" },
                                { value: "1080×675", label: "Et-pb-post-main-image-fullwidth - 1080 x 675" },
                                { value: "400×284", label: "Et-pb-portfolio-image - 400 x 284" },
                                { value: "510×382", label: "Et-pb-portfolio-module-image - 510 x 382" },
                                { value: "1080×9999", label: "Et-pb-portfolio-image-single - 1080 x 9999" },
                                { value: "400×516", label: "Et-pb-gallery-module-image-portrait - 400 x 516" },
                                { value: "2880×1800", label: "Et-pb-post-main-image-fullwidth-large - 2880 x 1800" },
                                { value: "1280×720", label: "Et-pb-image--responsive--desktop - 1280 x 720" },
                                { value: "980×551", label: "Et-pb-image--responsive--tablet - 980 x 551" },
                                { value: "480×270", label: "Et-pb-image--responsive--phone - 480 x 270" },
                                { value: "100%×100%", label: "Full" },
                                { value: "custom", label: "Custom" },
                            ]}
                        />
                        {target?.content.size === "custom" &&
                            <Fragment>
                                <p className="text-[13px] italic whitespace-pre-wrap opacity-60 mt-3">You can crop the original image size to any custom size. You need to provide width and height both in order to keep the original size ratio.</p>
                                <InputBox
                                    label="Width"
                                    value={target.content.custom_size.width}
                                    onChange={(e) => updateImg(imgResp("content", "custom_size", { width: e }))}
                                />
                                <InputBox
                                    label="Height"
                                    value={target.content.custom_size.height}
                                    onChange={(e) => updateImg(imgResp("content", "custom_size", { height: e }))}
                                />
                                <hr className="border-gray-100 mt-4" />
                            </Fragment>
                        }
                        <IconButton
                            iconSets="imgAlign"
                            label="Alignment"
                            value={target?.content.alignment[device.value]}
                            onChange={(e) => updateImg(imgResp("content", "alignment", {
                                [device.value]: e
                            }))}
                        />
                        <InputFlowBox
                            label="Link"
                            placeholder="Enter url here"
                            onSettings={() => setLinkSettings(!linkSetting)}
                            value={target?.content.link.url}
                            onChange={(e) => updateImg(imgResp("content", "link", { url: e }))}
                        />
                        {linkSetting &&
                            <Fragment>
                                <CheckBox
                                    id="target"
                                    label="Open in new window"
                                    value={target?.content.link.open_in_new_window}
                                    onChange={(e) => updateImg(imgResp("content", "link", { open_in_new_window: e }))}
                                />
                                <CheckBox
                                    id="nofollow"
                                    label="Add nofollow"
                                    value={target?.content.link.open_no_follow}
                                    onChange={(e) => updateImg(imgResp("content", "link", { open_no_follow: e }))}
                                />
                            </Fragment>
                        }
                    </div>
                }
            </div>

        </div>
    );
};

export default Content;