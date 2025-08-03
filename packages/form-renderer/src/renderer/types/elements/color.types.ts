import { TBase, TElementGeneral, TElementLayout, TCondition } from "./base.types";

export type TColor = TBase & {
    general?: Omit<TElementGeneral, "placeholder"> & Partial<{
        displayType: string;
    }>;
    layout?: TElementLayout & Partial<{
        questionAlignment: string;
        questionWidth: string;
    }>;
    advance?: Partial<{
        isRequired: boolean;
        requiredErrorMessage: string;
        visibleIf: TCondition[];
        readOnlyModeIf: TCondition[];
        requiredIf: TCondition[];
        resetIf: TCondition[];
        setValueIf: TCondition[];
    }>;
};