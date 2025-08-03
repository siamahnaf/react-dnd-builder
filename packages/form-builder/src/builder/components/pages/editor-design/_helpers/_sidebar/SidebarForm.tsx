"use client"
import { useState, useMemo, DragEvent } from "react";
import { formData } from "../../../../../data/layout/forms.data";
import Collapse from "../../../../common/Collapse";
import { IconCaretRightFilled, IconSearch, IconCopy, IconX } from "../../../../../icons";
import { ScrollWrapper } from "../../../../common/Scrollbar";
import { produce } from "immer";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { getDefaultData } from "../../../../../data/default/default.data";
import { TPanel, TDesignPage, TDesignElement } from "@siamahnaf/react-form-renderer";
import { layoutElements } from "../../../../../data/layout/layoutelement.data";

//Editor
import { useEditor } from "../../../../../context/editor.context";

//Components
import StylusRoot from "../../../../stylus/StylusRoot";

const SidebarForm = () => {
    // State
    const [opens, setOpens] = useState<string[]>(formData.map(a => a.id));
    const [value, setValue] = useState<string>("");
    const [isDragging, setIsDragging] = useState<boolean>(false);

    //Editor
    const { design, selected } = useEditor();

    // Handler
    const collapseHandler = (id: string) => {
        if (opens.includes(id)) {
            setOpens((prev) => prev.filter(item => item !== id));
        } else {
            setOpens((prev) => [...prev, id]);
        }
    };

    // Memoized filtered data
    const filteredData = useMemo(() => {
        if (!value.trim()) return formData;

        const regex = new RegExp(value, "i");

        return formData
            .map(group => {
                const matchedItems = group.items.filter(item => regex.test(item.name));
                if (matchedItems.length > 0) {
                    return { ...group, items: matchedItems };
                }
                return null;
            })
            .filter(Boolean) as typeof formData;
    }, [value]);

    //Handler
    const onDragStart = (e: DragEvent<HTMLDivElement>, itemKey: string) => {
        setIsDragging(true);
        e.dataTransfer.setData("itemKey", JSON.stringify({ type: itemKey }));
    };
    const onDragEnd = () => {
        setIsDragging(false);
    };
    const onAddWidget = (itemKey: string) => {
        const allElements = design.value.pages.flatMap(p => p.elements?.flatMap(el => "elements" in el && el.elements ? [el, ...el.elements] : [el])).filter(el => !layoutElements.includes(el.type))
        const freshData = {
            id: crypto.randomUUID(),
            type: itemKey,
            name: layoutElements.includes(itemKey) ? "" : `element${allElements.length + 1}`,
            ...getDefaultData(itemKey),
        }
        design.setValue(produce(d => {
            d.pages.push({
                type: "page",
                id: crypto.randomUUID(),
                name: `Page ${d.pages.length + 1}`,
                elements: [freshData]
            })
        }));

        selected.setValue({ id: freshData.id, type: freshData.type });
    }

    const onCopyElement = () => {
        const newId = crypto.randomUUID();
        design.setValue(prev =>
            produce(prev, d => {
                const sel = selected.value?.id;
                const p = d.pages.find(p => p.id === sel || p.elements.some(e => e.id === sel || ("elements" in e && e.elements?.some(i => i.id === sel))));
                if (!p) return;

                const insert = (arr: TDesignPage[] | TDesignElement[], i: number) => {
                    const { clone } = deepCloneWithIds(arr[i], newId);
                    arr.splice(i + 1, 0, clone);
                };

                if (p.id === sel) insert(d.pages, d.pages.indexOf(p));
                else {
                    const e = p.elements.find(e => e.id === sel) ?? p.elements.find(e => "elements" in e && e.elements?.some(i => i.id === sel));
                    if (!e) return;
                    if (e.id === sel) insert(p.elements, p.elements.indexOf(e));
                    else insert((e as TPanel).elements!, (e as TPanel).elements!.findIndex(i => i.id === sel));
                }
            })
        );
        selected.setValue(prev => ({ ...prev!, id: newId }));
        setTimeout(() => {
            const el = document.getElementById(newId);
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    }


    const deepCloneWithIds = (obj: TDesignPage | TDesignElement, id?: string): { clone: TDesignPage | TDesignElement } => {
        const clone = { ...obj, id: id ? id : crypto.randomUUID() };
        if ("elements" in clone && Array.isArray(clone.elements)) {
            clone.elements = clone.elements.map(e => deepCloneWithIds(e).clone);
        }
        return { clone };
    }


    return (
        <AnimatePresence mode="popLayout">
            {!selected.value ? (
                <motion.div
                    className="flex flex-col h-full"
                    key="element-list"
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 14 }}
                    transition={{ duration: 0.3, ease: cubicBezier(0.33, 1, 0.68, 1) }}
                >
                    <h4 className="text-base font-medium text-center text-gray-700 py-2.5">Elements</h4>
                    <hr className="border-gray-200/70" />
                    <ScrollWrapper className="pl-3.5 pr-2 py-2.5 flex-1 space-y-7 mt-1">
                        <div className="mb-4 relative">
                            <input
                                placeholder="Search"
                                className="border border-solid border-gray-200 w-full focus:outline-builder py-2 pr-3 pl-10 rounded-md text-gray-700"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <IconSearch className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-600" />
                        </div>

                        {filteredData.map((element) => (
                            <div key={element.id}>
                                <div
                                    className="flex gap-px items-center text-[15px] cursor-pointer select-none text-gray-700"
                                    onClick={() => collapseHandler(element.id)}
                                >
                                    <IconCaretRightFilled
                                        size={19}
                                        className={`transition-all duration-200 ${opens.includes(element.id) ? "rotate-90" : "rotate-0"}`}
                                    />
                                    <span className="font-medium">{element.title}</span>
                                </div>
                                <Collapse
                                    isOpen={opens.includes(element.id)}
                                    easing="cubic-bezier(0.87, 0, 0.13, 1)"
                                >
                                    <div className="grid grid-cols-2 gap-3 pt-3">
                                        {element.items.map((item, i) => (
                                            <div
                                                key={i}
                                                className={`border border-solid border-gray-200 rounded-lg hover:bg-gray-50 cursor-grab px-2.5 py-3 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                                                draggable
                                                onDragStart={(e) => onDragStart(e, item.id)}
                                                onDragEnd={onDragEnd}
                                                onClick={() => onAddWidget(item.id)}
                                            >
                                                <p className="text-base font-medium text-gray-600">
                                                    {item.name}
                                                </p>
                                                <img
                                                    src={item.img}
                                                    width={344}
                                                    height={72}
                                                    className="w-full mt-3.5 rounded-sm pointer-events-none"
                                                    alt={item.id}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </Collapse>
                            </div>
                        ))}
                    </ScrollWrapper>
                </motion.div>
            ) : (
                <motion.div
                    key="element-settings"
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.3, ease: cubicBezier(0.33, 1, 0.68, 1) }}
                    className="flex flex-col h-full"
                >
                    <div className="pl-4 flex items-center">
                        <h4 className="text-xl font-semibold text-gray-800 flex-1">{formData.flatMap(a => a.items).find(a => a.id === selected.value?.type)?.name || "Page Settings"}</h4>
                        <div className="flex">
                            <button className="border-r border-l border-solid border-gray-200 px-4 py-4 transition-all duration-300 hover:bg-gray-100" onClick={onCopyElement}>
                                <IconCopy size={21} />
                            </button>
                            <button className="px-4 py-2.5 transition-all duration-300 hover:bg-gray-100" onClick={() => selected.setValue(null)}>
                                <IconX size={22} />
                            </button>
                        </div>
                    </div>
                    <hr className="border-gray-200" />
                    <StylusRoot />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SidebarForm;
