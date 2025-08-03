"use client"
import { IconPlus, IconPencilCheck, IconX } from "../../../icons";
import { produce } from "immer";

//Storing
import { useEditor } from "../../../context/editor.context";
import { ContainerBlockTypes, NodesBlockTypes } from "../../../types/context/design.types";

//Interface
interface Props {
    isFirst: boolean;
    item: {
        type: string;
        id: string;
        name: string;
    }
}

const WidgetSettings = ({ isFirst, item }: Props) => {
    //Store
    const { selected, design } = useEditor();

    //Class
    const containerClass = isFirst ? "top-0 rounded-b-[5px]" : "bottom-full rounded-t-[5px]";
    const clueClass = isFirst ? "border-b-[18px] border-t-0 bottom-[4px] border-b-transparent" : "border-t-[18px] border-b-0 top-[4px] border-t-transparent"

    //Remove
    const removeHandler = () => {
        design.setValue(prev => produce(prev, draft =>
            (function rm(a: NodesBlockTypes[]) {
                a.some((n, i) =>
                    n.id === item.id ? (a.splice(i, 1), 1) : n.type === "container" && rm((n as ContainerBlockTypes).nodes)
                );
            })(draft.rows)
        ));
        selected.setValue(null);
    }

    const duplicateHandler = () => {
        design.setValue(prev =>
            produce(prev, draft => {
                const clone = (n: NodesBlockTypes): NodesBlockTypes => ({ ...n, id: crypto.randomUUID(), ...((n as ContainerBlockTypes).nodes && { nodes: (n as ContainerBlockTypes).nodes.map(clone) }) });
                (function dup(a: NodesBlockTypes[]) {
                    a.some((n, i) =>
                        n.id === item.id ? (a.splice(i + 1, 0, clone(n)), true) : n.type === "container" && dup((n as ContainerBlockTypes).nodes)
                    )
                })(draft.rows)
            })
        )
    }

    return (
        <div className={`absolute ${containerClass} bg-builder text-white left-1/2 -translate-x-1/2 z-[999] flex gap-1 invisible opacity-0 group-hover:opacity-100 group-hover:visible ${selected.value?.id === item.id && "opacity-100 visible"}`}>
            <button className="hover:bg-white/20 h-[22px] px-1 transition-all" onClick={duplicateHandler}>
                <IconPlus size={16} />
            </button>
            <button className="hover:bg-white/20 h-[22px] px-1 transition-all" onClick={() => selected.setValue(item)}>
                <IconPencilCheck size={16} />
            </button>
            <button className="hover:bg-white/20 h-[22px] px-1 transition-all" onClick={removeHandler}>
                <IconX size={16} />
            </button>
            <div className={`border-l-0 border-r-[12px] border-r-builder absolute right-full ${clueClass}`} />
            <div className={`border-r-0 border-l-[12px] border-l-builder absolute left-full ${clueClass}`} />
        </div>
    );
};

export default WidgetSettings;