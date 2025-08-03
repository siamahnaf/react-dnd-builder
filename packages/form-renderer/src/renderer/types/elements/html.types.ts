import { TBase, TBaseUnit } from "./base.types"

export type THtml = TBase & {
    html?: string;
    spaceTop?: TBaseUnit;
    spaceBottom?: TBaseUnit;
}