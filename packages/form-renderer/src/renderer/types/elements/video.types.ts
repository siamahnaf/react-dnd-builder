import { TBase, TBaseUnit } from "./base.types"

export type TVideo = TBase & {
    videoUrl?: string;
    showControlButton?: boolean;
    privacyEnhancedMode?: boolean;
    isVisible?: boolean;
    spaceTop?: TBaseUnit;
    spaceBottom?: TBaseUnit;
    height?: TBaseUnit;
    width?: TBaseUnit;
};