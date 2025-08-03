import { HeadingBlockTypes } from "../types/context/design.types";
import { DeepPartial } from "../types/layouts/layout.types";

export function headResp<K1 extends keyof HeadingBlockTypes>(
    k1: K1,
    v: DeepPartial<HeadingBlockTypes[K1]>
): DeepPartial<Pick<HeadingBlockTypes, K1>>;

export function headResp<
    K1 extends keyof HeadingBlockTypes,
    K2 extends keyof HeadingBlockTypes[K1]
>(
    k1: K1,
    k2: K2,
    v: DeepPartial<HeadingBlockTypes[K1][K2]>
): DeepPartial<Pick<HeadingBlockTypes, K1>>;

export function headResp<
    K1 extends keyof HeadingBlockTypes,
    K2 extends keyof HeadingBlockTypes[K1],
    K3 extends keyof HeadingBlockTypes[K1][K2]
>(
    k1: K1,
    k2: K2,
    k3: K3,
    v: DeepPartial<HeadingBlockTypes[K1][K2][K3]>
): DeepPartial<Pick<HeadingBlockTypes, K1>>;

export function headResp(...parts: any[]) {
    const val = parts.pop();
    return parts.reverse().reduce((acc, k) => ({ [k]: acc }), val);
}