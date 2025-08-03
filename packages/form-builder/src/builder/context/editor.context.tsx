"use client"
import { createContext, useContext } from "react";

//Default
import { editorData } from "../data/default/editor.data";
import { settingData } from "../data/default/settings.data";

//Types
import { EditorContextType, EditorProviderProps } from "../types/context/editor.types";

//Creating Context
const EditorContext = createContext<EditorContextType>({
    onUpload: undefined,
    onCloudDelete: undefined,
    onSave: null,
    isSaving: false,
    autoSaveMode: false,
    backUrl: null,
    design: {
        value: editorData,
        setValue: () => { }
    },
    sidebar: {
        value: "form",
        setValue: () => { }
    },
    header: {
        value: "design",
        setValue: () => { }
    },
    selected: {
        value: null,
        setValue: () => { }
    },
    settings: {
        value: settingData,
        setValue: () => { }
    }
});

//Creating Provider
export const EditorProvider = ({ value, children }: EditorProviderProps) => (
    <EditorContext.Provider value={value} >
        {children}
    </EditorContext.Provider>
);

export const useEditor = (): EditorContextType => {
    const context = useContext(EditorContext);
    if (!context) throw new Error("'useEditor' hook must be called within an EditorProvider");
    return context;
};