import { TBase, TBaseImage, TBaseUnit } from "./base.types";

export type TImage = TBase & {
    isVisible?: boolean;
    image?: TBaseImage;
    fit?: string;
    height?: TBaseUnit;
    width?: TBaseUnit;
    imageRadius?: TBaseUnit;
    spaceTop?: TBaseUnit;
    spaceBottom?: TBaseUnit;
}