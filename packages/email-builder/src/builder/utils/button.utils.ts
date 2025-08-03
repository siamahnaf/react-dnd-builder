import { ButtonBlockTypes } from "../types/context/design.types";
import { DeepPartial } from "../types/layouts/layout.types";

export function btnResp<K1 extends keyof ButtonBlockTypes>(
    k1: K1,
    v: DeepPartial<ButtonBlockTypes[K1]>
): DeepPartial<Pick<ButtonBlockTypes, K1>>;


export function btnResp<
    K1 extends keyof ButtonBlockTypes,
    K2 extends keyof ButtonBlockTypes[K1]
>(
    k1: K1,
    k2: K2,
    v: DeepPartial<ButtonBlockTypes[K1][K2]>
): DeepPartial<Pick<ButtonBlockTypes, K1>>;



export function btnResp<
    K1 extends keyof ButtonBlockTypes,
    K2 extends keyof ButtonBlockTypes[K1],
    K3 extends keyof ButtonBlockTypes[K1][K2]
>(
    k1: K1,
    k2: K2,
    k3: K3,
    v: DeepPartial<ButtonBlockTypes[K1][K2][K3]>
): DeepPartial<Pick<ButtonBlockTypes, K1>>;

export function btnResp(...parts: any[]) {
    const val = parts.pop();
    return parts.reverse().reduce((acc, k) => ({ [k]: acc }), val);
}
