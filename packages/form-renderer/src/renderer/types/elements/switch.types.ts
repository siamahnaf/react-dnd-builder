import { TBase, TElementGeneral, TElementLayout, TValidation, TCondition } from "./base.types";

export type TSwitch = TBase & {
    general?: Omit<TElementGeneral, "placeholder"> & Partial<{
        enableLabel: boolean;
        labelForTrue: string;
        labelForFalse: string;
        swap: boolean;
    }>;
    layout?: TElementLayout & Partial<{
        questionAlignment: string;
        questionWidth: string;
    }>;
    advance?: Partial<{
        isRequired: boolean;
        requiredErrorMessage: string;
        validation: TValidation[];
        visibleIf: TCondition[];
        readOnlyModeIf: TCondition[];
        requiredIf: TCondition[];
    }>;
};