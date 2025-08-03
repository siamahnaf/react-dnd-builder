import { TBase, TElementGeneral, TBaseChoice, TElementLayout, TValidation, TCondition } from "./base.types";

export type TSelect = TBase & {
    general?: TElementGeneral & Partial<{
        type: string;
        choices: TBaseChoice;
        choiceOrder: string;
        allowCustomChoice: boolean;
        minValueForCustom: string;
        maxValueForCustom: string;
        searchMode: string;
        clearBtn: boolean;
        hideQuestionIfNoChoice: boolean;
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