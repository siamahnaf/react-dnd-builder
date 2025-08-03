import { TBase, TElementGeneral, TElementLayout, TValidation, TCondition } from "./base.types";

export type TSingleText = TBase & {
    general?: TElementGeneral & Partial<{
        type: string;
    }>;
    layout?: TElementLayout & Partial<{
        valueAlignment: string;
        questionAlignment: string;
        questionWidth: string;
    }>;
    advance?: Partial<{
        isRequired: boolean;
        requiredErrorMessage: string;
        isEmail: boolean;
        emailErrorMessage: string;
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
        inputMaskType: string;
        patternMask: {
            value: string;
        };
        patternNumber: Partial<{
            minValue: string;
            maxValue: string;
            precision: string;
            allowNegative: boolean;
        }>;
        patternCurrency: Partial<{
            minValue: string;
            maxValue: string;
            precision: string;
            prefix: string;
            suffix: string;
            allowNegative: boolean;
        }>;
    }>;
};