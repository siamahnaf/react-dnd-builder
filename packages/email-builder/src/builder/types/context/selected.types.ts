import { Dispatch, SetStateAction } from "react";

export type SelectedValueTypes = {
    id: string;
    type: string;
    name: string;
} | null;

export type SelectedTypes = {
    value: SelectedValueTypes;
    setValue: Dispatch<SetStateAction<SelectedValueTypes>>;
}