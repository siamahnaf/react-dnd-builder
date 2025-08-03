import { TextBlockTypes } from "../types/context/design.types";
import { DeepPartial } from "../types/layouts/layout.types";

export function textResp<K1 extends keyof TextBlockTypes>(
    k1: K1,
    v: DeepPartial<TextBlockTypes[K1]>
): DeepPartial<Pick<TextBlockTypes, K1>>;

export function textResp<
    K1 extends keyof TextBlockTypes,
    K2 extends keyof TextBlockTypes[K1]
>(
    k1: K1,
    k2: K2,
    v: DeepPartial<TextBlockTypes[K1][K2]>
): DeepPartial<Pick<TextBlockTypes, K1>>;

export function textResp<
    K1 extends keyof TextBlockTypes,
    K2 extends keyof TextBlockTypes[K1],
    K3 extends keyof TextBlockTypes[K1][K2]
>(
    k1: K1,
    k2: K2,
    k3: K3,
    v: DeepPartial<TextBlockTypes[K1][K2][K3]>
): DeepPartial<Pick<TextBlockTypes, K1>>;

export function textResp(...parts: any[]) {
    const val = parts.pop();
    return parts.reverse().reduce((acc, k) => ({ [k]: acc }), val);
}