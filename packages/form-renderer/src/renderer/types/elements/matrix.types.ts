import { TBase, TElementGeneral, TElementLayout, TCondition } from "./base.types";

export type TMatrix = TBase & {
    general?: Omit<TElementGeneral, "placeholder" | "defaultValue"> & Partial<{
        columnData: string[];
        rowsData: string[];
        hideQuestionIfNoRows: boolean;
        cells: Record<string, Record<string, string>>;
    }>;
    layout?: TElementLayout;
    advance?: Partial<{
        isRequired: boolean;
        requiredErrorMessage: string;
        visibleIf: TCondition[];
        readOnlyModeIf: TCondition[];
        requiredIf: TCondition[];
    }>;
};