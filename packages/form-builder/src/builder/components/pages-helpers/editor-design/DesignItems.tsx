"use client"
import { Fragment, useState, DragEvent } from "react";
import { TInputElement, TLayoutElement, TDesignPage, TPanel, TDesignElement } from "@siamahnaf/react-form-renderer";
import { IconSquareRoundedPlusFilled } from "../../../icons";
import { produce } from "immer";
import { getDefaultData } from "../../../data/default/default.data";
import { ItemKeys } from "../../../types/layout/itemkey.types";
import { layoutElements as layouts } from "../../../data/layout/layoutelement.data";

//Editor
import { useEditor } from "../../../context/editor.context";

//Components
import DesignElement from "./_com/DesignElement";
import PanelElement from "./_com/PanelElement";
import LayoutElements from "./_com/LayoutElements";

//Interface
interface Props {
    page: TDesignPage;
    index: number;
}

const DesignItems = ({ page, index }: Props) => {
    //State
    const [dragOver, setDragOver] = useState<boolean>(false);

    //Editor
    const { design, selected } = useEditor();

    //Handler
    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };
    const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
    };
    const getElementData = (itemKey: ItemKeys, pages: TDesignPage[], freshData: TDesignElement) => {
        if (!itemKey.id) return freshData;

        for (const page of pages) {
            const elIndex = page.elements.findIndex(el => el.id === itemKey.id);
            if (elIndex !== -1) {
                const el = page.elements[elIndex];
                page.elements.splice(elIndex, 1);
                return el;
            }
            for (const element of page.elements) {
                if ("elements" in element && Array.isArray(element.elements)) {
                    const childIndex = element.elements.findIndex(e => e.id === itemKey.id);
                    if (childIndex !== -1) {
                        const el = element.elements[childIndex];
                        element.elements.splice(childIndex, 1);
                        return el;
                    }
                }
            }
        }
    };
    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        setDragOver(false);
        const itemKey = JSON.parse(e.dataTransfer.getData("itemKey")) as { id?: string, type: string };
        const allElements = design.value.pages.flatMap(p => p.elements?.flatMap(el => "elements" in el && el.elements ? [el, ...el.elements] : [el])).filter(el => !layouts.includes(el.type))
        const freshData = {
            id: crypto.randomUUID(),
            type: itemKey.type,
            name: layouts.includes(itemKey.type) ? "" : `element${allElements.length + 1}`,
            ...getDefaultData(itemKey.type),
        }
        design.setValue(prev => produce(prev, draft => {
            const elementData = getElementData(itemKey, draft.pages, freshData);
            if (!elementData) return;
            const row = draft.pages[index];
            (row.elements ??= []).push(elementData);
            selected.setValue({ id: elementData.id, type: elementData.type });
        }));
    };

    //Layout Elements
    const layoutElements = ["Expression", "Video", "Image", "HTML"];

    return (
        <Fragment>
            <div className="space-y-1 mt-3">
                {page.elements.map((item) => (
                    <Fragment key={item.id}>
                        {item.type === "Panel" && (
                            <PanelElement item={item as TPanel} index={index} />
                        )}
                        {layoutElements.includes(item.type) && item.type !== "Panel" && (
                            <LayoutElements item={item as TLayoutElement} />
                        )}
                        {!layoutElements.includes(item.type) && item.type !== "Panel" && (
                            <DesignElement item={item as TInputElement} />
                        )}
                    </Fragment>
                ))}
            </div>
            <div className={`border border-dashed mt-5 flex items-center justify-center py-4 rounded-xl transition-all duration-200 ${dragOver ? "bg-gray-200 border-transparent" : "border-gray-400"}`} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                <div className="text-center">
                    <button className={`w-10 h-10 rounded-full flex justify-center items-center mx-auto cursor-pointer mb-1.5 hover:bg-[#d2d3d4] select-none transition-all duration-150 ${dragOver ? "bg-builder text-white" : "bg-[#f0f0f0]"}`} onClick={() => selected.setValue(null)}>
                        <IconSquareRoundedPlusFilled className={`${dragOver ? "text-white" : "text-builder"}`} />
                    </button>
                    <p className={`text-xs italic transition-all duration-150 ${dragOver ? "text-builder" : ""}`}>{dragOver ? "Drop Here" : "Drag Form Element Here"}</p>
                </div>
            </div>
        </Fragment>
    );
};

export default DesignItems;