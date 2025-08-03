"use client"
import { DragEvent, useState } from "react";
import { IconSquareRoundedPlusFilled, IconX } from "../../icons";
import GridBox from "./GridBox";

//Store
import { useEditor } from "../../context/editor.context";

//Default Data
import { containerData } from "../../data/default/container.data";
import { headingData } from "../../data/default/heading.data";
import { textData } from "../../data/default/text.data";
import { buttonData } from "../../data/default/button.data";
import { imageData } from "../../data/default/image.data";
import { dividerData } from "../../data/default/divider.data";
import { spacerData } from "../../data/default/spacer.data";
import { iconData } from "../../data/default/icon.data";
import { htmlData } from "../../data/default/html.data";

const InsertBlock = () => {
    //State
    const [dragOver, setDragOver] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    //Store
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
    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        setDragOver(false);
        const itemKey = e.dataTransfer.getData("itemKey");
        if (itemKey === "container") {
            const _containerData = { ...containerData, id: crypto.randomUUID() }
            design.setValue(prev => ({ ...prev, rows: [...prev.rows, _containerData] }));
            selected.setValue({ id: _containerData.id, type: _containerData.type, name: _containerData.name });
        }
        if (itemKey === "heading") {
            const _headingData = { ...headingData, id: crypto.randomUUID() };
            const _containerData = { ...containerData, id: crypto.randomUUID(), nodes: [_headingData] };
            design.setValue(prev => ({ ...prev, rows: [...prev.rows, _containerData] }));
            selected.setValue({ id: _headingData.id, type: _headingData.type, name: _headingData.name });
        }
        if (itemKey === "text") {
            const _textData = { ...textData, id: crypto.randomUUID() };
            const _containerData = { ...containerData, id: crypto.randomUUID(), nodes: [_textData] };
            design.setValue(prev => ({ ...prev, rows: [...prev.rows, _containerData] }));
            selected.setValue({ id: _textData.id, type: _textData.type, name: _textData.name });
        }
        if (itemKey === "button") {
            const _buttonData = { ...buttonData, id: crypto.randomUUID() };
            const _containerData = { ...containerData, id: crypto.randomUUID(), nodes: [_buttonData] };
            design.setValue(prev => ({ ...prev, rows: [...prev.rows, _containerData] }));
            selected.setValue({ id: _buttonData.id, type: _buttonData.type, name: _buttonData.name });
        }
        if (itemKey === "image") {
            const _imageData = { ...imageData, id: crypto.randomUUID() };
            const _containerData = { ...containerData, id: crypto.randomUUID(), nodes: [_imageData] };
            design.setValue(prev => ({ ...prev, rows: [...prev.rows, _containerData] }));
            selected.setValue({ id: _imageData.id, type: _imageData.type, name: _imageData.name });
        }
        if (itemKey === "divider") {
            const _dividerData = { ...dividerData, id: crypto.randomUUID() };
            const _containerData = { ...containerData, id: crypto.randomUUID(), nodes: [_dividerData] };
            design.setValue(prev => ({ ...prev, rows: [...prev.rows, _containerData] }));
            selected.setValue({ id: _dividerData.id, type: _dividerData.type, name: _dividerData.name });
        }
        if (itemKey === "spacer") {
            const _spacerData = { ...spacerData, id: crypto.randomUUID() };
            const _containerData = { ...containerData, id: crypto.randomUUID(), nodes: [_spacerData] };
            design.setValue(prev => ({ ...prev, rows: [...prev.rows, _containerData] }));
            selected.setValue({ id: _spacerData.id, type: _spacerData.type, name: _spacerData.name });
        }
        if (itemKey === "icon") {
            const _iconData = { ...iconData, id: crypto.randomUUID() };
            const _containerData = { ...containerData, id: crypto.randomUUID(), nodes: [_iconData] };
            design.setValue(prev => ({ ...prev, rows: [...prev.rows, _containerData] }));
            selected.setValue({ id: _iconData.id, type: _iconData.type, name: _iconData.name });
        }
        if (itemKey === "html") {
            const _htmlData = { ...htmlData, id: crypto.randomUUID() };
            const _containerData = { ...containerData, id: crypto.randomUUID(), nodes: [_htmlData] };
            design.setValue(prev => ({ ...prev, rows: [...prev.rows, _containerData] }));
            selected.setValue({ id: _htmlData.id, type: _htmlData.type, name: _htmlData.name });
        }
    };

    return (
        <div className={`border flex justify-center items-center border-dashed mx-6 rounded-md relative ${dragOver ? "border-builder" : "border-gray-300"}`} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
            {!open &&
                <div className={`text-center py-12 ${dragOver ? "pointer-events-none" : ""}`}>
                    <div className={`w-10 h-10 rounded-full flex justify-center items-center mx-auto cursor-pointer mb-1.5 hover:bg-[#d2d3d4] select-none ${dragOver ? "bg-builder text-white" : "bg-[#f0f0f0]"}`} onClick={() => setOpen(true)}>
                        <IconSquareRoundedPlusFilled className={`${dragOver ? "text-white" : "text-builder"}`} />
                    </div>
                    <p className={`text-xs italic ${dragOver ? "text-builder" : ""}`}>{dragOver ? "Drop Here" : "Drag Widget Block Here"}</p>
                </div>
            }
            {open &&
                <div className={`w-full py-8 ${dragOver ? "pointer-events-none" : ""}`}>
                    <p className="opacity-80 text-center">Select your structure</p>
                    <button className="absolute right-3 top-3 bg-builder p-1 rounded-md text-white" onClick={() => setOpen(false)}>
                        <IconX size={18} />
                    </button>
                    <GridBox
                        onClose={() => setOpen(false)}
                    />
                </div>
            }
        </div>
    );
};

export default InsertBlock;