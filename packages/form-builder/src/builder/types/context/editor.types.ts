import { ReactNode } from "react";
import { DesignTypes } from "./design.types";
import { TDesignJSON } from "@siamahnaf/react-form-renderer";
import { SidebarTypes } from "./sidebar.types";
import { HeaderTypes } from "./header.types";
import { SelectedTypes } from "./selected.types";
import { SettingTypes } from "./settings.types";

export type EditorContextType = {
    onUpload?: ((file: File) => Promise<string>);
    onCloudDelete?: ((url: string | null) => void);
    onSave?: ((e: TDesignJSON) => void) | null;
    isSaving: boolean;
    autoSaveMode: boolean;
    backUrl: string | null;
    design: DesignTypes;
    sidebar: SidebarTypes;
    header: HeaderTypes;
    selected: SelectedTypes;
    settings: SettingTypes;
};

export type EditorProviderProps = {
    children?: ReactNode;
    value: EditorContextType;
}