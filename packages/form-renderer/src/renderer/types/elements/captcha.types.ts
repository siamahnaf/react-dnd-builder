import { TBase, TElementGeneral, TElementLayout, TCondition } from "./base.types";

export type TCaptcha = TBase & {
    general?: Omit<TElementGeneral, "placeholder" | "defaultValue" | "readOnly"> & Partial<{
        appearance: string;
    }>;
    layout?: Omit<TElementLayout, "errorMessageAlignment" | "fieldWidth">;
    advance?: Partial<{
        visibleIf: TCondition[];
    }>;
};