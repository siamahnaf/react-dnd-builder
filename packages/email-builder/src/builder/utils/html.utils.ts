import { HtmlBlockTypes } from "../types/context/design.types";
import { DeepPartial } from "../types/layouts/layout.types";

export function htmlResp<K1 extends keyof HtmlBlockTypes>(
    k1: K1,
    v: DeepPartial<HtmlBlockTypes[K1]>
): DeepPartial<Pick<HtmlBlockTypes, K1>>;


export function htmlResp<
    K1 extends keyof HtmlBlockTypes,
    K2 extends keyof HtmlBlockTypes[K1]
>(
    k1: K1,
    k2: K2,
    v: DeepPartial<HtmlBlockTypes[K1][K2]>
): DeepPartial<Pick<HtmlBlockTypes, K1>>;



export function htmlResp<
    K1 extends keyof HtmlBlockTypes,
    K2 extends keyof HtmlBlockTypes[K1],
    K3 extends keyof HtmlBlockTypes[K1][K2]
>(
    k1: K1,
    k2: K2,
    k3: K3,
    v: DeepPartial<HtmlBlockTypes[K1][K2][K3]>
): DeepPartial<Pick<HtmlBlockTypes, K1>>;

export function htmlResp(...parts: any[]) {
    const val = parts.pop();
    return parts.reverse().reduce((acc, k) => ({ [k]: acc }), val);
}
