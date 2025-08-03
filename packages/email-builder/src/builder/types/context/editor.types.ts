import { ReactNode } from "react";
import { LogoTypes } from "./logo.types";
import { DeviceTypes } from "./device.types";
import { DesignTypes } from "./design.types";
import { SelectedTypes } from "./selected.types";
import { DesignData } from "./save.types";
import { PreviewTypes } from "./preview.types";

export type EditorContextType = {
    logo: LogoTypes | null;
    onUpload: ((file: File) => Promise<string>) | null;
    onCloudDelete: ((url: string) => void) | null;
    onSave: ((e: DesignData) => void) | null;
    device: DeviceTypes;
    design: DesignTypes;
    selected: SelectedTypes;
    showBtnLoading: boolean;
    enableImgOnSave: boolean;
    preview: PreviewTypes;
};

export type EditorProviderProps = {
    children?: ReactNode;
    value: EditorContextType;
}