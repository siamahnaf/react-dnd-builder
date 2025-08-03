import { Fragment, DragEvent } from "react";
import { IconTrash, IconCopy, IconGripHorizontal, IconArrowsMove } from "../../../../icons";
import { useEditor } from "../../../../context/editor.context";
import { produce } from "immer";
import { TDesignPage, TDesignElement, TPanel } from "@siamahnaf/react-form-renderer";
import { createDragPreview } from "../../../../utils/drag.preview";

//Interface
interface Props {
    id: string;
    type: string;
}

const ElementSettings = ({ id, type }: Props) => {
    //Editor
    const { selected, design } = useEditor();

    //Handler
    const onCopyElement = () => {
        const newId = crypto.randomUUID();
        design.setValue(prev =>
            produce(prev, d => {
                const sel = id;
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

    const onDeleteElement = () => {
        design.setValue(prev =>
            produce(prev, d => {
                const p = d.pages.find(p => p.id === id || p.elements.some(e => e.id === id || ("elements" in e && e.elements?.some(i => i.id === id))));
                if (!p) return;
                if (p.id === id) {
                    d.pages = d.pages.filter(pg => pg.id !== id);
                    return;
                }
                const ei = p.elements.findIndex(e => e.id === id);
                if (ei !== -1) {
                    p.elements.splice(ei, 1);
                    return;
                }
                const panel = p.elements.find(e => "elements" in e && e.elements?.some(i => i.id === id)) as TPanel;
                if (panel?.elements) panel.elements = panel.elements.filter(i => i.id !== id);
            })
        )
        if (selected.value?.id) selected.setValue(null);
    }

    //Handler
    const onDragStart = (e: DragEvent<HTMLButtonElement>) => {
        e.dataTransfer.setData("itemKey", JSON.stringify({ id, type }));


        //Preview
        const preview = createDragPreview(type);
        document.body.appendChild(preview);
        e.dataTransfer.setDragImage(preview, 0, 0);
        setTimeout(() => {
            document.body.removeChild(preview);
        }, 0);
    };

    return (
        <div className={`flex items-center rounded-b-md overflow-hidden [&_button]:hover:bg-white/20 [&_button]:py-1.5 ${type !== "page" ? "bg-builder text-white top-0 right-6 [&_button]:px-1 absolute" : "text-white [&_button]:rounded-sm [&_button]:px-1.5"}`}>
            {type !== "page" &&
                <Fragment>
                    <button draggable onDragStart={onDragStart}>
                        <IconArrowsMove size={14} />
                    </button>
                    <button onClick={() => selected.setValue({ id: id, type: type })}>
                        <IconGripHorizontal size={14} />
                    </button>
                </Fragment>
            }
            <button onClick={onCopyElement}>
                <IconCopy size={14} />
            </button>
            <button onClick={onDeleteElement}>
                <IconTrash size={15} />
            </button>
        </div>
    );
};

export default ElementSettings;


