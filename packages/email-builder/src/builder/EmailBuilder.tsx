"use client"
import { useState } from "react";
import Header from "./components/layouts/Header";
import EditorMain from "./components/main/EditorMain";
import EditorPreview from "./components/main/EditorPreview";

//Default
import { editorData } from "./data/default/editor.data";

//Types
import { LogoTypes } from "./types/context/logo.types";
import { DesignValueTypes } from "./types/context/design.types";
import { SelectedValueTypes } from "./types/context/selected.types";
import { DesignData } from "./types/context/save.types";

//Store
import { EditorProvider } from "./context/editor.context";

//Interface
interface Props {
    logo?: LogoTypes;
    onUpload?: (file: File) => Promise<string>;
    onCloudDelete?: (url: string | null) => void;
    onSave?: (e: DesignData) => void;
    loadJson?: any;
    showBtnLoading?: boolean;
    enableImgOnSave?: boolean;
}

const EmailEditor = ({ logo, onUpload, onCloudDelete, onSave, loadJson, showBtnLoading = false, enableImgOnSave = true }: Props) => {
    //State
    const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
    const [design, setDesign] = useState<DesignValueTypes>(loadJson ?? editorData);
    const [selected, setSelected] = useState<SelectedValueTypes>(null);
    const [preview, setPreview] = useState<boolean>(false);

    return (
        <EditorProvider value={{
            logo: logo || null,
            onUpload: onUpload || null,
            onCloudDelete: onCloudDelete || null,
            onSave: onSave || null,
            showBtnLoading: showBtnLoading,
            enableImgOnSave: enableImgOnSave,
            device: { value: device, setValue: setDevice },
            design: { value: design, setValue: setDesign },
            selected: { value: selected, setValue: setSelected },
            preview: { value: preview, setValue: setPreview }
        }}>
            <main className="overflow-hidden bg-[#333333]">
                <Header />
                {preview ? <EditorPreview /> : <EditorMain />}
            </main>
        </EditorProvider>
    );
};

export default EmailEditor;