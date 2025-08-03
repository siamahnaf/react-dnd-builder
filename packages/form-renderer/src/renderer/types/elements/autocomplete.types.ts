import { TBase, TBaseChoice, TElementGeneral, TElementLayout, TValidation, TCondition } from "./base.types";

export type TAutocomplete = TBase & {
    general?: TElementGeneral & Partial<{
        choiceType: string;
        country: {
            type: string;
            exclude: string;
            include: string;
        };
        currency: {
            type: string,
            exclude: string;
            include: string;
        };
        callingCode: {
            include: string;
            exclude: string;
            addPlusText: boolean;
        };
        customChoice: TBaseChoice;
        choiceOrder: string;
        searchMode: string;
        clearBtn: boolean;
        allowCustomInput: boolean;
        webServiceUrl: string;
        pathToData: string;
        levelField: string;
        valueField: string;
    }>;
    layout?: TElementLayout & Partial<{
        valueAlignment: string;
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
        resetIf: TCondition[];
        setValueIf: TCondition[];
        choiceVisibleIf: TCondition[];
        choiceSelectableIf: TCondition[];
    }>;
};