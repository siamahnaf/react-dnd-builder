"use client"
import { useState } from "react";
import { IconCaretRightFilled } from "../../../../icons";
import { produce } from "immer";

//Components
import { CodeEditor } from "../../../../components/common/control";

//Store
import { useEditor } from "../../../../context/editor.context";

//Essentials
import { merge, DeepPartial } from "../../../../types/layouts/layout.types";
import { ContainerBlockTypes, HtmlBlockTypes, NodesBlockTypes } from "../../../../types/context/design.types";
import { htmlResp } from "../../../../utils/html.utils";

const Content = () => {
    //States
    const [active, setActive] = useState<string | null>("html");

    //Store
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findHtml = (nodes: NodesBlockTypes[]): HtmlBlockTypes | undefined => nodes.reduce<HtmlBlockTypes | undefined>((acc, n) => {
        if (acc) return acc;
        if (n.id === selected.value?.id) return n as HtmlBlockTypes;
        if (n.type === "container") return findHtml((n as ContainerBlockTypes).nodes);
        return undefined;
    }, undefined);

    const updateHtml = (patch: DeepPartial<Pick<HtmlBlockTypes, "content" | "advance">>) => {
        design.setValue(prev =>
            produce(prev, draft => {
                const hit = findHtml(draft.rows);
                if (hit) merge(hit, patch);
            })
        )
    }

    //Handler
    const onActiveChange = (id: string) => {
        setActive(prev => prev === id ? null : id);
    }

    //Target Container
    const target = findHtml(design.value.rows);

    return (
        <div className="mt-4">
            <div className="border-b-2 border-solid border-black/5">
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("html")}>
                    <IconCaretRightFilled size={16} className={`${active === "html" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">HTML</span>
                </button>
                {active === "html" &&
                    <div className="px-3.5 mb-6 mt-1.5">
                        <CodeEditor
                            label="Customer HTML"
                            lang="html"
                            value={target?.content.content}
                            onChange={(e) => updateHtml(htmlResp("content", { content: e }))}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default Content;