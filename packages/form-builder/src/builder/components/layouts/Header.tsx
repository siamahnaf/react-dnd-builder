"use client"
import { useState, useEffect } from "react";
import { headerNavList } from "../../data/layout/header-nav.data";
import { IconEraser, IconPlus, IconFolderFilled } from "../../icons";
import Confirmation from "../common/Confirmation";
import { Loading } from "../common/Loading";

//Editor
import { useEditor } from "../../context/editor.context";

const Header = () => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    //Editor
    const { header, sidebar, design, settings, selected, onSave, isSaving, autoSaveMode } = useEditor();

    //Handler
    const onAdd = () => {
        header.setValue("design");
        sidebar.setValue("form");
        selected.setValue(null);
    }
    const onConfirm = () => {
        design.setValue({ pages: [] });
        setOpen(false);
        selected.setValue(null);
    }
    const onDesignSave = () => {
        onSave?.({
            pages: design.value.pages,
            settings: settings.value
        });
    }

    useEffect(() => {
        if (!autoSaveMode) return;

        onSave?.({
            pages: design.value.pages,
            settings: settings.value
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoSaveMode, settings.value, design.value]);

    return (
        <div className="bg-gray-100 h-[50px] flex pr-4 border-b border-solid border-gray-200/70">
            <div className="flex-1 flex">
                {headerNavList.map((item, i) =>
                    <button key={i} className={`hover:bg-gray-200 transition-all duration-100 px-4 ${item.id === header.value ? "bg-gray-200" : ""}`} onClick={() => header.setValue(item.id)}>
                        {item.name}
                    </button>
                )}
            </div>
            <div className="flex items-center gap-x-3">
                <button className="hover:bg-builder/90 p-1.5 rounded-md hover:text-white transition-all duration-100" onClick={onAdd}>
                    <IconPlus />
                </button>
                <button className="hover:bg-builder/90 p-1.5 rounded-md hover:text-white transition-all duration-100 mr-1.5" onClick={() => setOpen(true)}>
                    <IconEraser />
                </button>
                <button className="flex gap-2 items-center px-3 py-1.5 relative bg-builder text-white rounded-md" onClick={onDesignSave} disabled={isSaving}>
                    <IconFolderFilled size={20} className={`${isSaving && "opacity-70"}`} />
                    <span className={`text-base font-medium ${isSaving && "opacity-25"}`}>Save Design</span>
                    {isSaving &&
                        <div className="absolute top-1/2 left-1/2 -translate-1/2">
                            <Loading className="stroke-white" />
                        </div>
                    }
                </button>
            </div>
            <Confirmation
                open={open}
                onClose={() => setOpen(false)}
                message="Are you want to erase?"
                onConfirm={onConfirm}
            />
        </div>
    );
};

export default Header;

