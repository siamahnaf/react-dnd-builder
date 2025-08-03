import { TBase, TElementGeneral, TElementLayout, TCondition } from "./base.types";

export type TSignature = TBase & {
    general?: Omit<TElementGeneral, "placeholder" | "defaultValue" | "readOnly"> & Partial<{
        storeFormat: string;
        autoScaleArea: boolean;
        areaWidth: string;
        areaHeight: string;
        showClearButton: boolean;
        backgroundColor: string;
        strokeWidth: string;
        strokeColor: string;
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