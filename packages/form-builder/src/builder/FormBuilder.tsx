"use client"
import { useState } from "react";
import Header from "./components/layouts/Header";
import LayoutNav from "./components/layouts/LayoutNav";
import EditorMain from "./components/editor/EditorMain";
import { TDesignJSON, TSettings } from "@siamahnaf/react-form-renderer";

//Default
import { editorData } from "./data/default/editor.data";
import { settingData } from "./data/default/settings.data";

//Types
import { DesignValueTypes } from "./types/context/design.types";
import { LayoutNavId } from "./types/context/sidebar.types";
import { LayoutHeaderId } from "./types/context/header.types";
import { SelectedValueTypes } from "./types/context/selected.types";

//Store
import { EditorProvider } from "./context/editor.context";

//Interface
interface Props {
    onUpload?: (file: File) => Promise<string>;
    onCloudDelete?: (url: string | null) => void;
    onSave?: (e: TDesignJSON) => void;
    loadJSON?: TDesignJSON;
    isSaving?: boolean;
    autoSaveMode?: boolean;
    backUrl?: string;
}

const EmailEditor = ({ onCloudDelete, onUpload, onSave, isSaving = false, autoSaveMode = false, backUrl, loadJSON }: Props) => {
    //State
    const [design, setDesign] = useState<DesignValueTypes>(loadJSON?.pages ? { pages: loadJSON.pages } : editorData);
    const [sidebar, setSidebar] = useState<LayoutNavId>("form");
    const [header, setHeader] = useState<LayoutHeaderId>("design");
    const [selected, setSelected] = useState<SelectedValueTypes>(null);
    const [setting, setSetting] = useState<TSettings>(loadJSON?.settings ? loadJSON.settings : settingData);

    return (
        <EditorProvider value={{
            onUpload,
            onCloudDelete,
            onSave,
            autoSaveMode,
            isSaving,
            backUrl: backUrl || null,
            design: { value: design, setValue: setDesign },
            sidebar: { value: sidebar, setValue: setSidebar },
            header: { value: header, setValue: setHeader },
            selected: { value: selected, setValue: setSelected },
            settings: { value: setting, setValue: setSetting },
        }}>
            <main className="overflow-hidden">
                <div className="flex">
                    <div className="flex-[0_0_75px] basis-[75px] w-[75px] bg-builder-secondary h-screen">
                        <LayoutNav />
                    </div>
                    <div className="flex-1">
                        <Header />
                        <EditorMain />
                    </div>
                </div>
            </main>
        </EditorProvider>
    );
};

export default EmailEditor;