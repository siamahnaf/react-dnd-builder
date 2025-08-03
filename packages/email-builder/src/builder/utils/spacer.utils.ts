import { SpacerBlockTypes } from "../types/context/design.types";
import { DeepPartial } from "../types/layouts/layout.types";

export function spaceResp<K1 extends keyof SpacerBlockTypes>(
    k1: K1,
    v: DeepPartial<SpacerBlockTypes[K1]>
): DeepPartial<Pick<SpacerBlockTypes, K1>>;

export function spaceResp<
    K1 extends keyof SpacerBlockTypes,
    K2 extends keyof SpacerBlockTypes[K1]
>(
    k1: K1,
    k2: K2,
    v: DeepPartial<SpacerBlockTypes[K1][K2]>
): DeepPartial<Pick<SpacerBlockTypes, K1>>;

export function spaceResp<
    K1 extends keyof SpacerBlockTypes,
    K2 extends keyof SpacerBlockTypes[K1],
    K3 extends keyof SpacerBlockTypes[K1][K2]
>(
    k1: K1,
    k2: K2,
    k3: K3,
    v: DeepPartial<SpacerBlockTypes[K1][K2][K3]>
): DeepPartial<Pick<SpacerBlockTypes, K1>>;

export function spaceResp(...parts: any[]) {
    const val = parts.pop();
    return parts.reverse().reduce((acc, k) => ({ [k]: acc }), val);
}