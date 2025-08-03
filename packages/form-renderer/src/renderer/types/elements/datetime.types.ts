import { TBase, TElementGeneral, TElementLayout, TCondition } from "./base.types";

export type TDatetime = TBase & {
    general?: Omit<TElementGeneral, "defaultValue"> & Partial<{
        type: string;
        dateFormat: string;
        timeFormat: string;
        monthFormat: string;
        yearFormat: string;
        minDate: string;
        maxDate: string;
        showTime: boolean;
    }>;
    layout?: TElementLayout & Partial<{
        valueAlignment: string;
        questionAlignment: string;
        questionWidth: string;
    }>;
    advance?: Partial<{
        isRequired: boolean;
        requiredErrorMessage: string;
        visibleIf: TCondition[];
        readOnlyModeIf: TCondition[];
        requiredIf: TCondition[];
    }>;
};