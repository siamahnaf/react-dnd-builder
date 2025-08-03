"use client"
import { useState, DragEvent } from "react";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { ScrollWrapper } from "../../common/Scrollbar";
import { produce } from "immer";
import { getDefaultData } from "../../../data/default/default.data";
import { ItemKeys } from "../../../types/layout/itemkey.types";
import { TDesignElement, TDesignPage } from "@siamahnaf/react-form-renderer";
import { layoutElements } from "../../../data/layout/layoutelement.data";

//Components
import DesignHeader from "../../pages-helpers/editor-design/DesignHeader";
import DesignPages from "../../pages-helpers/editor-design/DesignPages";

//Editor
import { useEditor } from "../../../context/editor.context";

const RootBody = () => {
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
        const itemKey = JSON.parse(e.dataTransfer.getData("itemKey")) as ItemKeys;
        const allElements = design.value.pages.flatMap(p => p.elements?.flatMap(el => "elements" in el && el.elements ? [el, ...el.elements] : [el])).filter(el => !layoutElements.includes(el.type))
        const freshData = {
            id: crypto.randomUUID(),
            type: itemKey.type,
            name: layoutElements.includes(itemKey.type) ? "" : `element${allElements.length + 1}`,
            ...getDefaultData(itemKey.type),
        }
        design.setValue(produce(d => {
            const elementData = getElementData(itemKey, d.pages, freshData);
            if (!elementData) return;
            d.pages.push({
                type: "page",
                id: crypto.randomUUID(),
                name: `Page ${d.pages.length + 1}`,
                elements: [elementData],
            });
            selected.setValue({ id: elementData.id, type: elementData.type });
        }));
    };

    return (
        <ScrollWrapper className="h-[calc(100vh-50px)] flex-1 bg-radial from-[#e5e5e5] from-[1px] to-transparent to-0% bg-size-[20px_20px] flex flex-col min-w-0">
            <div className="pl-4 pr-[10px] py-3 space-y-8">
                <DesignHeader />
                <DesignPages />
            </div>
            <div className="flex-1 min-h-[220px] pl-4 pr-[10px] py-3" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                <AnimatePresence>
                    {dragOver && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: cubicBezier(0.4, 0, 0.2, 1) }}
                            className="h-[160px] bg-gray-200 rounded-xl"
                        />
                    )}
                </AnimatePresence>
            </div>
        </ScrollWrapper>
    );
};

export default RootBody;