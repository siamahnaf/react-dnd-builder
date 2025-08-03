"use client"
import { useState, ReactNode, DragEvent } from "react";
import { useEditor } from "../../../../context/editor.context";
import { getDefaultData } from "../../../../data/default/default.data";
import { produce } from "immer";
import { ItemKeys } from "../../../../types/layout/itemkey.types";
import { layoutElements } from "../../../../data/layout/layoutelement.data";

//Types
import { TDesignPage, TDesignElement } from "@siamahnaf/react-form-renderer";

//Interface
interface Props {
    children: ReactNode;
    id: string;
}

const ElementDropper = ({ children, id }: Props) => {
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
        setDropArea(mouseY <= e.currentTarget.clientHeight / 2 ? "top" : "bottom");
    };

    const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
    };

    //Drop Handler
    const findElementPath = (pages: TDesignPage[], targetId: string) => {
        for (const page of pages) {
            if (page.id === targetId) return { container: pages, index: pages.indexOf(page) };

            const elIndex = page.elements.findIndex(el => el.id === targetId);
            if (elIndex !== -1) return { container: page.elements, index: elIndex };

            for (const element of page.elements) {
                if ("elements" in element && Array.isArray(element.elements)) {
                    const childIndex = element.elements.findIndex(e => e.id === targetId);
                    if (childIndex !== -1) return { container: element.elements, index: childIndex };
                }
            }
        }
        return null;
    };

    const getElementData = (itemKey: ItemKeys, pages: TDesignPage[], fallback: TDesignElement) => {
        if (!itemKey.id) return fallback;
        const path = findElementPath(pages, itemKey.id);
        if (!path) return fallback;
        const [removed] = path.container.splice(path.index, 1);
        return removed;
    };

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);

        const itemKey = JSON.parse(e.dataTransfer.getData("itemKey")) as { id?: string, type: string };
        const allElements = design.value.pages.flatMap(p => p.elements?.flatMap(el => "elements" in el && el.elements ? [el, ...el.elements] : [el])).filter(el => !layoutElements.includes(el.type))
        const freshData = {
            id: crypto.randomUUID(),
            type: itemKey.type,
            name: layoutElements.includes(itemKey.type) ? "" : `element${allElements.length + 1}`,
            ...getDefaultData(itemKey.type),
        }

        design.setValue(prev =>
            produce(prev, d => {
                const element = getElementData(itemKey, d.pages, freshData);
                if (!element) return;

                const dropTarget = findElementPath(d.pages, id);
                if (!dropTarget) return;

                const insertIndex = dropArea === "top" ? dropTarget.index : dropTarget.index + 1;
                dropTarget.container.splice(insertIndex, 0, element);

                selected.setValue({ id: element.id, type: element.type });
            })
        );
    };


    return (
        <div onDragOver={(e) => onDragOver(e)} onDragLeave={(e) => onDragLeave(e)} onDrop={(e) => onDrop(e)}>
            <div className="h-2 w-full relative">
                <div className={`absolute top-0 leading-0 w-full h-[50px] bg-builder rounded-xl transition-all duration-150 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] ${(dragOver && dropArea === "top") ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"}`} />
            </div>
            <div className="relative z-[999]" id={id}>
                {children}
            </div>
            <div className="h-2 w-full relative">
                <div className={`absolute bottom-0 leading-0 w-full h-[100px] bg-builder rounded-xl transition-all duration-150 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] ${(dragOver && dropArea === "bottom") ? "translate-y-0 scale-100 opacity-100" : "-translate-y-2 scale-95 opacity-0"}`} />
            </div>
        </div>
    );
};

export default ElementDropper;