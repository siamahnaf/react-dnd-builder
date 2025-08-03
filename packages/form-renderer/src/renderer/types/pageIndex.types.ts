import { Dispatch, SetStateAction } from "react";

export type PageIndexTypes = {
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
}

export type QuizFinishTypes = {
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
}