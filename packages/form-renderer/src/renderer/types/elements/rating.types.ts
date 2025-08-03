import { TBase, TElementGeneral, TElementLayout, TBaseTicks, TValidation, TCondition } from "./base.types";

export type TRating = TBase & {
    general?: Omit<TElementGeneral, "placeholder"> & Partial<{
        ratingIcon: string;
        ratingCount: string;
        ratingConf: string;
        ratingTicks: TBaseTicks;
        tooltipType: string;
        step: string;
        minValueLabel: string;
        maxValueLabel: string;
        labelAlignment: string;
        fillColor: string;
        emptyColor: string;
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
        resetIf: TCondition[];
        setValueIf: TCondition[];
    }>;
};