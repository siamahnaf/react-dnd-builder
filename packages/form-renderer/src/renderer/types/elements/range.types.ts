import { TBase, TElementGeneral, TElementLayout, TValidation, TCondition, TBaseTicks } from "./base.types";

export type TRange = TBase & {
    general?: Omit<TElementGeneral, "placeholder" | "defaultValue"> & Partial<{
        type: string;
        minValue: string;
        maxValue: string;
        step: string;
        minRangeLength: string;
        maxRangeLength: string;
        showScale: boolean;
        scaleLabelConf: string;
        scaleLabels: TBaseTicks;
        showTooltip: boolean;
        allowThumbCrossing: boolean;
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