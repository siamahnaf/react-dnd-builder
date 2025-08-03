"use client"
import { useState, DragEvent, ReactNode } from "react";
import { IconPlus } from "../../icons";
import { produce } from "immer";

//Types
import { NodesBlockTypes, DesignRowsTypes } from "../../types/context/design.types";

//Store
import { useEditor } from "../../context/editor.context";

//Components
import WidgetSettings from "./_helpers/WidgetSettings";

//Default Value
import { containerData } from "../../data/default/container.data";
import { headingData } from "../../data/default/heading.data";
import { textData } from "../../data/default/text.data";
import { buttonData } from "../../data/default/button.data";
import { imageData } from "../../data/default/image.data";
import { dividerData } from "../../data/default/divider.data";
import { spacerData } from "../../data/default/spacer.data";
import { iconData } from "../../data/default/icon.data";
import { htmlData } from "../../data/default/html.data";

//Interface
interface Props {
    children: ReactNode;
    item: DesignRowsTypes;
    index: number;
}

const Container = ({ children, item, index }: Props) => {
    //State
    const [dragOver, setDragOver] = useState(false);

    //Store
    const { design, selected, device } = useEditor();

    //Handler__Helpers
    const onWidgetInsert = (newValue: NodesBlockTypes) => {
        design.setValue(prev => produce(prev, draft => {
            const row = draft.rows[index];
            if (row.type !== "container") return;
            (row.nodes ??= []).push(newValue);
        }))
    }

    //Handler
    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };
    const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
    };
    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        setDragOver(false);
        const itemKey = e.dataTransfer.getData("itemKey");
        if (itemKey === "container") {
            const _containerData = { ...containerData, id: crypto.randomUUID() }
            onWidgetInsert(_containerData)
            selected.setValue({ id: _containerData.id, type: _containerData.type, name: _containerData.name });
        }
        if (itemKey === "heading") {
            const _headingData = { ...headingData, id: crypto.randomUUID() };
            onWidgetInsert(_headingData);
            selected.setValue({ id: _headingData.id, type: _headingData.type, name: _headingData.name });
        }
        if (itemKey === "text") {
            const _textData = { ...textData, id: crypto.randomUUID() };
            onWidgetInsert(_textData);
            selected.setValue({ id: _textData.id, type: _textData.type, name: _textData.name });
        }
        if (itemKey === "button") {
            const _buttonData = { ...buttonData, id: crypto.randomUUID() };
            onWidgetInsert(_buttonData);
            selected.setValue({ id: _buttonData.id, type: _buttonData.type, name: _buttonData.name });
        }
        if (itemKey === "image") {
            const _imageData = { ...imageData, id: crypto.randomUUID() };
            onWidgetInsert(_imageData);
            selected.setValue({ id: _imageData.id, type: _imageData.type, name: _imageData.name });
        }
        if (itemKey === "divider") {
            const _dividerData = { ...dividerData, id: crypto.randomUUID() };
            onWidgetInsert(_dividerData);
            selected.setValue({ id: _dividerData.id, type: _dividerData.type, name: _dividerData.name });
        }
        if (itemKey === "spacer") {
            const _spacerData = { ...spacerData, id: crypto.randomUUID() };
            onWidgetInsert(_spacerData);
            selected.setValue({ id: _spacerData.id, type: _spacerData.type, name: _spacerData.name });
        }
        if (itemKey === "icon") {
            const _iconData = { ...iconData, id: crypto.randomUUID() };
            onWidgetInsert(_iconData);
            selected.setValue({ id: _iconData.id, type: _iconData.type, name: _iconData.name });
        }
        if (itemKey === "html") {
            const _htmlData = { ...htmlData, id: crypto.randomUUID() };
            onWidgetInsert(_htmlData);
            selected.setValue({ id: _htmlData.id, type: _htmlData.type, name: _htmlData.name });
        }
    };

    return (
        <div className={`container-root border border-solid hover:border-builder relative group ${item.display ? "block" : "hidden"} ${selected.value?.id === item.id ? "shadow-[0_0_0_1px_rgba(0,0,0,0.1)] border-builder" : "border-transparent"} ${item.advance.layout.css_class}`} id={item.advance.layout.css_id}>
            {item.style.background.image.url &&
                <div className="background-image absolute top-0 left-0 right-0 bottom-0" />
            }
            <style jsx>{`
                .background-image {
                    background: url("${item.style.background.image.url}");
                    background-position: ${item.style.background.image.position};
                    background-repeat: ${item.style.background.image.repeat};
                    background-size: ${item.style.background.image.size};
                }
                .container-main {
                    max-width: ${item.layout.container.width[device.value].value}${item.layout.container.width[device.value].unit};
                    min-height: ${item.layout.container.min_height[device.value].value}${item.layout.container.min_height[device.value].unit};
                    display: ${item.layout.container.display_type[device.value]};
                    flex-wrap: ${item.layout.container.display_type[device.value] === "flex" ? "wrap" : ""};
                    flex-direction: ${item.layout.container.display_direction[device.value]};
                    grid-template-columns: ${item.layout.container.grid_type[device.value]};
                    justify-content: ${item.layout.container.justify_content[device.value]};
                    align-items: ${item.layout.container.align_items[device.value]};
                    row-gap: ${item.layout.container.gaps[device.value].row}${item.layout.container.gaps[device.value].unit};
                    column-gap: ${item.layout.container.gaps[device.value].column}${item.layout.container.gaps[device.value].unit};
                    border-style: ${item.style.border.border_type};
                    border-width: ${item.style.border.border_width[device.value].top}${item.style.border.border_width[device.value].unit} ${item.style.border.border_width[device.value].right}${item.style.border.border_width[device.value].unit} ${item.style.border.border_width[device.value].bottom}${item.style.border.border_width[device.value].unit} ${item.style.border.border_width[device.value].left}${item.style.border.border_width[device.value].unit};
                    border-color: ${item.style.border.border_color};
                    border-radius: ${item.style.border.border_radius[device.value].top}${item.style.border.border_radius[device.value].unit} ${item.style.border.border_radius[device.value].right}${item.style.border.border_radius[device.value].unit} ${item.style.border.border_radius[device.value].bottom}${item.style.border.border_radius[device.value].unit} ${item.style.border.border_radius[device.value].left}${item.style.border.border_radius[device.value].unit};
                }
                .container-root {
                    background: ${item.style.background.color};
                    margin-top: ${item.advance.layout.margin[device.value].top}${item.advance.layout.margin[device.value].unit};
                    margin-right: ${item.advance.layout.margin[device.value].right}${item.advance.layout.margin[device.value].unit};
                    margin-bottom: ${item.advance.layout.margin[device.value].bottom}${item.advance.layout.margin[device.value].unit};
                    margin-left: ${item.advance.layout.margin[device.value].left}${item.advance.layout.margin[device.value].unit};
                    padding-top: ${item.advance.layout.padding[device.value].top}${item.advance.layout.padding[device.value].unit};
                    padding-right: ${item.advance.layout.padding[device.value].right}${item.advance.layout.padding[device.value].unit};
                    padding-bottom: ${item.advance.layout.padding[device.value].bottom}${item.advance.layout.padding[device.value].unit};
                    padding-left: ${item.advance.layout.padding[device.value].left}${item.advance.layout.padding[device.value].unit};
                    opacity: ${item.advance.responsive[device.value] ? 0.2 : 1};
                    pointer-events: ${item.advance.responsive[device.value] ? "none" : "unset"};
                }
            `}</style>
            {item.advance.custom_css && (
                <style
                    dangerouslySetInnerHTML={{ __html: item.advance.custom_css }}
                />
            )}
            <div className={`${item.nodes.length === 0 ? "border border-dashed border-gray-400 border-opacity-50" : ""} container-main relative z-20 mx-auto`}>
                {item.nodes.length === 0 &&
                    <div onDragOver={(e) => onDragOver(e)} onDragLeave={(e) => onDragLeave(e)} onDrop={(e) => onDrop(e)} className="py-12 w-full">
                        <div className={`w-full transition-[height] bg-builder/80 ${dragOver ? "h-[16px] visible" : "h-0 invisible"}`} />
                        {!dragOver &&
                            <button className="flex items-center justify-center p-1 rounded-md text-gray-600 mx-auto h-[16px]" onClick={() => selected.setValue(null)}>
                                <IconPlus size={20} />
                            </button>
                        }
                    </div>
                }
                {children}
            </div>
            <WidgetSettings isFirst={index === 0 ? true : false} item={item} />
        </div>
    );
};

export default Container;


