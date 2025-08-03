"use client"
import { useState, cloneElement, DragEvent, Fragment } from "react";
import { IconCaretRightFilled, IconCopy, IconX } from "../../icons";
import Collapse from "../common/Collapse";
import { produce } from "immer";

//Essentials
import { widgetList } from "../../data/sidebar.data";
import { NodesBlockTypes, ContainerBlockTypes } from "../../types/context/design.types";

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

//Stylus
import ContainerStylus from "../stylus/ContainerStylus";
import HeadingStylus from "../stylus/HeadingStylus";
import TextStylus from "../stylus/TextStylus";
import ButtonStylus from "../stylus/ButtonStylus";
import ImageStylus from "../stylus/ImageStylus";
import DividerStylus from "../stylus/DividerStylus";
import SpacerStylus from "../stylus/SpacerStylus";
import IconStylus from "../stylus/IconStylus";
import HtmlStylus from "../stylus/HtmlStylus";

const Sidebar = () => {
    //State
    const [opens, setOpens] = useState<string[]>(widgetList.map(a => a.categoryId));
    const { design, selected } = useEditor();

    //Duplicate
    const duplicateHandler = () => {
        design.setValue(prev =>
            produce(prev, draft => {
                const clone = (n: NodesBlockTypes): NodesBlockTypes => ({ ...n, id: crypto.randomUUID(), ...((n as ContainerBlockTypes).nodes && { nodes: (n as ContainerBlockTypes).nodes.map(clone) }) });
                (function dup(a: NodesBlockTypes[]) {
                    a.some((n, i) =>
                        n.id === selected.value?.id ? (a.splice(i + 1, 0, clone(n)), true) : n.type === "container" && dup((n as ContainerBlockTypes).nodes)
                    )
                })(draft.rows)
            })
        )
    }

    //Handler
    const collapseHandler = (id: string) => {
        if (opens.includes(id)) {
            setOpens((prev) => prev.filter(item => item !== id));
        } else {
            setOpens((prev) => [...prev, id])
        }
    };

    const onDragStart = (e: DragEvent<HTMLDivElement>, itemKey: string) => {
        e.dataTransfer.setData("itemKey", itemKey);
    };

    const onAddWidget = (itemKey: string) => {
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
    }

    return (
        <Fragment>
            {!selected.value &&
                <div className="space-y-5 px-4 mt-5">
                    {widgetList.map((widget) => (
                        <div key={widget.categoryId}>
                            <div className="flex gap-px items-center text-[15px] cursor-pointer select-none" onClick={() => collapseHandler(widget.categoryId)}>
                                <IconCaretRightFilled size={19} className={`${opens.includes(widget.categoryId) ? "rotate-90" : "rotate-0"}`} />
                                <span className="font-medium">{widget.category}</span>
                            </div>
                            <Collapse isOpen={opens.includes(widget.categoryId)} easing="cubic-bezier(0.3,0,0,1)" >
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    {widget.widgets.map((item, i) => (
                                        <div key={i} className="border border-solid border-gray-200 text-center py-6 rounded-md hover:bg-gray-100 cursor-move" draggable onDragStart={(e) => onDragStart(e, item.type)} onClick={() => onAddWidget(item.type)}>
                                            {cloneElement(item.icon, {
                                                className: "mx-auto text-gray-600"
                                            })}
                                            <p className="mt-2 text-sm text-gray-600">
                                                {item.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </Collapse>
                        </div>
                    ))}
                </div>
            }
            {selected.value &&
                <div>
                    <div className="pl-4 flex items-center">
                        <h4 className="text-2xl font-semibold text-gray-800 flex-1">{selected.value.name}</h4>
                        <div className="flex">
                            <button className="border-r border-l border-solid border-gray-200 px-4 py-4 transition-all duration-300 hover:bg-gray-100" onClick={duplicateHandler}>
                                <IconCopy size={21} />
                            </button>
                            <button className="px-4 py-2.5 transition-all duration-300 hover:bg-gray-100" onClick={() => selected.setValue(null)}>
                                <IconX size={22} />
                            </button>
                        </div>
                    </div>
                    <hr className="border-gray-200" />
                    {selected.value.type === "container" &&
                        <ContainerStylus />
                    }
                    {selected.value.type === "heading" &&
                        <HeadingStylus />
                    }
                    {selected.value.type === "text" &&
                        <TextStylus />
                    }
                    {selected.value.type === "button" &&
                        <ButtonStylus />
                    }
                    {selected.value.type === "image" &&
                        <ImageStylus />
                    }
                    {selected.value.type === "divider" &&
                        <DividerStylus />
                    }
                    {selected.value.type === "spacer" &&
                        <SpacerStylus />
                    }
                    {selected.value.type === "icon" &&
                        <IconStylus />
                    }
                    {selected.value.type === "html" &&
                        <HtmlStylus />
                    }
                </div>
            }
        </Fragment>
    );
};

export default Sidebar;

