"use client"
import { useState, ReactNode, DragEvent } from "react";
import { produce } from "immer";

//Store
import { useEditor } from "../../../context/editor.context";

//Default Value
import { containerData } from "../../../data/default/container.data";
import { headingData } from "../../../data/default/heading.data";
import { textData } from "../../../data/default/text.data";
import { buttonData } from "../../../data/default/button.data";
import { imageData } from "../../../data/default/image.data";
import { dividerData } from "../../../data/default/divider.data";
import { spacerData } from "../../../data/default/spacer.data";
import { iconData } from "../../../data/default/icon.data";
import { htmlData } from "../../../data/default/html.data";

//Essentials
import { ContainerBlockTypes, NodesBlockTypes } from "../../../types/context/design.types";

//Interface
interface Props {
    children: ReactNode;
    id: string;
}

const WidgetDropper = ({ children, id }: Props) => {
    //State
    const [dragOver, setDragOver] = useState<boolean>(false);
    const [dropArea, setDropArea] = useState<string>("");

    //Store
    const { design, selected } = useEditor();

    //Handler
    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const mouseY = e.clientY - e.currentTarget.getBoundingClientRect().top;
        setDragOver(true);
        setDropArea(mouseY <= e.currentTarget.clientHeight / 2 ? "upper" : "bottom");
    };

    const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
    };

    //Handler_Helpers
    const onWidgetInsert = (newValue: NodesBlockTypes) => {
        design.setValue(prev =>
            produce(prev, draft => {
                const dfs = (arr: NodesBlockTypes[]): boolean => {
                    for (let i = 0; i < arr.length; i++) {
                        const node = arr[i];
                        if (node.id === id) {
                            dropArea === "upper" ? arr.splice(i, 0, newValue) : arr.splice(i + 1, 0, newValue);
                            return true;
                        }
                        if ((node as ContainerBlockTypes).nodes && dfs((node as ContainerBlockTypes).nodes)) return true;
                    }
                    return false;
                }
                dfs(draft.rows)
            })
        )
    }

    //Drop Handler
    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        const itemKey = e.dataTransfer.getData("itemKey");
        if (itemKey === "container") {
            const _containerData = { ...containerData, id: crypto.randomUUID() };
            onWidgetInsert(_containerData);
            selected.setValue({ id: _containerData.id, name: _containerData.name, type: _containerData.type });
        }
        if (itemKey === "heading") {
            const _heading = { ...headingData, id: crypto.randomUUID() };
            onWidgetInsert(_heading);
            selected.setValue({ id: _heading.id, name: _heading.name, type: _heading.type });
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
        <div onDragOver={(e) => onDragOver(e)} onDragLeave={(e) => onDragLeave(e)} onDrop={(e) => onDrop(e)}>
            {dropArea === "upper" && dragOver &&
                <div className="w-full h-3 bg-builder/70" />
            }
            {children}
            {dropArea === "bottom" && dragOver &&
                <div className="w-full h-3 bg-builder/70" />
            }
        </div>
    );
};

export default WidgetDropper;