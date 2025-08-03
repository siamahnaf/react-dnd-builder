import { TSingleText, TLongText, TRichText, TSelect, TAutocomplete, TCheckbox, TRadio, TSwitch, TRange, TRating, TDatetime, TColor, TFileUpload, TMatrix, TSignature, TCaptcha, TPanel, TExpression, TVideo, TImage, THtml, TSettings } from "@siamahnaf/react-form-renderer";

export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object
    ? T[K] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : DeepPartial<NonNullable<T[K]>>
    : T[K];
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const merge = (target: any, source: any) => {
    for (const key in source) {
        const srcVal = source[key];

        if (
            srcVal &&
            typeof srcVal === "object" &&
            !Array.isArray(srcVal)
        ) {
            target[key] ??= {};
            merge(target[key], srcVal);
        } else {
            target[key] = srcVal;
        }
    }
};

function createResp<T>() {
    function resp(patch: DeepPartial<T>): DeepPartial<T>;

    function resp<K1 extends keyof T>(
        k1: K1,
        v: DeepPartial<T[K1]>
    ): DeepPartial<Pick<T, K1>>;

    function resp<
        K1 extends keyof T,
        K2 extends keyof NonNullable<T[K1]>
    >(
        k1: K1,
        k2: K2,
        v: DeepPartial<NonNullable<T[K1]>[K2]>
    ): DeepPartial<Pick<T, K1>>;

    function resp<
        K1 extends keyof T,
        K2 extends keyof NonNullable<T[K1]>,
        K3 extends keyof NonNullable<NonNullable<T[K1]>[K2]>
    >(
        k1: K1,
        k2: K2,
        k3: K3,
        v: DeepPartial<NonNullable<NonNullable<T[K1]>[K2]>[K3]>
    ): DeepPartial<Pick<T, K1>>;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    function resp(...args: any[]): any {
        if (typeof args[0] === "object") return args[0];
        const val = args.pop();
        return args.reverse().reduce((acc, k) => ({ [k]: acc }), val);
    }

    return resp;
}

//Create Resp
export const textResp = createResp<TSingleText>();
export const longResp = createResp<TLongText>();
export const richResp = createResp<TRichText>();
export const selectResp = createResp<TSelect>();
export const autoResp = createResp<TAutocomplete>();
export const checkResp = createResp<TCheckbox>();
export const radioResp = createResp<TRadio>();
export const switchResp = createResp<TSwitch>();
export const rangeResp = createResp<TRange>();
export const rateResp = createResp<TRating>();
export const dateResp = createResp<TDatetime>();
export const colorResp = createResp<TColor>();
export const fileResp = createResp<TFileUpload>();
export const matResp = createResp<TMatrix>();
export const sigResp = createResp<TSignature>();
export const capResp = createResp<TCaptcha>();
export const panelResp = createResp<TPanel>();
export const exResp = createResp<TExpression>();
export const vidResp = createResp<TVideo>();
export const imgResp = createResp<TImage>();
export const htmlResp = createResp<THtml>();
export const setResp = createResp<TSettings>();