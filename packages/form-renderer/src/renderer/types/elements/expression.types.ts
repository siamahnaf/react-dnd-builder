import { TBase, TBaseUnit } from "./base.types"

export type TExpression = TBase & {
    text?: string;
    spaceTop?: TBaseUnit;
    spaceBottom?: TBaseUnit;
}