import { ContainerBlockTypes } from "../types/context/design.types";
import { DeepPartial } from "../types/layouts/layout.types";

export function containResp<K1 extends keyof ContainerBlockTypes>(
    k1: K1,
    v: DeepPartial<ContainerBlockTypes[K1]>
): DeepPartial<Pick<ContainerBlockTypes, K1>>;


export function containResp<
    K1 extends keyof ContainerBlockTypes,
    K2 extends keyof ContainerBlockTypes[K1]
>(
    k1: K1,
    k2: K2,
    v: DeepPartial<ContainerBlockTypes[K1][K2]>
): DeepPartial<Pick<ContainerBlockTypes, K1>>;



export function containResp<
    K1 extends keyof ContainerBlockTypes,
    K2 extends keyof ContainerBlockTypes[K1],
    K3 extends keyof ContainerBlockTypes[K1][K2]
>(
    k1: K1,
    k2: K2,
    k3: K3,
    v: DeepPartial<ContainerBlockTypes[K1][K2][K3]>
): DeepPartial<Pick<ContainerBlockTypes, K1>>;

export function containResp(...parts: any[]) {
    const val = parts.pop();
    return parts.reverse().reduce((acc, k) => ({ [k]: acc }), val);
}
