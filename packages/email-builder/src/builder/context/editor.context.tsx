"use client"
import { createContext, useContext } from "react";

//Default
import { editorData } from "../data/default/editor.data";

//Types
import { EditorContextType, EditorProviderProps } from "../types/context/editor.types";

//Creating Context
const EditorContext = createContext<EditorContextType>({
    logo: null,
    onUpload: null,
    onCloudDelete: null,
    onSave: null,
    showBtnLoading: false,
    enableImgOnSave: true,
    preview: {
        value: false,
        setValue: () => { }
    },
    device: {
        value: "desktop",
        setValue: () => { }
    },
    design: {
        value: editorData,
        setValue: () => { }
    },
    selected: {
        value: null,
        setValue: () => { }
    }
});

//Creating Provider
export const EditorProvider = ({ value, children }: EditorProviderProps) => (
    <EditorContext.Provider value={value}>
        {children}
    </EditorContext.Provider>
);

export const useEditor = (): EditorContextType => {
    const context = useContext(EditorContext);
    if (!context) throw new Error("'useEditor' hook must be called within an EditorProvider");
    return context;
};