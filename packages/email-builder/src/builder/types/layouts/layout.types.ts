export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object
    ? T[K] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : DeepPartial<T[K]>
    : T[K];
};

export const merge = (target: any, src: any) => {
    Object.keys(src).forEach(key => {
        if (
            src[key] !== null &&
            typeof src[key] === "object" &&
            !Array.isArray(src[key])
        ) {
            target[key] ??= {};
            merge(target[key], src[key]);
        } else {
            target[key] = src[key]
        }
    });
}