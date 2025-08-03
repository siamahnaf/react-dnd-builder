import { useState, DragEvent } from "react";
import { useEditor } from "../../../../context/editor.context";
import { IconSquareRoundedPlusFilled } from "../../../../icons";
import DesignElement from "./DesignElement";
import { produce } from "immer";
import { ItemKeys } from "../../../../types/layout/itemkey.types";
import { TDesignElement, TDesignPage, TPanel } from "@siamahnaf/react-form-renderer";
import { layoutElements } from "../../../../data/layout/layoutelement.data";

//Helpers
import { getDefaultData } from "../../../../data/default/default.data";

//Components
import ElementSettings from "../_helpers/ElementSettings";

//Interface
interface Props {
    item: TPanel;
    index: number;
}

const PanelElement = ({ item, index }: Props) => {
    //Editor
    const { selected, design } = useEditor();

    //State
    const [dragOver, setDragOver] = useState<boolean>(false);

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
        if (itemKey.type === "Panel") return null;
        const allElements = design.value.pages.flatMap(p => p.elements?.flatMap(el => "elements" in el && el.elements ? [el, ...el.elements] : [el])).filter(el => !layoutElements.includes(el.type))
        const freshData = {
            id: crypto.randomUUID(),
            type: itemKey.type,
            name: layoutElements.includes(itemKey.type) ? "" : `element${allElements.length + 1}`,
            ...getDefaultData(itemKey.type),
        }
        design.setValue(prev => produce(prev, draft => {
            const elementData = getElementData(itemKey, draft.pages, freshData);
            if (!elementData) return;
            const panel = draft.pages[index].elements.find(el => el.id === item.id) as TPanel | undefined;
            if (panel) (panel.elements ??= []).push(elementData);
            selected.setValue({ id: elementData.id, type: elementData.type });
        }));
    };

    return (
        <div className="relative" id={item.id}>
            <div className={`bg-white border border-solid rounded-xl transition-all duration-300 ${item.id === selected.value?.id ? "border-builder outline-1 outline-builder p-5 bg-gray-50" : "border-gray-300/70 p-3 hover:bg-gray-50"}`}>
                <h4 className="text-sm text-gray-700 mb-2">{`<${item.type}/>`}</h4>
                {item.name &&
                    <h4 className="text-xl font-medium text-gray-600">{item.name}</h4>
                }
                {item.description &&
                    <p className="font-light text-gray-600">{item.description}</p>
                }
                {Number(item.elements?.length) > 0 &&
                    <div className="space-y-4 my-4">
                        {item.elements?.map((item) => (
                            <DesignElement key={item.id} item={item} />
                        ))}
                    </div>
                }
                <div className={`border border-dashed flex items-center justify-center py-4 rounded-xl transition-all duration-200 mt-2 ${dragOver ? "bg-gray-200 border-transparent" : "border-gray-400"}`} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                    <div className="text-center">
                        <div className={`w-10 h-10 rounded-full flex justify-center items-center mx-auto cursor-pointer mb-1.5 hover:bg-[#d2d3d4] select-none transition-all duration-150 ${dragOver ? "bg-builder text-white" : "bg-[#f0f0f0]"}`} >
                            <IconSquareRoundedPlusFilled className={`${dragOver ? "text-white" : "text-builder"}`} />
                        </div>
                        <p className="font-medium text-builder">
                            Add a Element Here
                        </p>
                    </div>
                </div>
            </div>
            <ElementSettings id={item.id} type={item.type} />
        </div>
    );
};

export default PanelElement;