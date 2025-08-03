import { IconBlockTypes } from "../types/context/design.types";
import { DeepPartial } from "../types/layouts/layout.types";

export function iconResp<K1 extends keyof IconBlockTypes>(
    k1: K1,
    v: DeepPartial<IconBlockTypes[K1]>
): DeepPartial<Pick<IconBlockTypes, K1>>;

export function iconResp<
    K1 extends keyof IconBlockTypes,
    K2 extends keyof IconBlockTypes[K1]
>(
    k1: K1,
    k2: K2,
    v: DeepPartial<IconBlockTypes[K1][K2]>
): DeepPartial<Pick<IconBlockTypes, K1>>;

export function iconResp<
    K1 extends keyof IconBlockTypes,
    K2 extends keyof IconBlockTypes[K1],
    K3 extends keyof IconBlockTypes[K1][K2]
>(
    k1: K1,
    k2: K2,
    k3: K3,
    v: DeepPartial<IconBlockTypes[K1][K2][K3]>
): DeepPartial<Pick<IconBlockTypes, K1>>;

export function iconResp(...parts: any[]) {
    const val = parts.pop();
    return parts.reverse().reduce((acc, k) => ({ [k]: acc }), val);
}