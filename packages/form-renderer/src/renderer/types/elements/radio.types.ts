import { TBase, TElementGeneral, TElementLayout, TValidation, TCondition, TBaseChoice } from "./base.types";

export type TRadio = TBase & {
    general?: Omit<TElementGeneral, "placeholder"> & Partial<{
        choices: TBaseChoice;
        choiceOrder: string;
        enableNone: boolean;
        enableNoneText: string;
        hideQuestionIfNoChoice: boolean;
    }>;
    layout?: TElementLayout & Partial<{
        questionAlignment: string;
        questionWidth: string;
        columnCount: string;
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