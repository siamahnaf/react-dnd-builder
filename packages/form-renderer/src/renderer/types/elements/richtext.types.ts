import { TBase, TElementGeneral, TElementLayout, TCondition, TBaseUnit } from "./base.types";

export type TRichText = TBase & {
    general?: TElementGeneral & Partial<{
        showCharCount: boolean;
        minHeight: TBaseUnit;
    }>;
    layout?: TElementLayout;
    advance?: Partial<{
        isRequired: boolean;
        requiredErrorMessage: string;
        minLength: string;
        minLengthErrorMessage: string;
        maxLength: string;
        maxLengthErrorMessage: string;
        visibleIf: TCondition[];
        readOnlyModeIf: TCondition[];
        requiredIf: TCondition[];
    }>;
};