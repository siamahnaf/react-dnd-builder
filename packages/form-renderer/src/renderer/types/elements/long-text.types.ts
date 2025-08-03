import { TBase, TElementGeneral, TElementLayout, TValidation, TCondition } from "./base.types";

export type TLongText = TBase & {
    general?: TElementGeneral & Partial<{
        rows: string;
        cols: string;
        resizeable: string;
        showCharCount: boolean;
    }>;
    layout?: TElementLayout & Partial<{
        valueAlignment: string;
        questionAlignment: string;
        questionWidth: string;
    }>;
    advance?: Partial<{
        isRequired: boolean;
        requiredErrorMessage: string;
        minLength: string;
        minLengthErrorMessage: string;
        maxLength: string;
        maxLengthErrorMessage: string;
        pattern: string;
        patternMessage: string;
        validation: TValidation[];
        visibleIf: TCondition[];
        readOnlyModeIf: TCondition[];
        requiredIf: TCondition[];
        resetIf: TCondition[];
        setValueIf: TCondition[];
    }>;
};