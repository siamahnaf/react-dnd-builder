"use client"
import { produce } from "immer";

//Store
import { useEditor } from "../../context/editor.context";

//Components
import WidgetDropper from "./_helpers/WidgetDropper";
import ContentEditable from "../common/ContentEditable";

//Essentials
import { DeepPartial, merge } from "../../types/layouts/layout.types";
import { TextBlockTypes, NodesBlockTypes, ContainerBlockTypes } from "../../types/context/design.types";
import { textResp } from "../../utils/text.utils";

//Interface
interface Props {
    item: TextBlockTypes;
}

const Paragraph = ({ item }: Props) => {
    //Storing
    const { selected, device, design } = useEditor();

    //Handler_Helpers
    const findText = (nodes: NodesBlockTypes[]): TextBlockTypes | undefined => nodes.reduce<TextBlockTypes | undefined>((acc, n) => {
        if (acc) return acc;
        if (n.id === selected.value?.id) return n as TextBlockTypes;
        if (n.type === "container") return findText((n as ContainerBlockTypes).nodes);
        return undefined;
    }, undefined);

    const updateText = (patch: DeepPartial<Pick<TextBlockTypes, "content" | "style" | "advance">>) => {
        design.setValue(prev =>
            produce(prev, draft => {
                const hit = findText(draft.rows);
                if (hit) merge(hit, patch);
            })
        )
    };

    return (
        <WidgetDropper id={item.id}>
            <div
                className={`border border-solid hover:border-builder ${item.display ? "block" : "hidden"} ${selected.value?.id === item.id ? "shadow-[0_0_0_1px_rgba(0,0,0,0.1)] border-builder" : "border-transparent"}`}
                onClick={() => selected.setValue({ id: item.id, name: item.name, type: item.type })}
            >
                <style jsx>{`
                    .background-image {
                        background: url("${item.advance.background.image.url}");
                        background-position: ${item.advance.background.image.position};
                        background-repeat: ${item.advance.background.image.repeat};
                        background-size: ${item.advance.background.image.size};
                    }
                    .text-type {
                        columns: ${item.content.column[device.value]};
                        column-gap: ${item.content.column_gaps[device.value].value}${item.content.column_gaps[device.value].unit};
                        text-align: ${item.style.alignment[device.value]};
                        color: ${item.style.text_color};
                        font-family: ${item.style.typography.family};
                        font-size: ${item.style.typography.size[device.value].value}${item.style.typography.size[device.value].unit};
                        font-weight: ${item.style.typography.weight} !important;
                        text-transform: ${item.style.typography.transform};
                        font-style: ${item.style.typography.style};
                        text-decoration: ${item.style.typography.decoration};
                        line-height: ${item.style.typography.line_height[device.value].value}${item.style.typography.line_height[device.value].unit};
                        letter-spacing: ${item.style.typography.letter_spacing[device.value].value}${item.style.typography.letter_spacing[device.value].unit};
                        word-spacing: ${item.style.typography.word_spacing[device.value].value}${item.style.typography.word_spacing[device.value].unit};
                    }
                    .text-container {
                        background: ${item.advance.background.color};
                        margin-top: ${item.advance.layout.margin[device.value].top}${item.advance.layout.margin[device.value].unit};
                        margin-right: ${item.advance.layout.margin[device.value].right}${item.advance.layout.margin[device.value].unit};
                        margin-bottom: ${item.advance.layout.margin[device.value].bottom}${item.advance.layout.margin[device.value].unit};
                        margin-left: ${item.advance.layout.margin[device.value].left}${item.advance.layout.margin[device.value].unit};
                        padding-top: ${item.advance.layout.padding[device.value].top}${item.advance.layout.padding[device.value].unit};
                        padding-right: ${item.advance.layout.padding[device.value].right}${item.advance.layout.padding[device.value].unit};
                        padding-bottom: ${item.advance.layout.padding[device.value].bottom}${item.advance.layout.padding[device.value].unit};
                        padding-left: ${item.advance.layout.padding[device.value].left}${item.advance.layout.padding[device.value].unit};
                        border-style: ${item.advance.border.border_type};
                        border-top-width: ${item.advance.border.border_width[device.value].top}${item.advance.border.border_width[device.value].unit};
                        border-right-width: ${item.advance.border.border_width[device.value].right}${item.advance.border.border_width[device.value].unit};
                        border-bottom-width: ${item.advance.border.border_width[device.value].bottom}${item.advance.border.border_width[device.value].unit};
                        border-left-width: ${item.advance.border.border_width[device.value].left}${item.advance.border.border_width[device.value].unit};
                        border-color: ${item.advance.border.border_color};
                        border-radius: ${item.advance.border.border_radius[device.value].top}${item.advance.border.border_radius[device.value].unit} ${item.advance.border.border_radius[device.value].right}${item.advance.border.border_radius[device.value].unit} ${item.advance.border.border_radius[device.value].bottom}${item.advance.border.border_radius[device.value].unit} ${item.advance.border.border_radius[device.value].left}${item.advance.border.border_radius[device.value].unit};
                        opacity: ${item.advance.responsive[device.value] ? 0.2 : 1};
                        pointer-events: ${item.advance.responsive[device.value] ? "none" : "unset"};
                    }
                `}</style>
                {item.advance.custom_css && (
                    <style
                        dangerouslySetInnerHTML={{ __html: item.advance.custom_css }}
                    />
                )}
                <div
                    className={`relative text-container ${item.advance.layout.css_class}`}
                    id={item.advance.layout.css_id}
                >
                    {item.advance.background.image.url &&
                        <div className="background-image absolute top-0 left-0 right-0 bottom-0" />
                    }
                    <div className="text-type">
                        <ContentEditable
                            html={item.content.content}
                            disabled={false}
                            onChange={(e) => updateText(textResp("content", { content: e.target.value }))}
                            tagName={"p"}
                            className="focus:outline-none cursor-default focus:cursor-text"
                        />
                    </div>
                </div>
            </div>
        </WidgetDropper>
    );
};

export default Paragraph;