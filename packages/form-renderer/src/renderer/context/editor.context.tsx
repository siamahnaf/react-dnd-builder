"use client"
import { createContext, useContext } from "react";

//Types
import { EditorContextType, EditorProviderProps } from "../types/editor.context";

//Creating Context
const EditorContext = createContext<EditorContextType>({
    onUpload: null,
    onCloudDelete: null,
    pages: [],
    settings: {},
    indexId: undefined,
    form: null,
    loading: false,
    captchaSiteKey: null,
    index: {
        value: 0,
        setValue: () => { }
    },
    onQuizTimeFinish: null,
    quiz: {
        value: false,
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