import { ImageBlockTypes } from "../types/context/design.types";
import { DeepPartial } from "../types/layouts/layout.types";

export function imgResp<K1 extends keyof ImageBlockTypes>(
    k1: K1,
    v: DeepPartial<ImageBlockTypes[K1]>
): DeepPartial<Pick<ImageBlockTypes, K1>>;

export function imgResp<
    K1 extends keyof ImageBlockTypes,
    K2 extends keyof ImageBlockTypes[K1]
>(
    k1: K1,
    k2: K2,
    v: DeepPartial<ImageBlockTypes[K1][K2]>
): DeepPartial<Pick<ImageBlockTypes, K1>>;

export function imgResp<
    K1 extends keyof ImageBlockTypes,
    K2 extends keyof ImageBlockTypes[K1],
    K3 extends keyof ImageBlockTypes[K1][K2]
>(
    k1: K1,
    k2: K2,
    k3: K3,
    v: DeepPartial<ImageBlockTypes[K1][K2][K3]>
): DeepPartial<Pick<ImageBlockTypes, K1>>;

export function imgResp(...parts: any[]) {
    const val = parts.pop();
    return parts.reverse().reduce((acc, k) => ({ [k]: acc }), val);
}