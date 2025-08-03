import { TBase, TElementGeneral, TElementLayout, TCondition } from "./base.types";

export type TFileUpload = TBase & {
    general?: Omit<TElementGeneral, "placeholder" | "defaultValue"> & Partial<{
        type: string;
        sourceType: string;
        multiple: boolean;
        fileAcceptType: string;
        maxFileSize: string;
        imageHeight: string;
        imageWidth: string;
        placeholderText: string;
    }>;
    layout?: TElementLayout;
    advance?: Partial<{
        isRequired: boolean;
        requiredErrorMessage: string;
        visibleIf: TCondition[];
        readOnlyModeIf: TCondition[];
        requiredIf: TCondition[];
    }>;
};