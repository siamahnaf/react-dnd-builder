import { Dispatch, SetStateAction } from "react";

export type PreviewTypes = {
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
}