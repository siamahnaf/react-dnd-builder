import { DividerBlockTypes } from "../types/context/design.types";
import { DeepPartial } from "../types/layouts/layout.types";

export function divideResp<K1 extends keyof DividerBlockTypes>(
    k1: K1,
    v: DeepPartial<DividerBlockTypes[K1]>
): DeepPartial<Pick<DividerBlockTypes, K1>>;


export function divideResp<
    K1 extends keyof DividerBlockTypes,
    K2 extends keyof DividerBlockTypes[K1]
>(
    k1: K1,
    k2: K2,
    v: DeepPartial<DividerBlockTypes[K1][K2]>
): DeepPartial<Pick<DividerBlockTypes, K1>>;



export function divideResp<
    K1 extends keyof DividerBlockTypes,
    K2 extends keyof DividerBlockTypes[K1],
    K3 extends keyof DividerBlockTypes[K1][K2]
>(
    k1: K1,
    k2: K2,
    k3: K3,
    v: DeepPartial<DividerBlockTypes[K1][K2][K3]>
): DeepPartial<Pick<DividerBlockTypes, K1>>;

export function divideResp(...parts: any[]) {
    const val = parts.pop();
    return parts.reverse().reduce((acc, k) => ({ [k]: acc }), val);
}
